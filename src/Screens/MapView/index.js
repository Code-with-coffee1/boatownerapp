import React, {Component} from 'react';
import {
  View,
  Image,
  StatusBar,
  Text,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  PermissionsAndroid,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
// import {Container, Content} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {debounce} from 'lodash';
import MapView from 'react-native-maps';
import {mapMarker} from './assets';
import styles from './styles';
import Geolocation from 'react-native-geolocation-service';
import {CommonActions} from '@react-navigation/native';
import Geocode from 'react-geocode';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Colors from '../../component/Style/Colors';
//redux
// import {connect} from 'react-redux';
// import {
//   Updateaddress,
//   Updatepin,
//   Updatelong,
//   Updatelat,
// } from '../../actions/AddressAction';
const latitudeDelta = 0.005;
const longitudeDelta = 0.005;
let changedLat = 0.0;
let changedLng = 0.0;
let address = '';
class HomeLocator extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      isPanding: false,
      props_location: false,
      openModal: false,
      locationcode: '',
      locationLat: '',
      locationLng: '',
      loading: true,
      location_pincode: '',
    };
    this.onPanDrag = debounce(this.onPanDrag, 10000, {
      leading: true,
      trailing: false,
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    // this.props.navigation.navigate('MyDeliveryAddress');
    this.props.navigation.navigate('Home');
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  allloaction = () => {
    if (this.props.route.params) {
      this.setState({
        props_location: true,
      });
    }
    Geocode.setApiKey('AIzaSyBwum8vSJGI-HNtsPVSiK9THpmA2IbgDTg');
    Geocode.enableDebug();
    var that = this;
    async function requestLocationPermission() {
      try {
        if (Platform.OS === 'ios') {
          Geolocation.requestAuthorization();
          that.callLocation(that);
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert('Permission Denied');
          }
        }
      } catch (err) {
        alert('err', err);
        console.warn(err);
      }
    }
    requestLocationPermission();
  };
  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location

      position => {
        // console.log('bapi', position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        // console.log('current' + currentLongitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        const regions = {
          latitude: parseFloat(currentLatitude),
          longitude: parseFloat(currentLongitude),
          latitudeDelta,
          longitudeDelta,
        };
        if (this.state.props_location) {
          const manual_regions = {
            latitude: parseFloat(this.props.route.params.lat),
            longitude: parseFloat(this.props.route.params.lng),
            latitudeDelta,
            longitudeDelta,
          };
          this.setState({region: manual_regions, loading: false});
          this.setState({});

          if (this.state.loading == false) {
            this.onRegionChangeComplete(manual_regions);
          }
        } else {
          this.setState({region: regions, loading: false});

          if (this.state.loading == false) {
            this.onRegionChangeComplete(regions);
          }
        }
      },
      error => alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
    that.watchID = Geolocation.watchPosition(position => {
      //Will give you the location on location change
      // console.log('sangram' + position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      that.setState({region: {longitude: currentLongitude}});

      //Setting state Longitude to re re-render the Longitude Text
      that.setState({region: {latitude: currentLatitude}});
      //Setting state Latitude to re re-render the Longitude Text
      const regions = {
        latitude: parseFloat(currentLatitude),
        longitude: parseFloat(currentLongitude),
        latitudeDelta,
        longitudeDelta,
      };
      if (this.state.props_location) {
        const manual_regions = {
          latitude: parseFloat(this.props.route.params.lat),
          longitude: parseFloat(this.props.route.params.lng),
          latitudeDelta,
          longitudeDelta,
        };
        this.setState({region: manual_regions, loading: false});

        if (this.state.loading == false) {
          this.onRegionChangeComplete(manual_regions);
        }
      } else {
        this.setState({region: regions, loading: false});

        if (this.state.loading == false) {
          // console.log('nishant');
          this.onRegionChangeComplete(regions);
        }
      }
    });
  }
  componentDidMount = () => {
    this.allloaction();
  };
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };
  onRegionChangeComplete = async region => {
    changedLat = region.latitude;
    changedLng = region.longitude;
    Geocode.fromLatLng(changedLat, changedLng).then(
      response => {
        address = response.results[0].formatted_address;
        // console.log('address', response);
        this.pincodeGenerate(address);
        this.setState({locationcode: address});
        this.setState({locationLat: response.results[0].geometry.location.lat});
        this.setState({locationLng: response.results[0].geometry.location.lng});
        // console.log(address);
      },
      error => {
        console.error(error);
      },
    );
  };

  onPanDrag = () => {
    const {isPanding} = this.state;
    if (isPanding) {
      return;
    }
    this.setState({
      isPanding: true,
      props_location: false,
    });
  };
  pincodeGenerate = address => {
    // console.log('address pincodeGenerate', address)
    var str = address;
    var res = str.slice(-13, -7);
    this.setState({
      location_pincode: res,
    });
    // this.props.Updatepin(res);
    // console.log('address pincode', res)
  };
  savelocation = () => {
    let locationdata = JSON.stringify({
      lng: this.state.locationLng,
      lat: this.state.locationLat,
    });
    //   this.props.Updatepin(this.state.location_pincode);
    AsyncStorage.setItem('location', locationdata);

    //   this.props.Updateaddress(this.state.locationcode);
    this.props.navigation.goBack();
  };
  render() {
    // console.log('props', this.state.locationLat);

    const {
      region,
      loading,
      isPanding,
      text,
      openModal,
      locationcode,
      locationLng,
      locationLat,
    } = this.state;

    if (loading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{backgroundColor: 'orange'}}>
          <View style={{height: '100%', width: '100%'}}>
            <View
              style={{
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
                marginTop: 30,
                height: 60,
              }}>
              {/* <Image
                style={{ width: 30, height: 30 }}
                tintColor="white"
                source={require('../../Images/pin.png')}
              /> */}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 13,
                  margin: 5,
                }}>
                {locationcode}
              </Text>
            </View>

            <ScrollView style={{backgroundColor: '#fff'}}>
              <View style={styles.container}>
                <View accessible={true} style={styles.mapWrapper}>
                  <MapView
                    ref={map => (this.map = map)}
                    initialRegion={region}
                    style={styles.map}
                    showsUserLocation={true}
                    followUserLocation={true}
                    loadingEnabled={true}
                    onPanDrag={this.onPanDrag}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    showsScale={true}
                    showsCompass={true}
                    showsPointsOfInterest={true}
                    showsBuildings={true}
                    userLocationPriority={'high'}
                    showsMyLocationButton={true}
                  />
                </View>

                <View
                  style={[
                    styles.markerFixed,
                    isPanding ? styles.isPanding : null,
                  ]}
                  pointerEvents="none">
                  <Image
                    style={styles.marker}
                    resizeMode="contain"
                    source={mapMarker}
                  />
                </View>

                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={openModal}
                  onRequestClose={() => {
                    this.setState({
                      openModal: false,
                    });
                  }}>
                  <View style={{marginTop: 22}}>
                    <View>
                      <TouchableHighlight
                        onPress={() => {
                          this.setState({
                            openModal: false,
                          });
                        }}></TouchableHighlight>
                    </View>
                  </View>
                </Modal>
              </View>
              <TouchableOpacity
                style={{position: 'absolute', top: 10, right: 10}}
                onPress={() =>
                  this.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'Mapviewpage'}],
                    }),
                  )
                }
                // onPress={this.allloaction}
              >
                <MaterialIcons name="my-location" size={50} color={'orange'} />
              </TouchableOpacity>
            </ScrollView>
            <View
              style={{
                backgroundColor: '#BF213E',
                width: '100%',
                height: 60,
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'orange',
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={this.savelocation}>
                <Text
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                    margin: 1,
                  }}>
                  {' '}
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={() => this.props.navigation.replace('Mapviewpage')} style={{ padding: 20, alignSelf: 'center' }}>
              <Text>sangram</Text>
            </TouchableOpacity> */}
          </View>
        </SafeAreaView>
      );
    }
  }
}
// const mapStateToProps = ({home, address_reducer}) => {
//   const {address} = address_reducer;
//   return {
//     address,
//   };
// };
// export default connect(mapStateToProps, {
//   // postHomeAPi,

//   Updateaddress,
//   Updatepin,
//   Updatelat,
//   Updatelong,
// })(HomeLocator);
export default HomeLocator;
