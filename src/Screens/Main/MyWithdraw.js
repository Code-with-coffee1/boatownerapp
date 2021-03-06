import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Input, Card} from 'react-native-elements';
import Header from '../../Components/Header';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import config from '../../Constants/config';
import axios from 'axios';
import {Loading} from '../../Components/Loader';
const MyWithdraw = () => {
  const [data, setData] = useState([]);
  const [pendingAmount, setPendingAmount] = useState([]);
  const [totalEarning, setTotalEarning] = useState([]);
  const [bank, setBank] = useState([]);
  const [loader, setLoader] = useState(false);
  // --------------------------------------- //
  useEffect(async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    // setUser_id_post(parsedInfo.id)
    setLoader(true);
    let url =
      config.apiUrl + '/withdraw_history.php?user_id_post=' + parsedInfo.id;
    axios
      .get(url)
      .then(res => {
        console.log('boat_list', JSON.stringify(res.data, null, 1));
        let data = JSON.stringify(res.data, null, 1);

        setLoader(false);
        if (res.data.success === 'true') {
          console.log('withhdraw_arr', res.data.total_earning);
          setData(res.data.withhdraw_arr);
          setPendingAmount(res.data.pending_amount);
          setTotalEarning(res.data.total_earning);
          setBank(res.data.bank_arr);
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        backBtn={true}
        name="My Withdraw"
        imgBack={true}
        headerHeight={300}
      />
      {/* btn */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          width: '100%',
          justifyContent: 'space-around',
          top: 170,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.bold,
              fontSize: 17,
              color: Colors.white,
            }}>
            KWD {totalEarning ? totalEarning : '0'}
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.default,
              fontSize: 17,
              color: Colors.white,
            }}>
            Total Amount
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.bold,
              fontSize: 17,
              color: Colors.white,
            }}>
            KWD {pendingAmount ? pendingAmount : '0'}
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.default,
              fontSize: 17,
              color: Colors.white,
            }}>
            Pending Amount
          </Text>
        </View>
      </View>
      {/*  */}
      <View style={sb.SEC2}>
        {loader ? (
          <Loading />
        ) : (
          <View style={{marginTop: 30}}>
            <ScrollView>
              {data === 'NA' ? (
                <View style={{alignItems: 'center', marginTop: '10%'}}>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', color: '#ccc'}}>
                    No Data Available
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={data === 'NA' ? [] : data}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <Card containerStyle={{borderRadius: 12, elevation: 3}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View style={{width: '70%'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: FontFamily.semi_bold,
                              }}>
                              #{item.booking_no}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: FontFamily.default,
                                color: 'rgba(153, 153, 153, 1)',
                              }}>
                              {item.updatetime}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: FontFamily.semi_bold,
                              }}>
                              {bank.holder_name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: FontFamily.default,
                                color: 'rgba(153, 153, 153, 1)',
                              }}>
                              Ac. No.: {bank.account_no} {'\n'}
                              Ifsc : {bank.ifsc_no} {'\n'}
                            </Text>
                          </View>
                          <View style={{marginLeft: -10}}>
                            {/* <Text style={{textAlign:"right",fontFamily:FontFamily.default,fontSize:10,color:"rgba(153, 153, 153, 1)"}}>5m ago</Text> */}
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: FontFamily.semi_bold,
                                color: Colors.orange,
                                lineHeight: 40,
                              }}>
                              KWD {item.amount}
                            </Text>
                            {/* <Text style={{ textAlign: "right", fontFamily: FontFamily.semi_bold, fontSize: 13, color: "rgba(235, 219, 78, 1)" }}>Pending</Text> */}
                          </View>
                        </View>
                      </Card>
                    );
                  }}
                  keyExtractor={(i, ind) => ind}
                  style={{
                    marginTop: 30,
                  }}
                  contentInsetAdjustmentBehavior="automatic"
                  contentContainerStyle={{
                    paddingBottom: 10,
                    //    height:"100%"
                  }}
                />
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};
const sb = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    height: 100,
  },
});

export default MyWithdraw;
