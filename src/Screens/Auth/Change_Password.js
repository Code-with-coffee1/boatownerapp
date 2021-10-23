import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../Constants/config';
import axios from 'axios';

class Change_Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      newpassword: '',
      confpassword: '',
      loader: false,
      userId: ''
    };
  }
  async componentDidMount() {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let parsedInfo = JSON.parse(userInfo);
    console.log('parsedInfo', parsedInfo.id);
    this.setState({ userId: parsedInfo.id });
    console.log('baoi', this.props.route.params);
  }
  channgePassword = () => {
    let url = config.apiUrl + '/change_password.php';
    var data = new FormData();
    data.append('user_id_post', this.state.userId);
    data.append('password_old', this.state.oldpassword);
    data.append('password_new', this.state.newpassword);
    this.setState({ loader: true });
    axios
      .post(url, data)
      .then(res => {
        console.log('advertisement_create', res);
        this.setState({ loader: false });
        if (res.data.success === 'true') {
          this.props.navigation.goBack();
        } else {
          alert(res.data.msg[0]);
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header backBtn={true} name="Change Password" />
        <View style={sb.SEC2}>
          <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
            <Input
              placeholder="Old Password"
              secureTextEntry={true}
              placeholderTextColor={Colors.gray}
              viewPass
              password
              caretHidden
              //  borderless
              style={{
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              onChangeText={oldpassword => this.setState({ oldpassword })}
            />
            <Input
              placeholder="New Password"
              secureTextEntry={true}
              placeholderTextColor={Colors.gray}
              viewPass
              password
              caretHidden
              //  borderless
              style={{
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              iconColor={Colors.gray}
              onChangeText={newpassword => this.setState({ newpassword })}
            />
            <Input
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor={Colors.gray}
              viewPass
              password
              caretHidden
              //  borderless
              style={{
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              iconColor={Colors.gray}
              onChangeText={confpassword => this.setState({ confpassword })}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={sb.btn1} onPress={() => this.channgePassword()}>
            <Text style={sb.btn1Text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const sb = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -120,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
  },
  btn1: {
    height: 48,
    width: '95%',
    backgroundColor: Colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
  btn1Text: {
    fontSize: 20,
    fontFamily: FontFamily.semi_bold,
    color: Colors.white,
  },
});

export default Change_Password;
