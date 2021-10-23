import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  Icon,
  Input,
  Card,
  AirbnbRating,
  Overlay,
  Image,
} from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import {
  back_img3,
  boat_img1,
  Colors,
  FontFamily,
  Sizes,
} from '../../Constants/Constants';
import Ad from '../../Data/Ad';
import axios from 'axios';
import config from '../../Constants/config';
import { Loading } from '../../Components/Loader';

const manageBoats = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);
  // --------------------------------------- //
  const toggleOverlay = ({ item }) => {
    setVisible(!visible);
    setItemData(item);
  };
  // console.log(Data);
  useEffect(async () => {
    navigation.addListener(
      'focus',
      () => {
        allData()
      },
    );
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    // setUser_id_post(parsedInfo.id)
    allData();
  }, []);
  const allData = async () => {
    setLoader(true);
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    // setUser_id_post(parsedInfo.id)
    let url = config.apiUrl + '/boat_list.php?user_id_post=' + parsedInfo.id;
    axios
      .get(url)
      .then(res => {
        setLoader(false);
        setIsFetching(false);
        console.log('boat_list', JSON.stringify(res.data, null, 1));
        let data = JSON.stringify(res.data, null, 1);
        if (res.data.success === 'true') {
          console.log('boat_list1', res.data.boat_arr);
          setData(res.data.boat_arr);
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  };
  const deleteBoat = async id => {
    setLoader(true);
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    // setUser_id_post(parsedInfo.id)
    let url =
      config.apiUrl +
      '/boat_delete.php?user_id_post=' +
      parsedInfo.id +
      '&boat_id=' +
      id;
    axios
      .get(url)
      .then(res => {
        setLoader(false);
        console.log('boat_delete', JSON.stringify(res.data, null, 1));
        let data = JSON.stringify(res.data, null, 1);
        if (res.data.success === 'true') {
          setVisible(!visible);
          setItemData(null);
          // console.log('boat_list1', res.data.boat_arr);
          // setData(res.data.boat_arr)
          allData();
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  };
  const onRefresh = () => {
    setIsFetching(true);
    allData();
  };
  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Header
        name="Choose Boat"
        backBtn={true}
        headerHeight={Sizes.height * 0.2}
      // searchBtn={true}
      />
      {/* Buttons */}
      <View style={s.btn_1}></View>
      {/* View */}
      <View style={s.SEC2}>
        <TouchableOpacity
          style={[s.btn1]}
          onPress={() => navigation.navigate('AddBoat', { type: 'Add' })}>
          <Text style={{ letterSpacing: 0.75 }}>Add</Text>
        </TouchableOpacity>
        {loader ? (
          <Loading />
        ) : (
          <View>
            {data === 'NA' ? (
              <View style={{ alignItems: 'center', marginTop: '10%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ccc' }}>
                  No Boats Added
                </Text>
              </View>
            ) : (
              <FlatList
                data={data === 'NA' ? [] : data}
                showsVerticalScrollIndicator={false}
                refreshing={isFetching}
                onRefresh={onRefresh}
                renderItem={({ item }) => {
                  return (
                    <View style={{ padding: 5 }}>
                      <Card
                        containerStyle={{
                          padding: 0,
                          borderRadius: 15,
                          paddingHorizontal: 0,
                          margin: 7.5,
                          marginHorizontal: 10,
                          elevation: 5,
                        }}>
                        {/*  */}
                        <View style={s.SEC3}>
                          <View style={{ width: '90%', paddingStart: 10 }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text style={{ fontWeight: 'bold' }}>
                                Year-{item.manufacturing_year.split('-')[0]}
                              </Text>
                              <Text>{item.name}</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text>Capacity - {item.boat_capacity}</Text>
                              <Text style={{ color: '#ccc' }}>
                                #{item.boat_id}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={{}}
                            onPress={() => toggleOverlay({ item })}>
                            <Icon
                              name="dots-three-vertical"
                              type="entypo"
                              color={'#888'}
                            />
                          </TouchableOpacity>
                        </View>
                      </Card>
                    </View>
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
          </View>
        )}
      </View>
      {/* Overlay */}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{ borderRadius: 20 }}
        supportedOrientations
        statusBarTranslucent>
        <View style={{ padding: 10, width: Sizes.width * 0.8 }}>
          <TouchableOpacity onPress={() => navigation.navigate('viewBoat', { item: itemData })} >
            <Text
              style={{
                fontFamily: FontFamily.semi_bold,
                fontSize: 16,
                lineHeight: 39,
                color: 'rgba(0, 0, 0, 0.55)',
              }}>
              View
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              borderWidth: 0.5,
              marginTop: 5,
              borderColor: 'rgba(0, 0, 0, 0.55)',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddBoat', { type: 'Edit', item: itemData })
            }>
            <Text
              style={{
                fontFamily: FontFamily.semi_bold,
                fontSize: 16,
                lineHeight: 39,
                color: 'rgba(0, 0, 0, 0.55)',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              borderWidth: 0.5,
              marginTop: 5,
              borderColor: 'rgba(0, 0, 0, 0.55)',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
          />
          <TouchableOpacity onPress={() => deleteBoat(itemData.boat_id)}>
            <Text
              style={{
                fontFamily: FontFamily.semi_bold,
                fontSize: 16,
                lineHeight: 39,
                color: 'rgba(0, 0, 0, 0.55)',
              }}>
              Delete
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              borderWidth: 0.5,
              marginTop: 5,
              borderColor: 'rgba(0, 0, 0, 0.55)',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
          />
          <TouchableOpacity onPress={() => toggleOverlay({ item: undefined })}>
            <Text
              style={{
                fontFamily: FontFamily.semi_bold,
                fontSize: 16,
                lineHeight: 39,
                color: 'rgba(0, 0, 0, 0.55)',
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};
const s = StyleSheet.create({
  btn1: {
    borderRadius: 5,
    elevation: 1,
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  btn1Text: {
    fontSize: 15,
    fontFamily: FontFamily.semi_bold,
    color: Colors.black,
  },
  btn_1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // position: "absolute",
    alignSelf: 'center',
    top: 100,
  },
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
  },
  ImageBackground: {
    height: 215,
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center',
    // marginHorizontal:10,
    elevation: 0,
  },
  imgStyle: {
    borderRadius: 15,
    height: 215,
    width: '100%',
    alignSelf: 'center',
  },
  SEC3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 18,
    color: Colors.orange,
    // lineHeight:20
  },
  type: {
    fontFamily: FontFamily.default,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black1,
  },
  no: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    lineHeight: 20,
    color: Colors.black1,
  },
  dis: {
    fontFamily: FontFamily.default,
    fontSize: 13,
    color: Colors.black1,
  },
  place: {
    fontFamily: FontFamily.default,
    fontSize: 16,
    color: Colors.orange,
  },
  trapezoid_discount: {
    width: 115,
    height: 0,
    borderBottomWidth: 25,
    borderBottomColor: Colors.orange,
    borderLeftWidth: 25,
    borderLeftColor: 'transparent',
    borderRightWidth: 25,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
    marginTop: 19.2,
    marginLeft: -26,
  },
});

export default manageBoats;
