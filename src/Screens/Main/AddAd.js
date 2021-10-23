import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Icon, Input } from 'react-native-elements';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import config from '../../Constants/config';
import ToastMessage from '../../Components/toastMessage/ToastMessage';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocode from 'react-geocode';
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
const snapPoints = ['0%', '50%'];
class AddAd extends React.Component {
  bottomSheetRef: RefObject<BottomSheet>;
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      Arbic_captain: '', //'sangram4@gmail.com',
      English_captain: '', //'123456',
      Company_name: '',
      Captin_name: '',
      Contact_number: '',
      tripType: '',
      boat: '',
      max_number_of_people: '',
      BoatLang: '',
      BoatLat: '',
      cityOfBoat: '',
      CityName: 'Choose City',
      Description_arbic: '',
      Description_engilsh: '',
      Rental_price: '',
      Extra_per_hour_price: '',
      Minimum_hour: '',
      Ideal_hour: '',
      Coupon_discount: '',
      Coupon_discount_perct: '',
      Discount: '',

      tripTypeDropdown: [],
      boatDropdown: [],
      cityDropdown: [],
      modalVisible: false,

      userId: '',
      images: null,
      imageFiles: [],

      banner: null,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image6: null,
      image7: null,
    };
    this.bottomSheetRef = React.createRef();
  }
  async componentDidMount() {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let location = await AsyncStorage.getItem('location');
    let locationInfo = JSON.parse(location);
    let parsedInfo = JSON.parse(userInfo);
    // console.log('parsedInfo', locationInfo.lat);
    this.setState({ userId: parsedInfo.id });
    this.addOnData();
    // this._unsubscribe = this.props.navigation.addListener('focus', async () => {
    //   let location = await AsyncStorage.getItem('location');
    //   let locationInfo = JSON.parse(location);
    //   this.setState({ BoatLang: locationInfo.lng, BoatLat: locationInfo.lat });
    // });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  handlePresentModalPress = () => {
    this.bottomSheetRef.current.present();
  };
  allmapdata = data => {
    // console.log('hiii', data.description);
    this.bottomSheetRef.current.close();
    Geocode.fromAddress(data.description).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.props.navigation.navigate('MapView', {
          lat: lat,
          lng: lng,
        });
      },

      error => {
        console.error(error);
      },
    );
  };
  uploadImage = type => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      // multiple: true,
      // maxFiles: 7,
      //   cropping: true,
    }).then(image => {
      console.log('mime', image);
      // image.forEach(item => {

      //   this.setState({
      //     imageFiles: [...this.state.imageFiles, imagefil],
      //   });
      // });
      var imagefil = {
        uri: image.path,
        name: image.modificationDate + '.' + image.mime.split('/')[1],
        size: image.size,
        filename: image.modificationDate + '.' + image.mime.split('/')[1],
        type: image.mime,
      };

      var data = new FormData();
      data.append('image', imagefil);
      let url = config.apiUrl + '/upload_adver_image.php';
      axios
        .post(url, data)
        .then(res => {
          console.log('upload_adver_image', res.data);
          console.log('type', type);
          if (res.data.success == 'true') {
            switch (type) {
              case 'banner':
                this.setState({ banner: res.data.image_name });
                break;
              case '1':
                this.setState({ image1: res.data.image_name });
                break;
              case '2':
                this.setState({ image2: res.data.image_name });
                break;
              case '3':
                this.setState({ image3: res.data.image_name });
                break;
              case '4':
                this.setState({ image4: res.data.image_name });
                break;
              case '5':
                this.setState({ image5: res.data.image_name });
                break;
              case '6':
                this.setState({ image6: res.data.image_name });
                break;
              case '7':
                this.setState({ image7: res.data.image_name });
                break;
              default:
                Alert.alert('TYPE NOT FOUND');
            }
          } else {
            alert(res.data.msg[0]);
            console.log(res.data.success);
          }
        })
        .catch(err => console.log(err));
      // this.setState({ images: image });
      // console.log(image);
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
        console.log('boat_trip_type_for_add_advr', res.data.city_arr);
        if (res) {
          this.setState({
            tripTypeDropdown: res.data.trip_type_arr,
            boatDropdown: res.data.boat_arr,
            cityDropdown: res.data.city_arr,
          });
        } else {
          alert(res.data.msg[0]);
          console.log(res.data.success);
        }
      })
      .catch(err => console.log(err));
  };
  Addad = async () => {
    const {
      Arbic_captain,
      English_captain,
      Captin_name,
      Company_name,
      Contact_number,
      tripType,
      boat,
      max_number_of_people,
      BoatLang,
      BoatLat,
      Description_arbic,
      Description_engilsh,
      Rental_price,
      Extra_per_hour_price,
      Minimum_hour,
      Ideal_hour,
      Coupon_discount,
      Coupon_discount_perct,
      Discount,
      banner,
      image1,
      image2,
      image3,
      cityOfBoat,
    } = this.state;
    if (Arbic_captain === '') {
      alert('Enter Arabic Captain Name');
    } else if (English_captain === '') {
      alert('Enter English Captain Name')
    } else if (Contact_number === '') {
      alert('Enter Contact Number');
    } else if (tripType === '') {
      alert('Enter the trip type');
    } else if (boat === '') {
      alert('Enter the boat');
    } else if (max_number_of_people === '') {
      alert('Enter the maximum number of people');
    } else if (BoatLang === '') {
      alert('Enter the BoatLang');
    } else if (cityOfBoat === '') {
      alert(' Enter the cityOfBoat');
    } else if (Description_arbic === '') {
      alert(' Enter the Description of arbic');
    } else if (Description_engilsh === '') {
      alert(' Enter the Description engilsh')
    } else if (Extra_per_hour_price === '') {
      alert(' Enter the Extra per hour price');
    } else if (Minimum_hour === '') {
      alert(' Enter the Minimum hour');
    } else if (Ideal_hour === '') {
      alert(' Enter the Ideal hour');
    } else if (Coupon_discount === '') {
      alert(' Enter the Coupon discount');
    } else if (Coupon_discount_perct === '') {
      alert(' Enter the Coupon discount percent');
    } else if (Discount === '') {
      alert(' Enter the Discount');
    } else if (banner === '') {
      alert(' Enter the Banner image');
    } else if (image1 === '') {
      alert(' Enter the image');
    } else {
      this.props.navigation.navigate('AddAd1', {
        Arbic_captain: this.state.Arbic_captain,
        English_captain: this.state.English_captain,
        // Company_name: this.state.Company_name,
        Contact_number: this.state.Contact_number,
        Trip_type: this.state.tripType,
        Boat: this.state.boat,
        Max_number_of_people: this.state.max_number_of_people,
        BoatLang: this.state.BoatLang,
        BoatLat: this.state.BoatLat,
        cityOfBoat: this.state.cityOfBoat,
        Description_arbic: this.state.Description_arbic,
        Description_engilsh: this.state.Description_engilsh,
        // Rental_price: this.state.Rental_price,
        Extra_per_hour_price: this.state.Extra_per_hour_price,
        Minimum_hour: this.state.Minimum_hour,
        Ideal_hour: this.state.Ideal_hour,
        Coupon_discount: this.state.Coupon_discount,
        Coupon_discount_perct: this.state.Coupon_discount_perct,
        Discount: this.state.Discount,
        images: [
          this.state.banner,
          this.state.image1,
          this.state.image2,
          this.state.image3,
          this.state.image4,
          this.state.image5,
          this.state.image6,
          this.state.image7,
        ],
      });
    }
  };
  _searchCity = textToSearch => {
    this.setState({
      cityDropdown: this.state.cityDropdown.filter(i =>
        i.city[0].toLowerCase().includes(textToSearch.toLowerCase()),
      ),
    });
  };
  _selectCity = item => {
    // let data = this.state.city_arr;
    // let len = this.state.city_arr.length;
    // for (let i = 0; i < len; i++) {
    //   data[i].status = false;
    // }
    // data[index].status = !data[index].status;
    this.setState({
      CityName: item.city[0],
      cityOfBoat: item.city_id,
      modalVisible: false,
    });
  };
  render() {
    console.log('imagefiles', this.state.BoatLang);
    return (
      <BottomSheetModalProvider>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <Header imgBack={true} name="Add Advertisement" backBtn={true} />
          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={s.notification_header}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <AntDesign name="left" size={25} style={{}} />
              </TouchableOpacity>
              <Text style={s.Notifications_title}>{'Select City'}</Text>
              <Text></Text>
            </View>
            <View style={s.search_bar}>
              <TextInput
                placeholder={'Search'}
                style={{ height: 50 }}
                onChangeText={text => {
                  this._searchCity(text);
                }}></TextInput>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10 }}>
              <View style={s.other_gift_photo}>
                <FlatList
                  style={{ marginBottom: 50 }}
                  showsVerticalScrollIndicator={false}
                  data={this.state.cityDropdown}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this._selectCity(item);
                        }}>
                        <View style={s.main_view_flag}>
                          <Text style={s.flag_text_detail}>{item.city[0]}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </Modal>
          <View style={s.SEC2}>
            <ImageBackground
              source={
                this.state.banner
                  ? { uri: config.imageUrl + this.state.banner }
                  : require('../../Images/back2.jpg')
              }
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => this.uploadImage('banner')}>
                <Image
                  source={require('../../Images/chose_image.png')}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10,
                    // alignSelf: 'flex-end',
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Add more (up to 7)
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginStart: 10,
            }}>
            <View>
              <TouchableOpacity onPress={() => this.uploadImage('1')}>
                <Image
                  source={
                    this.state.image1
                      ? { uri: config.imageUrl + this.state.image1 }
                      : require('../../Images/chose_image.png')
                  }
                  style={s.imagePicker}
                />
                <AntDesign
                  onPress={() => this.setState({ image1: null })}
                  style={s.closeIcon}
                  name="closecircle"
                  size={15}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.uploadImage('2')}>
                <Image
                  source={
                    this.state.image2
                      ? { uri: config.imageUrl + this.state.image2 }
                      : require('../../Images/chose_image.png')
                  }
                  style={s.imagePicker}
                />
              </TouchableOpacity>
              <AntDesign
                onPress={() => this.setState({ image2: null })}
                style={s.closeIcon}
                name="closecircle"
                size={15}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.uploadImage('3')}>
                <Image
                  source={
                    this.state.image3
                      ? { uri: config.imageUrl + this.state.image3 }
                      : require('../../Images/chose_image.png')
                  }
                  style={s.imagePicker}
                />
              </TouchableOpacity>
              <AntDesign
                onPress={() => this.setState({ image3: null })}
                style={s.closeIcon}
                name="closecircle"
                size={15}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.uploadImage('4')}>
                <Image
                  source={
                    this.state.image4
                      ? { uri: config.imageUrl + this.state.image4 }
                      : require('../../Images/chose_image.png')
                  }
                  style={s.imagePicker}
                />
              </TouchableOpacity>
              <AntDesign
                onPress={() => this.setState({ image4: null })}
                style={s.closeIcon}
                name="closecircle"
                size={15}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.uploadImage('5')}>
                <Image
                  source={
                    this.state.image5
                      ? { uri: config.imageUrl + this.state.image5 }
                      : require('../../Images/chose_image.png')
                  }
                  style={s.imagePicker}
                />
              </TouchableOpacity>
              <AntDesign
                onPress={() => this.setState({ image5: null })}
                style={s.closeIcon}
                name="closecircle"
                size={15}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.uploadImage('6')}>
                <Image
                  source={
                    this.state.image6
                      ? { uri: config.imageUrl + this.state.image6 }
                      : require('../../Images/chose_image.png')
                  }
                  style={s.imagePicker}
                />
              </TouchableOpacity>
              <AntDesign
                onPress={() => this.setState({ image6: null })}
                style={s.closeIcon}
                name="closecircle"
                size={15}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.uploadImage('7')}>
                <Image
                  source={
                    this.state.image7
                      ? { uri: config.imageUrl + this.state.image7 }
                      : require('../../Images/chose_image.png')
                  }
                  style={s.imagePicker}
                />
                <AntDesign
                  onPress={() => this.setState({ image7: null })}
                  style={s.closeIcon}
                  name="closecircle"
                  size={15}
                />
              </TouchableOpacity>
            </View>

            {/* {this.state.images ? (
            <FlatList
              horizontal
              data={this.state.images}
              keyExtractor={(item, ind) => ind}
              contentContainerStyle={{
                paddingBottom: 15,
              }}
              renderItem={item => {
                console.log('item', item);
                return (
                  <Image
                    source={{ uri: item.item.path }}
                    style={{
                      marginHorizontal: 5,
                      height: width / 9,
                      width: width / 9,
                      borderRadius: 5,
                    }}
                  />
                );
              }}
            />
          ) : null} */}
          </View>
          <ScrollView>
            <View style={{ marginTop: 5 }}>
              <Input
                placeholder="Enter Captain Name in Arabic"
                containerStyle={{ ...s.Input }}
                inputContainerStyle={{ ...s.Input }}
                placeholderTextColor={Colors.gray1}
                onChangeText={Arbic_captain => this.setState({ Arbic_captain })}
              />
              <Input
                placeholder="Enter Captain Name in Engilsh"
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.gray1}
                onChangeText={English_captain => this.setState({ English_captain })}
              />
              {/* <Input
              placeholder="Company Name"
              containerStyle={s.Input}
              inputContainerStyle={s.Input}
              placeholderTextColor={Colors.gray1}
              onChangeText={Company_name => this.setState({ Company_name })}
            /> */}
              <Input
                placeholder="Contact Number"
                containerStyle={s.Input}
                keyboardType={'phone-pad'}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.gray1}
                onChangeText={Contact_number => this.setState({ Contact_number })}
              />
              <View style={{ ...s.Picker, marginTop: -20 }}>
                {/* <Text style={s.PickerText}>Select Trip Type</Text> */}
                <Picker
                  mode="dialog"
                  iosHeader="Time Zone"
                  iosIcon={<AntDesign name="down" size={15} />}
                  style={{ width: '100%' }}
                  selectedValue={this.state.tripType}
                  onValueChange={(modeValue, modeIndex) =>
                    this.setState({ tripType: modeValue })
                  }>
                  <Picker.Item label={'Select Trip Type'} color={Colors.gray} value={''} />

                  {this.state.tripTypeDropdown.map((item, key) => (
                    <Picker.Item
                      label={item.name[0]}
                      value={item.trip_type_id}
                      key={key}
                    />
                  ))
                  }
                </Picker>
              </View>
              <View style={{ ...s.Picker, marginTop: -10 }}>
                {/* <Text style={s.PickerText}>Select Boat</Text> */}
                <Picker
                  mode="dialog"
                  iosHeader="Time Zone"
                  iosIcon={<AntDesign name="down" size={15} />}
                  style={{ width: '100%' }}
                  selectedValue={this.state.boat}
                  onValueChange={(modeValue, modeIndex) =>
                    this.setState({ boat: modeValue })
                  }>
                  <Picker.Item
                    label={'Choose Boat'}
                    color={Colors.gray}
                    value={''}
                  />
                  {this.state.boatDropdown.map((item, key) => (
                    <Picker.Item
                      label={item.name}
                      value={item.boat_id}
                      key={key}
                    />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                onPress={() => this.handlePresentModalPress()}
                style={{
                  ...s.Picker,
                  flexDirection: 'row',
                  marginTop: 8,
                  justifyContent: 'space-between',
                  paddingBottom: 15,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...s.PickerText,
                    fontSize: 16,
                    marginStart: 15,
                    color: Colors.gray,
                  }}>
                  Place of Boat
                </Text>
                <Entypo name="location" size={15} style={{ marginRight: 15 }} />
              </TouchableOpacity>
              {/* <Input
              placeholder="Chose Boat"
              containerStyle={s.Input}
              inputContainerStyle={s.Input}
              placeholderTextColor={Colors.gray}
              onChangeText={Chose_boat => this.setState({ Chose_boat })}
            /> */}
              <Input
                placeholder="Max Number of People"
                containerStyle={s.Input}
                keyboardType={'phone-pad'}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.gray1}
                onChangeText={max_number_of_people =>
                  this.setState({ max_number_of_people })
                }
              />
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
                style={{
                  ...s.Picker,
                  flexDirection: 'row',
                  paddingBottom: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={
                    this.state.CityName === 'Choose City'
                      ? { ...s.PickerText, color: Colors.gray }
                      : { ...s.PickerText, color: Colors.black }
                  }>
                  {this.state.CityName}
                </Text>
                <AntDesign
                  name="right"
                  size={15}
                  style={{ alignSelf: 'center' }}
                />
              </TouchableOpacity>
              {/* <Input
              placeholder="Place of Boat"
              containerStyle={s.Input}
              inputContainerStyle={s.Input}
              placeholderTextColor={Colors.gray}
              onChangeText={place_of_boat => this.setState({ place_of_boat })}
            /> */}
              <Text
                style={{
                  marginStart: 10,
                  fontSize: 18,
                  marginBottom: 5,
                  color: '#888',
                }}>
                Description in Arabic
              </Text>
              <TextInput
                placeholder="Description in Arabic"
                style={{
                  ...s.Input,
                  height: 120,
                  borderWidth: 1,
                  fontSize: 18,
                  borderColor: Colors.gray1,
                  width: '95%',
                  alignSelf: 'center',
                  marginBottom: 15,
                  textAlign: 'justify',
                }}
                multiline={true}
                placeholderTextColor={Colors.gray}
                onChangeText={Description_arbic =>
                  this.setState({ Description_arbic })
                }
              />
              <Text
                style={{
                  marginStart: 10,
                  fontSize: 18,
                  marginBottom: 5,
                  color: '#888',
                }}>
                Description in Arabic
              </Text>
              <TextInput
                placeholder="Description in English"
                style={{
                  ...s.Input,
                  height: 120,
                  borderWidth: 1,
                  fontSize: 18,
                  width: '95%',
                  alignSelf: 'center',
                  borderColor: Colors.gray1,
                }}
                multiline={true}
                placeholderTextColor={Colors.gray1}
                onChangeText={Description_engilsh =>
                  this.setState({ Description_engilsh })
                }
              />

              {/* <Input
              placeholder="Rental Price"
              keyboardType={'phone-pad'}
              containerStyle={s.Input}
              inputContainerStyle={s.Input}
              placeholderTextColor={Colors.gray1}
              onChangeText={Rental_price => this.setState({ Rental_price })}
            /> */}
              <Input
                placeholder="Extra per hour price"
                keyboardType={'phone-pad'}
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.gray1}
                onChangeText={Extra_per_hour_price =>
                  this.setState({ Extra_per_hour_price })
                }
              />
              <Input
                placeholder="Minimum Hour"
                keyboardType={'phone-pad'}
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.gray1}
                onChangeText={Minimum_hour => this.setState({ Minimum_hour })}
              />
              <Input
                placeholder="Ideal Hour"
                keyboardType={'phone-pad'}
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.gray1}
                onChangeText={Ideal_hour => this.setState({ Ideal_hour })}
              />
              {/* <Input
              placeholder="Coupon discount"
              keyboardType={'phone-pad'}
              containerStyle={s.Input}
              inputContainerStyle={s.Input}
              placeholderTextColor={Colors.gray}
              onChangeText={Coupon_discount => this.setState({ Coupon_discount })}
            /> */}
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: '98%',
                  marginBottom: 15,
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  alignSelf: 'center',
                  borderBottomColor: Colors.gray,
                }}>
                <TextInput
                  placeholder="Coupon discount"
                  keyboardType={'default'}
                  style={{ width: width * 0.72, fontSize: 18 }}
                  placeholderTextColor={Colors.gray1}
                  onChangeText={Coupon_discount =>
                    this.setState({ Coupon_discount })
                  }
                />
                <TextInput
                  placeholder="%"
                  keyboardType={'phone-pad'}
                  style={{
                    width: width * 0.2,
                    borderWidth: 1,
                    borderColor: Colors.gray,
                    height: 40,
                    borderRadius: 10,
                  }}
                  placeholderTextColor={Colors.gray1}
                  onChangeText={Coupon_discount_perct =>
                    this.setState({ Coupon_discount_perct })
                  }
                />
              </View>
              <Input
                placeholder=" Discount %"
                keyboardType={'phone-pad'}
                containerStyle={s.Input}
                inputContainerStyle={s.Input}
                placeholderTextColor={Colors.gray1}
                onChangeText={Discount => this.setState({ Discount })}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity onPress={() => this.Addad()} style={s.btn1}>
                <Text style={s.btn1Text}>Next</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <BottomSheetModal
          ref={this.bottomSheetRef}
          snapPoints={snapPoints}
          index={1}
          backdropComponent={BottomSheetBackdrop}
          backgroundComponent={() => <View style={s.contentContainer} />}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                this.allmapdata(data);
              }}
              query={{
                key: 'AIzaSyBwum8vSJGI-HNtsPVSiK9THpmA2IbgDTg',
                language: 'en',
                components: 'country:IN',
              }}
            />

            <TouchableOpacity
              onPress={() => this.currentlocation()}
              style={{
                width: '95%',
                backgroundColor: Colors.orange,
                borderRadius: 10,
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 10,
                  color: '#fff',
                }}>
                Current Location
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
  currentlocation = () => {
    this.bottomSheetRef.current.close();
    this.props.navigation.navigate('MapView');
  };
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
    borderBottomColor: Colors.gray,
    marginTop: -7,
  },
  Input: {
    borderBottomColor: Colors.gray,
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
  },
  btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
  Picker: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  PickerText: {
    fontSize: 18,
    marginStart: 5,
  },
  imagePicker: {
    height: width / 9,
    width: width / 9,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  closeIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: -5,
  },
  main_view_flag: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    paddingRight: 20,
    paddingLeft: 20,
    paddingVertical: 10,
    // marginTop: 20,
  },
  flag_text_detail: {
    color: '#333232',
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
  },
  Notifications_title: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
    color: '#000',
  },
  search_bar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#000',
    borderTopWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  notification_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: Colors.orange,
    paddingTop: 20,
    paddingBottom: 20,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#DAE1E7',
  },
});
export default AddAd;
