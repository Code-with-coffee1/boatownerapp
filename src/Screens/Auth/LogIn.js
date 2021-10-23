import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import config from '../../Constants/config';
import axios from 'axios';
import email from 'react-native-email'
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
const WelComeNote = () => {
    return (
        <View style={styles.WelComeNote}>
            <Text style={styles.myboat}>My Boat</Text>
            <Text style={styles.Wlcome}>Welcome</Text>
        </View>
    );
};
const handleEmail = () => {
    const to = ['Myboat667@gmail.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        subject: 'Admin Contact',
    }).catch(console.error)
}
const Login = () => {
    const nav = useNavigation();
    const [email, setemail] = useState(''); // boat1@yopmail.com
    const [password, setpassword] = useState(''); // 123456
    const [isLogin, setIsLogin] = useState(false);
    //   useEffect(async () => {
    //     let userInfo = await AsyncStorage.getItem('userInfo');
    //     let parsedInfo = JSON.parse(userInfo);
    //     console.log('parsedInfo', parsedInfo);
    //     // if (parsedInfo === null) {
    //     //     null
    //     // } else {
    //     //     nav.replace("Home");
    //     // }
    //   }, []);
    // ------------------------------------------ //
    let url = config.apiUrl + '/login.php';
    var data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('device_type', config.device_type);
    data.append('player_id', config.player_id);
    data.append('user_login_type', config.login_type);
    data.append('action_type', 'normal_login');
    data.append('language_id', config.language_id);
    data.append('country_code', config.country_code);
    data.append('user_type', config.user_type_post);
    const logIn = async () => {
        // nav.navigate("Home");
        axios
            .post(url, data)
            .then(res => {
                console.log('login', res.data.user_details);

                if (res.data.success == 'true') {
                    let userInfo = JSON.stringify({
                        id: res.data.user_id,
                        email: res.data.email,
                        phone: res.data.mobile,
                        fname: res.data.f_name,
                        lname: res.data.l_name,
                        image: res.data.image,
                    });
                    AsyncStorage.setItem('userInfo', userInfo);
                    nav.replace('Home');
                } else {
                    alert(res.data.msg[0]);
                    console.log(res.data.success);
                }
            })
            .catch(err => console.log(err));
    };
    // --------------------------------------- //


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                style={styles.ImageBackground}
                source={back_img}
                imageStyle={styles.ImageBackground_Img}>
                <View style={styles.SEC2}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 15 }} >
                        <MaterialCommunityIcons
                            name="web"
                            style={{ fontSize: 15, color: Colors.white }}
                        />
                        <Text style={{ color: Colors.white, marginHorizontal: 5 }} >Eng</Text>
                        <AntDesign
                            name="caretdown"
                            style={{ fontSize: 10, color: Colors.white }}
                        />
                    </View>
                    <Image style={{ resizeMode: 'contain', height: 120, width: 120, alignSelf: 'center', marginVertical: 50 }}
                        source={require('../../Images/orange.png')} />
                    <WelComeNote />
                    <View>
                        <Text style={styles.Login}>Login</Text>
                        <Input
                            placeholder="Login"
                            value={email}
                            containerStyle={styles.Input}
                            inputContainerStyle={styles.Input}
                            placeholderTextColor={Colors.white}
                            inputStyle={{ color: Colors.white }}
                            keyboardType="email-address"
                            onChangeText={txt => setemail(txt)}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Input
                                placeholder="Password"
                                value={password}
                                containerStyle={styles.Input}
                                inputContainerStyle={styles.Input}
                                placeholderTextColor={Colors.white}
                                inputStyle={{ color: Colors.white }}
                                secureTextEntry
                                selectTextOnFocus
                                onChangeText={pass => setpassword(pass)}
                            />
                            <TouchableOpacity style={{ marginLeft: -100, marginTop: -13 }}>
                                <Text style={styles.FGPASS}>Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.Btn1} onPress={() => logIn()}>
                                <Text style={styles.Btn1Text}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.Btn1}
                                onPress={() => nav.navigate('SignUp')}>
                                <Text style={styles.Btn1Text}>SignUp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEmail()} style={{ marginTop: 25 }}>
                                <Text style={styles.contact_admin}>Contact admin ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ImageBackground: {
        height: '100%',
        width: Sizes.width,
        backgroundColor: Colors.black,
    },
    ImageBackground_Img: {
        opacity: 0.5,
        // height:Sizes.height+100
    },
    myboat: {
        fontFamily: FontFamily.default,
        color: Colors.white,
    },
    Wlcome: {
        fontFamily: FontFamily.bold,
        fontSize: 42,
        color: Colors.white,
    },
    SEC2: {
        position: 'absolute',

        paddingHorizontal: 20,
    },
    Login: {
        fontFamily: FontFamily.semi_bold,
        fontSize: 28,
        color: Colors.white,
    },
    Input: {
        borderBottomColor: Colors.white,
        width: Sizes.width * 0.85,
        color: Colors.white,
    },
    FGPASS: {
        fontFamily: FontFamily.semi_bold,
        color: Colors.white,
        fontSize: 12,
        lineHeight: 15,
    },
    Btn1: {
        height: 48,
        width: '95%',
        backgroundColor: Colors.orange,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        elevation: 3,
        overflow: 'hidden',
        shadowColor: '#fff',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    Btn1Text: {
        fontSize: 20,
        fontFamily: FontFamily.semi_bold,
        color: Colors.white,
    },
    contact_admin: {
        fontFamily: FontFamily.default,
        textDecorationStyle: 'solid',
        color: Colors.white,
        textDecorationColor: Colors.white,
        textDecorationLine: 'underline',
    },
    SEC3: {
        flexDirection: 'row',
        // justifyContent:"space-aroun",
        alignItems: 'center',
    },
    OR: {
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    Text1: {
        fontSize: 16,
        fontFamily: FontFamily.semi_bold,
        color: Colors.white,
    },
    LoginIcon: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: Colors.white,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
    },
});

export default Login;
