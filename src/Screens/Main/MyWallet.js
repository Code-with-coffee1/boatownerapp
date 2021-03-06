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
import {Icon, Input, Card} from 'react-native-elements';
import Header from '../../Components/Header';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../Constants/config';
import axios from 'axios';
import moment from 'moment';
import {Loading} from '../../Components/Loader';
const MyWallet = () => {
  const [totalEarn, setTotalEarn] = useState(0);
  const [pending, setPending] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  // --------------------------------------- //
  useEffect(async () => {
    wallet_data();
  }, []);
  const wallet_data = async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    setLoader(true);
    let url =
      config.apiUrl + '/wallet_history_owner.php?user_id_post=' + parsedInfo.id;
    axios
      .get(url)
      .then(res => {
        console.log('wallet_history_owner', res.data);
        setLoader(false);
        if (res.data.success === 'true') {
          // console.log('getUserDetails', res.data);
          setTotalEarn(res.data.total_earning);
          setPending(res.data.pending_amount);
          setData(res.data.history_arr);
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        backBtn={true}
        name="My Wallet"
        imgBack={true}
        headerHeight={300}
      />
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
            KWD {totalEarn ? totalEarn : '0'}
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
            KWD {pending ? pending : '0'}
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
            {data === 'NA' ? (
              <View style={{alignItems: 'center', marginTop: '10%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ccc'}}>
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
                        }}>
                        <View style={{alignSelf: 'flex-start'}}>
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
                            {' '}
                            {moment(item.updatetime).format(
                              'hh:mm a, DD-MMM-YYYY',
                            )}{' '}
                          </Text>
                        </View>
                        <View style={{alignSelf: 'flex-end'}}>
                          <Text
                            style={{
                              textAlign: 'right',
                              fontFamily: FontFamily.default,
                              fontSize: 10,
                              color: 'rgba(153, 153, 153, 1)',
                            }}>
                            {moment(item.updatetime).fromNow()}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: FontFamily.semi_bold,
                              color: Colors.orange,
                            }}>
                            KWD {item.amount}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  );
                }}
                keyExtractor={(i, ind) => ind}
                style={{}}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{
                  paddingBottom: 10,
                  //    height:"100%"
                }}
              />
            )}
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

export default MyWallet;
