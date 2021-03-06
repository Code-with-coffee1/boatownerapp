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
import axios from 'axios';
import Outgoing from '../../Data/Outgoing';
import Upcoming from '../../Data/Upcoming';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../Constants/config';
import {Loading} from '../../Components/Loader';
import {PROPERTY_TYPES} from '@babel/types';
import Geolocation from 'react-native-geolocation-service';
import Geocode from 'react-geocode';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Home = props => {
  const [btn1Style, setBtn1Style] = useState({
    backColor: Colors.orange,
    textCOlor: Colors.white,
  });
  const [btn2Style, setBtn2Style] = useState({
    backColor: Colors.white,
    textCOlor: Colors.black,
  });
  const OutgoingData = Outgoing;
  const UpcomingData = Upcoming;
  const [data, setData] = useState(true);
  const [upcoming, setUpcoming] = useState(null);
  const [outgoing, setOutgoing] = useState(null);
  const [user_id_post, setUser_id_post] = useState(null);
  const [loader, setLoader] = useState(false);
  // --------------------------------------- //
  const OutgoingBtn = () => {
    setData(true);
    setBtn2Style({
      backColor: Colors.white,
      textCOlor: Colors.black,
    });
    setBtn1Style({
      backColor: Colors.orange,
      textCOlor: Colors.white,
    });
    // setData(OutgoingData);
  };
  // -------------------------------------- //
  const UpcomingBtn = () => {
    setData(false);
    setBtn1Style({
      backColor: Colors.white,
      textCOlor: Colors.black,
    });
    setBtn2Style({
      backColor: Colors.orange,
      textCOlor: Colors.white,
    });
    // setData(UpcomingData);
  };

  useEffect(async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    setUser_id_post(parsedInfo.id);
    setLoader(true);
    // let url = config.apiUrl + '/booking_list_owner.php?user_id_post=' + parsedInfo.id;
    let url = config.apiUrl + '/booking_list_owner.php?user_id_post=14';
    // + parsedInfo.id;
    axios
      .get(url)
      .then(res => {
        console.log('getUserDetails', res.data);
        setLoader(false);
        if (res.data.success === 'true') {
          setData(res.data.upcoming_booking_arr);
          if (res.data.upcoming_booking_arr !== 'NA') {
            setUpcoming(res.data.upcoming_booking_arr);
          } else if (res.data.ongoning_booking_arr !== 'NA') {
            setOutgoing(res.data.ongoning_booking_arr);
          }
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  }, []);
  const CardView = ({item, ind}) => {
    // console.log('item', item)
    return (
      <View>
        <Card containerStyle={s.Card}>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: config.imageUrl + item.image,
                }}
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 12,
                  marginLeft: -6,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 8,
                }}>
                <View style={{}}>
                  <Text style={s.name}>{item.boat_name}</Text>
                  <Text style={s.type}>Boat</Text>
                  <Text style={s.id}>{item.booking_no}</Text>
                  <Text style={s.type}>{item.time}</Text>
                </View>
                <View style={{justifyContent: 'space-around'}}>
                  <Text style={[s.type, {textAlign: 'right'}]}>
                    {item.createtime}
                  </Text>
                  <Text style={s.price}>KWD{item.total_amt}</Text>
                  <Text style={s.status}>{item.status}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };
  const allmapdata = data => {
    // console.log('hiii', data.description);
    Geocode.fromAddress(data.description).then(
      response => {
        const {lat, lng} = response.results[0].geometry.location;
        this.props.navigation.replace('Mapviewpage', {
          lat: lat,
          lng: lng,
        });
      },
      error => {
        console.error(error);
      },
    );
  };
  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <Header imgBack={true} notiBtn={true} searchBtn={true} name="Home" />
      {/* Buttons */}
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          width: '100%',
          top: 100,
        }}>
        <View style={s.btn_1}>
          <TouchableOpacity
            style={[s.btn1, {backgroundColor: btn1Style.backColor}]}
            onPress={() => OutgoingBtn()}
            activeOpacity={0.8}>
            <Text style={[s.btn1Text, {color: btn1Style.textCOlor}]}>
              Outgoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.btn1, {backgroundColor: btn2Style.backColor}]}
            onPress={() => UpcomingBtn()}
            // onPress={() => props.navigation.navigate('MapView')}
            activeOpacity={0.8}>
            <Text style={[s.btn1Text, {color: btn2Style.textCOlor}]}>
              Upcoming
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* View */}
      <View style={s.SEC2}>
        {loader ? (
          <Loading />
        ) : (
          <View>
            {data ? (
              <View>
                {outgoing ? (
                  <FlatList
                    data={outgoing}
                    renderItem={CardView}
                    keyExtractor={(i, ind) => ind}
                    style={{
                      marginTop: 30,
                    }}
                    contentContainerStyle={
                      {
                        //    paddingBottom: 20,
                        //    height:"100%"
                      }
                    }
                    // ListFooterComponentStyle={{height:200}}
                    contentInsetAdjustmentBehavior="automatic"
                  />
                ) : (
                  <View style={{alignItems: 'center', marginTop: '10%'}}>
                    <Text
                      style={{fontSize: 20, fontWeight: 'bold', color: '#ccc'}}>
                      No Data Available
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                {upcoming ? (
                  <FlatList
                    data={upcoming}
                    renderItem={CardView}
                    keyExtractor={(i, ind) => ind}
                    style={{
                      marginTop: 30,
                    }}
                    contentContainerStyle={
                      {
                        //    paddingBottom: 20,
                        //    height:"100%"
                      }
                    }
                    // ListFooterComponentStyle={{height:200}}
                    contentInsetAdjustmentBehavior="automatic"
                  />
                ) : (
                  <View style={{alignItems: 'center', marginTop: '10%'}}>
                    <Text
                      style={{fontSize: 20, fontWeight: 'bold', color: '#ccc'}}>
                      No Data Available
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
const s = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: -40,
    //   marginBottom:40,
    flex: 1,
  },
  btn1: {
    height: 35,
    width: 165,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    elevation: 5,
    margin: 7,
  },
  btn1Text: {
    fontSize: 12,
    fontFamily: FontFamily.semi_bold,
  },
  btn_1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Card: {
    borderRadius: 20,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 15,
  },
  name: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 16,
    marginBottom: 3,
  },
  type: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    marginBottom: 3,
    //   opacity:0.5
    color: Colors.gray1,
  },
  id: {
    fontFamily: FontFamily.semi_bold,
    fontSize: 13,
    marginBottom: 3,
  },
  price: {
    marginBottom: 10,
    fontFamily: FontFamily.semi_bold,
    fontSize: 15,
    color: Colors.price,
    textAlign: 'right',
  },
  status: {
    color: Colors.orange,
    fontFamily: FontFamily.default,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'right',
  },
});
export default Home;
