import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../Components/Header';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import config from '../../Constants/config';
import { TextInput } from 'react-native-gesture-handler';
import { CallApi } from '../../config/callApi';
import moment from 'moment';

// const AddAd = () => {
//   const Navigation = useNavigation();
//   const [user_id_post, setUser_id_post] = useState('');
//   const [boat_name, setBoat_name] = useState('abcd');
//   const [boat_brand, setBoat_brand] = useState('xyza');
//   const [boat_number, setBoat_number] = useState('13');
//   const [registration_no, setRegistration_no] = useState('asd1357poi');
//   const [boat_year, setBoat_year] = useState('2015');
//   const [boat_length, setBoat_length] = useState('150');
//   const [boat_capacity, setBoat_capacity] = useState('12');
//   const [cabins, setCabins] = useState('2');
//   const [toilets, setToilets] = useState('2');

//   useEffect(async () => {
//     let userInfo = await AsyncStorage.getItem('userInfo');
//     let parsedInfo = JSON.parse(userInfo);
//     console.log('parsedInfo', parsedInfo.id);
//     setUser_id_post(parsedInfo.id);
//   }, []);
const width = Dimensions.get('window').width;
class AddAd1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      equibments: [],
      equibmentsCheck: [],
      food: [],
      foodCheck: [],
      entainment: [],
      entainmentCheck: [],
      destination: [],
      destinationCheck: [],
      openTime: new Date(),
      showOpenTime: false,
      closeTime: new Date(),
      showCloseTime: false,
      fixedTime: new Date(),
      showFixedTime: false,
      date: new Date(),
      equibTextInput: [],
      equibIds: [],
      entainmentTextInput: [],
      entainmentIds: [],
      foodTextInput: [],
      foodIds: [],
      destinationTextInput: [],
      destinationIds: [],
      Free_Cancel_Days: '',

      userId: '',
      tripTimeType: 'open', // fixed open : 2, fixed :1
      addType: 'public', // private
    };
  }
  async componentDidMount() {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    this.setState({ userId: parsedInfo.id });
    console.log('baoi', this.props.route.params);
    this.addOnData();
  }
  equibselectCheckBox = index => {
    const { equibments } = this.state;
    console.log('indes', equibments);
    for (let i = 0; i < equibments.length; i++) {
      if (i === index) {
        if (equibments[i].onCheck === 1) {
          equibments[i].onCheck = 0;
        } else {
          let count = equibments.filter(function (s) {
            return s.onCheck === 1;
          });

          equibments[i].onCheck = 1;
        }
        this.setState(
          {
            equibments,
          },
          () => {
            let petList = equibments.filter(function (s) {
              return s.onCheck === 1;
            });
            this.setState({ equibmentsCheck: petList }, () =>
              this.equibmentsCheck(),
            );
          },
        );
      }
    }
  };
  equibmentsCheck = () => {
    let id = this.state.equibmentsCheck.map(function (item) {
      return item['addon_product_id'].toString();
    });
    this.setState({
      equibIds: id,
    });
  };
  foodselectCheckBox = index => {
    const { food } = this.state;
    console.log('indes', food);
    for (let i = 0; i < food.length; i++) {
      if (i === index) {
        if (food[i].onCheck === 1) {
          food[i].onCheck = 0;
        } else {
          let count = food.filter(function (s) {
            return s.onCheck === 1;
          });

          food[i].onCheck = 1;
        }
        this.setState(
          {
            food,
          },
          () => {
            let petList = food.filter(function (s) {
              return s.onCheck === 1;
            });
            this.setState({ foodCheck: petList }, () => this.foodCheck());
          },
        );
      }
    }
  };
  foodCheck = () => {
    let id = this.state.foodCheck.map(function (item) {
      return item['addon_product_id'].toString();
    });
    this.setState({
      foodIds: id,
    });
  };
  entertainmentselectCheckBox = index => {
    const { entainment } = this.state;
    console.log('indes', entainment);
    for (let i = 0; i < entainment.length; i++) {
      if (i === index) {
        if (entainment[i].onCheck === 1) {
          entainment[i].onCheck = 0;
        } else {
          let count = entainment.filter(function (s) {
            return s.onCheck === 1;
          });

          entainment[i].onCheck = 1;
        }
        this.setState(
          {
            entainment,
          },
          () => {
            let petList = entainment.filter(function (s) {
              return s.onCheck === 1;
            });
            this.setState({ entainmentCheck: petList }, () =>
              this.entainmentCheck(),
            );
          },
        );
      }
    }
  };
  entainmentCheck = () => {
    let id = this.state.entainmentCheck.map(function (item) {
      return item['addon_product_id'].toString();
    });
    this.setState({
      entainmentIds: id,
    });
  };
  destinationselectCheckBox = index => {
    const { destination } = this.state;
    console.log('indes', destination);
    for (let i = 0; i < destination.length; i++) {
      if (i === index) {
        if (destination[i].onCheck === 1) {
          destination[i].onCheck = 0;
        } else {
          let count = destination.filter(function (s) {
            return s.onCheck === 1;
          });

          destination[i].onCheck = 1;
        }
        this.setState(
          {
            destination,
          },
          () => {
            let petList = destination.filter(function (s) {
              return s.onCheck === 1;
            });
            this.setState({ destinationCheck: petList }, () =>
              this.destinationCheck(),
            );
          },
        );
      }
    }
  };
  destinationCheck = () => {
    let id = this.state.destinationCheck.map(function (item) {
      return item['destination_id'].toString();
    });
    this.setState({
      destinationIds: id,
    });
  };
  addOnData = () => {
    let url =
      config.apiUrl +
      '/boat_trip_type_for_add_advr.php?user_id_post=' +
      this.state.userId +
      '&country_code=965';
    axios
      .get(url)
      .then(res => {
        console.log('boat_trip_type_for_add_advr', res.data.destination_arr);
        if (res) {
          this.setState({
            food: res.data.addon_arr[0].addon_products,
            entainment: res.data.addon_arr[1].addon_products,
            equibments: res.data.addon_arr[2].addon_products,
            destination: res.data.destination_arr,
          });
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  };
  Addad = async () => {
    const props = this.props.route.params;
    const { openTime, tripTimeType, closeTime, fixedTime, addType } = this.state
    this.state.entainmentIds.splice(-1),
      this.state.foodIds.splice(-1),
      this.state.equibIds.splice(-1),
      this.state.destinationIds.splice(-1),
      console.log(
        'destinationTextInput',
        this.state.destinationIds,
        // this.state.destinationTextInput,
      );
    // console.log(
    //   'foodTextInput',
    //   this.state.foodIds,
    //   this.state.foodTextInput,
    // );
    // console.log(
    //   'equibTextInput',
    //   this.state.equibIds,
    //   this.state.equibTextInput,
    // );

    var foodItems = this.state.foodTextInput;
    var entainmentItems = this.state.entainmentTextInput;
    var equibItems = this.state.equibTextInput;

    var destinationItems = this.state.destinationTextInput;

    foodItems = foodItems.filter(function (element) {
      return element !== undefined;
    });
    entainmentItems = entainmentItems.filter(function (element) {
      return element !== undefined;
    });
    equibItems = equibItems.filter(function (element) {
      return element !== undefined;
    });

    destinationItems = destinationItems.filter(function (element) {
      return element !== undefined;
    });

    var idsArr = [];
    var priceArr = [];

    idsArr = this.state.foodIds.concat(
      this.state.entainmentIds,
      this.state.equibIds,
    );
    priceArr = foodItems.concat(entainmentItems, equibItems);

    var images = props.images;
    images = images.filter(function (element) {
      return element !== null;
    });
    console.log('concted array', idsArr, priceArr);

    let url = config.apiUrl + '/advertisement_create.php';
    var data = new FormData();
    data.append('user_id_post', this.state.userId);
    data.append('captain_eng', props.English_captain);
    data.append('captain_ar', props.Arbic_captain);
    data.append('mobile', props.Contact_number);
    data.append('trip_type_id', props.Trip_type);
    data.append('boat_id', props.Boat);
    data.append('no_of_people', props.Max_number_of_people);
    data.append('location_address', 'Arabs');
    data.append('location_lat', props.BoatLat);
    data.append('location_lng', props.BoatLang);
    data.append('city', props.cityOfBoat);
    data.append('discription_ar', props.Description_arbic);
    data.append('discription_en', props.Description_engilsh);
    data.append('rental_price', 25);
    data.append('extra_price', props.Extra_per_hour_price);
    data.append('minimum_hours', props.Minimum_hour);
    data.append('idle_hours', props.Ideal_hour);
    data.append('discount', props.Discount);
    data.append('coupon_code', props.Coupon_discount);
    data.append('coupon_discount', props.Coupon_discount_perct);
    if (tripTimeType === 'open') {
      data.append('trip_time_type', '1');
      data.append('trip_time_start', moment(openTime).format('HH:mm:ss'));
      data.append('trip_time_end', moment(closeTime).format('HH:mm:ss'));
    } else {
      data.append('trip_time_type', '2');
      data.append('trip_time_start', moment(fixedTime).format('HH:mm:ss'));
    }
    data.append('adver_boat_type', addType === 'public' ? '2' : '1');
    data.append('freeCancel_days', this.state.Free_Cancel_Days);
    // data.append('image', JSON.stringify(props.images));
    idsArr.forEach(item => {
      data.append('addons[]', item);
    });
    priceArr.forEach(item => {
      data.append('prices[]', item);
    });
    this.state.destinationIds.forEach(item => {
      data.append('destinations[]', item);
    });
    destinationItems.forEach(item => {
      data.append('dest_prices[]', item);
    });

    images.forEach(item => {
      data.append('image[]', item);
    });
    console.log('form data', data);
    this.setState({ loader: true });
    // return CallApi('POST', '/advertisement_create.php', data).then(res => {
    //   this.setState({ btnloader: false });
    //   console.log('res advertisement_create', res);
    //   this.setState({ loader: false })
    //   if (res) {

    //   } else {
    //     ToastMessage({
    //       message: res.message,
    //       type: res.type || 'warning',
    //     });
    //   }
    // });
    // var data = new FormData();
    // data.append('user_id_post', '69');
    // data.append('captain_eng', 'ujhksdghk');
    // data.append('captain_ar', 'wewetewttetw');
    // data.append('mobile', '8763987525');
    // data.append('trip_type_id', '6');
    // data.append('boat_id', '25');
    // data.append('no_of_people', '2');
    // data.append('location_address', 'Arabs');
    // data.append('location_lat', '256');
    // data.append('location_lng', '695');
    // data.append('city', '2');
    // data.append('discription_ar', 'asfsdgdsg');
    // data.append('discription_en', 'adaDAsAa');
    // data.append('rental_price', '256');
    // data.append('extra_price', '26');
    // data.append('minimum_hours', '5');
    // data.append('idle_hours', '2');
    // data.append('discount', '256');
    // data.append('coupon_code', 'NISH0123');
    // data.append('coupon_discount', '25');
    // data.append('trip_time_type', 2);
    // data.append('trip_time_start', '10:00:00');
    // data.append('trip_time_end', '18:00:00');
    // data.append('adver_boat_type', 2);
    // data.append('freeCancel_days', '1');
    // data.append('addons[0]', '1');
    // data.append('prices[0]', '25');
    // data.append('destinations[0]', '7');
    // data.append('dest_prices[0]', '25');
    // data.append('image[0]', 'ZVpZLpWaEeW7kJq1599253204.png');
    // console.log('form data', data);
    axios
      .post(url, data)
      .then(res => {
        console.log('advertisement_create', res);
        this.setState({ loader: false });
        if (res) {
          this.props.navigation.navigate('Ad');
        } else {
          alert(res.data.msg[0]);
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const {
      showCloseTime,
      showFixedTime,
      showOpenTime,
      closeTime,
      openTime,
      fixedTime,
      date,
      tripTimeType,
      addType,
    } = this.state;
    console.log('props', this.props.route.params);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header imgBack={true} name="Add Advertisement" backBtn={true} />
        <ScrollView>
          <View style={{ marginHorizontal: 15 }}>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Trip Time</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  {tripTimeType === 'open' ? (
                    <Fontisto
                      onPress={() => this.setState({ tripTimeType: 'open' })}
                      name="radio-btn-active"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                        marginEnd: 5,
                      }}
                    />
                  ) : (
                    <Fontisto
                      onPress={() => this.setState({ tripTimeType: 'open' })}
                      name="radio-btn-passive"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                        marginEnd: 5,
                      }}
                    />
                  )}
                  <Text>Open Time</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({ showOpenTime: !showOpenTime })}>
                  <Text>{moment(openTime).format('hh:mm a')}</Text>
                </TouchableOpacity>
                {showOpenTime && tripTimeType === 'open' && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={openTime}
                    mode={'time'}
                    is24Hour={true}
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      var currentDate = selectedDate || date;
                      this.setState({
                        showOpenTime: false,
                        openTime: currentDate,
                      });
                    }}
                  />
                )}
                <Text>To</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ showCloseTime: true })}>
                  <Text>{moment(closeTime).format('hh:mm a')}</Text>
                </TouchableOpacity>
                {showCloseTime && tripTimeType === 'open' && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={closeTime}
                    mode={'time'}
                    is24Hour={true}
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      var currentDate = selectedDate || date;
                      this.setState({
                        showCloseTime: false,
                        closeTime: currentDate,
                      });
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  {tripTimeType === 'fixed' ? (
                    <Fontisto
                      onPress={() => this.setState({ tripTimeType: 'fixed' })}
                      name="radio-btn-active"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                        marginEnd: 5,
                      }}
                    />
                  ) : (
                    <Fontisto
                      onPress={() => this.setState({ tripTimeType: 'fixed' })}
                      name="radio-btn-passive"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                        marginEnd: 5,
                      }}
                    />
                  )}
                  <Text>Fixed Time</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ showFixedTime: !showFixedTime })
                  }>
                  <Text>{moment(fixedTime).format('hh:mm a')}</Text>
                </TouchableOpacity>
                {showFixedTime && tripTimeType === 'fixed' && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={fixedTime}
                    mode={'time'}
                    // is24Hour={true}
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      var currentDate = selectedDate || date;
                      this.setState({
                        showFixedTime: false,
                        fixedTime: currentDate,
                      });
                    }}
                  />
                )}
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Equib</Text>
              <FlatList
                data={this.state.equibments}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '48%',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{ width: '32%', alignSelf: 'center' }}>
                        {item.addon_product_name[0]}
                      </Text>
                      <TextInput
                        style={{
                          borderWidth: 0.5,
                          width: '22%',
                          height: 40,
                          alignSelf: 'center',
                        }}
                        d
                        keyboardType={'number-pad'}
                        editable={item.onCheck === 1 ? true : false}
                        onChangeText={text => {
                          let { equibTextInput } = this.state;
                          equibTextInput[index] = text;
                          this.setState({
                            equibTextInput,
                          });
                        }}
                        editable={item.onCheck === 1 ? true : false}
                        onEndEditing={text =>
                          this.setState({
                            equibIds: [
                              ...this.state.equibIds,
                              item.addon_product_id,
                            ],
                          })
                        }
                      />
                      {/* <AntDesign
                        name="checksquareo"
                        size={25}
                        color={'#000'}
                        style={{
                          alignSelf: 'center',
                        }}
                      /> */}
                      <TouchableOpacity
                        onPress={() => this.equibselectCheckBox(index)}>
                        {item.onCheck === 1 ? (
                          <Ionicons
                            name="checkbox" //checkbox
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        ) : (
                          <Ionicons
                            name="square-outline"
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }}
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
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Food</Text>
              <FlatList
                data={this.state.food}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '48%',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{ width: '32%', alignSelf: 'center' }}>
                        {item.addon_product_name[0]}
                      </Text>
                      <TextInput
                        style={{
                          borderWidth: 0.5,
                          width: '22%',
                          height: 40,
                          alignSelf: 'center',
                        }}
                        keyboardType={'number-pad'}
                        editable={item.onCheck === 1 ? true : false}
                        onChangeText={text => {
                          let { foodTextInput } = this.state;
                          foodTextInput[index] = text;
                          this.setState({
                            foodTextInput,
                          });
                        }}
                        onEndEditing={text =>
                          this.setState({
                            foodIds: [
                              ...this.state.foodIds,
                              item.addon_product_id,
                            ],
                          })
                        }
                      />
                      <TouchableOpacity
                        onPress={() => this.foodselectCheckBox(index)}>
                        {item.onCheck === 1 ? (
                          <Ionicons
                            name="checkbox" //checkbox
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        ) : (
                          <Ionicons
                            name="square-outline"
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }}
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
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Entertainment
              </Text>
              <FlatList
                data={this.state.entainment}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '48%',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{ width: '32%', alignSelf: 'center' }}>
                        {item.addon_product_name[0]}
                      </Text>
                      <TextInput
                        style={{
                          borderWidth: 0.5,
                          width: '22%',
                          height: 40,
                          alignSelf: 'center',
                        }}
                        keyboardType={'number-pad'}
                        editable={item.onCheck === 1 ? true : false}
                        onChangeText={text => {
                          let { entainmentTextInput } = this.state;
                          entainmentTextInput[index] = text;
                          this.setState({
                            entainmentTextInput,
                          });
                        }}
                        onEndEditing={text =>
                          this.setState({
                            entainmentIds: [
                              ...this.state.entainmentIds,
                              item.addon_product_id,
                            ],
                          })
                        }
                      />
                      <TouchableOpacity
                        onPress={() => this.entertainmentselectCheckBox(index)}>
                        {item.onCheck === 1 ? (
                          <Ionicons
                            name="checkbox" //checkbox
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        ) : (
                          <Ionicons
                            name="square-outline"
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }}
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
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Destination
              </Text>
              <FlatList
                data={this.state.destination}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '48%',
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          width: '32%',
                          alignSelf: 'center',
                          alignSelf: 'center',
                        }}>
                        {item.destination[0]}
                      </Text>
                      <TextInput
                        style={{
                          borderWidth: 0.5,
                          width: '22%',
                          height: 40,
                          alignSelf: 'center',
                        }}
                        keyboardType={'number-pad'}
                        editable={item.onCheck === 1 ? true : false}
                        onChangeText={text => {
                          let { destinationTextInput } = this.state;
                          destinationTextInput[index] = text;
                          this.setState({
                            destinationTextInput,
                          });
                        }}
                        onEndEditing={text =>
                          this.setState({
                            destinationIds: [
                              ...this.state.destinationIds,
                              item.destination_id,
                            ],
                          })
                        }
                      />
                      <TouchableOpacity
                        onPress={() => this.destinationselectCheckBox(index)}>
                        {item.onCheck === 1 ? (
                          <Ionicons
                            name="checkbox" //checkbox
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        ) : (
                          <Ionicons
                            name="square-outline"
                            style={{ fontSize: 30, color: Colors.orange }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }}
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
            </View>
            {/* Advertisement Type  */}
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Advertisement Type
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '48%',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{
                      width: '32%',
                      alignSelf: 'center',
                      alignSelf: 'center',
                    }}>
                    Public
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 0.5,
                      width: '22%',
                      height: 40,
                      alignSelf: 'center',
                    }}
                    keyboardType={'number-pad'}
                    editable={addType === 'public' ? true : false}
                  // onChangeText={text => {
                  //   let { destinationTextInput } = this.state;
                  //   destinationTextInput[index] = text;
                  //   this.setState({
                  //     destinationTextInput,
                  //   });
                  // }}
                  // onEndEditing={text =>
                  //   this.setState({
                  //     destinationIds: [
                  //       ...this.state.destinationIds,
                  //       item.destination_id,
                  //     ],
                  //   })
                  // }
                  />
                  {addType === 'public' ? (
                    <Fontisto
                      onPress={() => this.setState({ addType: 'public' })}
                      name="radio-btn-active"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                      }}
                    />
                  ) : (
                    <Fontisto
                      onPress={() => this.setState({ addType: 'public' })}
                      name="radio-btn-passive"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                      }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '48%',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{
                      width: '32%',
                      alignSelf: 'center',
                      alignSelf: 'center',
                    }}>
                    Private
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 0.5,
                      width: '22%',
                      height: 40,
                      alignSelf: 'center',
                    }}
                    keyboardType={'number-pad'}
                    editable={addType === 'private' ? true : false}
                  // onChangeText={text => {
                  //   let { destinationTextInput } = this.state;
                  //   destinationTextInput[index] = text;
                  //   this.setState({
                  //     destinationTextInput,
                  //   });
                  // }}
                  // onEndEditing={text =>
                  //   this.setState({
                  //     destinationIds: [
                  //       ...this.state.destinationIds,
                  //       item.destination_id,
                  //     ],
                  //   })
                  // }
                  />
                  {addType === 'private' ? (
                    <Fontisto
                      onPress={() => this.setState({ addType: 'private' })}
                      name="radio-btn-active"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                      }}
                    />
                  ) : (
                    <Fontisto
                      onPress={() => this.setState({ addType: 'private' })}
                      name="radio-btn-passive"
                      size={25}
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
            <View
              style={{ borderBottomWidth: 1, marginTop: 15, marginBottom: 10 }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text>Free to cancel before </Text>
              <TextInput
                value={this.state.Free_Cancel_Days}
                style={{
                  borderWidth: 1,
                  height: 40,
                  width: 60,
                  marginHorizontal: 10,
                }}
                keyboardType={'number-pad'}
                onChangeText={Free_Cancel_Days => this.setState({ Free_Cancel_Days })}
              />
              <Text>Days</Text>
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => this.Addad()} style={s.btn1}>
              <Text style={s.btn1Text}>Submit</Text>
              {this.state.loader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : null}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const s = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -120,
    borderRadius: 10,
    height: 150,
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  Input1: {
    borderBottomColor: Colors.black,
    marginTop: -7,
  },
  Input: {
    borderBottomColor: Colors.black,
    marginTop: -0,
  },
  btn1: {
    height: 48,
    width: '95%',
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 5,
    flexDirection: 'row',
  },
  btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
});
export default AddAd1;
