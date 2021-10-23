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
  I18nManager,
} from 'react-native';
import {Icon, Input, Card, Rating, AirbnbRating} from 'react-native-elements';
import Header, {s} from '../../Components/Header';
import {back_img4, Colors, FontFamily, Sizes} from '../../Constants/Constants';
import {useNavigation} from '@react-navigation/core';
import {Switch} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../Constants/config';
import axios from 'axios';
import {Loading} from '../../Components/Loader';

const NotificationsPage = () => {
  const navigation = useNavigation();
  const [user_id_post, setUser_id_post] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  // --------------------------------------- //
  const gotoNotifications_Details = ({data}) => {
    navigation.navigate('Notifications_Details', {data});
  };
  useEffect(async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    setUser_id_post(parsedInfo.id);
    setLoader(true);
    let url =
      config.apiUrl + '/notificationList.php?user_id_post=' + parsedInfo.id;
    // + parsedInfo.id;
    axios
      .get(url)
      .then(res => {
        console.log('res', res);
        setLoader(false);
        if (res.data.success === 'true') {
          console.log('notificationList', res.data.notification_arr);
          setData(res.data.notification_arr);
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  }, []);
  const deleteNotification = () => {
    alert('delete');
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header backBtn={true} name="Notifications" />
      {/* Clear */}
      <View style={{position: 'absolute', right: 30, top: 32}}>
        <TouchableOpacity>
          <Text
            style={{
              textDecorationStyle: 'solid',
              textDecorationLine: 'underline',
              color: Colors.white,
              fontFamily: FontFamily.default,
              fontSize: 14,
              fontWeight: 'bold',
              letterSpacing: 0.5,
            }}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
      {/* SEC2 */}
      <View style={sb.SEC2}>
        {loader ? (
          <Loading />
        ) : (
          <View style={{marginTop: 30}}>
            {data === 'NA' ? (
              <View style={{alignItems: 'center', marginTop: '10%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ccc'}}>
                  No Notification Recieved
                </Text>
              </View>
            ) : (
              <FlatList
                data={data === 'NA' ? [] : data}
                keyExtractor={(item, ind) => ind}
                contentContainerStyle={{
                  paddingBottom: 15,
                }}
                renderItem={item => {
                  console.log('item', item.item);
                  return (
                    <TouchableOpacity
                      onPress={() => gotoNotifications_Details({data: 'Test'})}>
                      <Card containerStyle={{borderRadius: 12, padding: 5}}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              width: '50%',
                            }}>
                            <Image
                              style={{height: 60, width: 60, borderRadius: 12}}
                              source={{
                                uri: 'https://source.unsplash.com/weekly?face',
                              }}
                            />
                            <View style={{marginLeft: 7}}>
                              <Text
                                style={{
                                  fontFamily: FontFamily.semi_bold,
                                  fontSize: 16,
                                  lineHeight: 22,
                                }}>
                                {item.item.title[0]}
                              </Text>
                              <Text
                                style={{
                                  width: '50%',
                                  fontSize: 12,
                                  fontFamily: FontFamily.default,
                                  color: 'rgba(0, 0, 0, 0.58)',
                                }}>
                                {item.item.message[0]}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: FontFamily.default,
                                color: 'rgba(0, 0, 0, 0.58)',
                              }}>
                              {item.item.createtime_ago}
                            </Text>
                            <TouchableOpacity onPress={deleteNotification}>
                              <Card
                                containerStyle={{
                                  height: 30,
                                  width: 30,
                                  padding: 0,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Icon name="cross" type="entypo" />
                              </Card>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  );
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
    marginTop: -120,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
  },
});
export default NotificationsPage;
