import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  Animated,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('screen');

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      loading: false,
      netConn: true,
    };
  }

  async componentDidMount() {
    this.openapp();
  }
  // CheckConnectivity = () => {
  //   // For Android devices
  //   if (Platform.OS === 'android') {
  //     NetInfo.fetch().then(state => {
  //       // console.log("Is connected?", state.isConnected);
  //       if (state.isConnected === false) {
  //         // Alert.alert('No Internet Connection !!!',
  //         //   'Please Make Sure You are connected to Internet.', [
  //         //   { text: 'Exit App', onPress: () => BackHandler.exitApp() },
  //         //   { text: 'Retry', onPress: () => this.CheckConnectivity() },
  //         // ]);
  //         ToastMessage({
  //           message: 'No Internet Connection',
  //           // type: 'warning',
  //         });
  //         this.setState({netConn: false});
  //       } else {
  //         this.setState({netConn: true});
  //         this.openapp();
  //       }
  //     });
  //   } else {
  //     // For iOS devices
  //     NetInfo.isConnected.addEventListener(
  //       'connectionChange',
  //       this.handleFirstConnectivityChange,
  //     );
  //   }
  // };
  openapp = async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    setTimeout(() => {
      if (parsedInfo != null) {
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('Login');
      }
    }, 3000);
  };
  // Maps

  // map end
  render() {
    // console.log('nishant', this.props);
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../../Images/splash.png')}
          style={[styles.img]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  img: {
    height: '100%', width: '100%',
    // resizeMode: 'center',
  },
});

export default Splash;
