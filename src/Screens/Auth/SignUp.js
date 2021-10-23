import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    ToastAndroid, Image,
    ActivityIndicator
} from 'react-native';
import {
    Icon,
    Input,
    Overlay
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import config from '../../Constants/config';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import OtpInputs from 'react-native-otp-inputs';

/*
email, 
login_type (0 for App, 1 for Facebook, 2 for Google, 3 for twitter, 4 for Instagram, 5 for apple), 
user_type_post (0=admin, 1=user, 2=Client), 
device_type (browser, Android, IOS), 
f_name , 
l_name, 
user_name, 
business_name , 
dob, 
city ( check city_master table for codes for each city), 
language_id (0=English, 1=Arabic), 
country_code (for mobile number), 
phone_number, 
password, 
gender (0 for none, 1 for male, 2 for female), 
player_id
*/
const SignUp = () => {
    const Navigation = useNavigation();
    const [cityArr, serCityArr] = useState([]);
    const [loader, setloader] = useState(false);
    // -------------------------------------------- //
    const [f_name, setF_name] = useState("");
    const [L_name, setL_name] = useState("");
    const [email, setemail] = useState("");
    const [m_number, setm_number] = useState("");
    const [b_name, setb_name] = useState("");
    const [b_location, setb_location] = useState("");
    const [dob, setdob] = useState("");
    const [city, setcity] = useState("Choose City");
    const [gender, setgender] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    // 
    const [userId, setUserId] = useState(null)
    // 
    const [visible, setVisible] = useState(false);
    const [otp, setOtp] = useState("")
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    // ----------- //
    const [AllData, setAllData] = useState(null);
    const [AllDataRe, setAllDataRe] = useState(null);
    // 
    var raw = {
        f_name: f_name,
        l_name: L_name,
        business_name: b_name,
        country_code: config.country_code,
        language_id: config.language_id,
        login_type: config.login_type,
        device_type: config.device_type,
        dob: dob,
        city: city,
        phone_number: m_number,
        password: password,
        gender: gender === "" ? 0 : gender === "male" ? 1 : 2,
        player_id: config.player_id,
        user_type_post: config.user_type_post
    }

    // console.log(signup_data);

    // -----------------------Api Urls--------------------- //
    var url_main = 'https://myboatonline.com/app/webservice';
    var url = config.apiUrl
    console.log(url)
    const apiUrl_signup = url + "/signup.php";
    const cityUrl = url + "/city_list.php?country_code=965"
    const mailSendUrl = url + "/mailFunctionsSend.php";
    const resendOtpUrl = url + "/resend_otp.php";
    const verifyOtpUrl = url + "/otp_verify.php";
    // ----------All Citys ----------- //
    const all_city_call = () => {
        axios.get(cityUrl)
            .then((res) => serCityArr(res.data.city_arr))
            .catch((err) => console.log(err))
    }

    // --------------Sign Up ----------- //
    var signup_data = new FormData();
    signup_data.append('f_name', f_name);
    signup_data.append('l_name', L_name);
    signup_data.append('email', email);
    signup_data.append('business_name', b_name);
    signup_data.append('country_code', config.country_code);
    signup_data.append('language_id', config.language_id);
    signup_data.append('login_type', config.login_type);
    signup_data.append('device_type', config.device_type);
    signup_data.append('dob', dob);
    signup_data.append('city', city);
    signup_data.append('phone_number', m_number);
    signup_data.append('password', password);
    signup_data.append('gender', gender === "" ? 0 : gender === "male" ? 1 : 2);
    signup_data.append('player_id', config.player_id);
    signup_data.append('user_type_post', config.user_type_post);
    // ------------------------------------//
    const signUp = () => {
        if (password !== confirmPass) {
            alert("Password not matched .")
        } else {
            axios.post(apiUrl_signup, signup_data)
                .then((res) => { setAllData(res.data), res.data.success === "true" ? (toggleOverlay()) : alert(res.data.msg[0]) })
                .catch((err) => console.log("sign_up_error", err))
        }
    }
    // ----------- Mail sent ---------- //
    var email_array = AllData === null ? null : AllData.email_arr;
    var user_details = AllData === null ? null : AllData.user_details;
    // console.log("email_array===>",email_array.length)
    useEffect(() => {

        if (AllData !== null) {
            if (AllData.success === 'true') {
                setUserId(user_details.user_id)
                mailSend({ email_array: email_array })
            }
        }
    }, [AllData])

    useEffect(() => {
        if (AllDataRe !== null) {
            if (AllDataRe.success === "true") {
                mailSend({ email_array: AllDataRe.email_arr })
            }
        }
    }, [AllDataRe])
    console.log(userId)
    const mailSend = ({ email_array }) => {
        var email = email_array[0].email;
        var mailcontent = email_array[0].mailcontent
        var mailsubject = email_array[0].mailsubject
        var fromName = email_array[0].fromName
        var mailData = new FormData();
        mailData.append("email", email);
        mailData.append("mailcontent", mailcontent);
        mailData.append("mailsubject", mailsubject);
        mailData.append("fromName", fromName);
        mailData.append("mail_file", 'NA');
        // console.log('mailData==', mailData);
        axios.post(mailSendUrl, mailData)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    }
    // ---------- Resend Otp ------ //
    const resendOtp = ({ user_id }) => {
        var resend_otp_data = new FormData();
        resend_otp_data.append("user_id_post", user_id);
        axios.post(resendOtpUrl, resend_otp_data)
            .then((res) => { setAllDataRe(res.data), setOtp(AllDataRe ? res.data.user_details.otp : null) })
            .catch((err) => console.log(err))
    }
    // ------------------------------Verify Otp----- //
    console.log("OTP", AllDataRe ? AllDataRe.user_details.otp : null)
    console.log("OTP", user_details ? user_details.otp : null)
    /**
     * New Parameters = user_id_post, user_otp, user_type (0=admin, 1=user, 2=Client), device_type (browser, Android, IOS), player_id
     */
    const verifyOtp = ({ user_id, user_otp }) => {
        console.log(parseInt(user_otp))
        var verify_otp_data = new FormData();
        verify_otp_data.append("user_id_post", user_id);
        verify_otp_data.append("user_type", config.user_type_post);
        verify_otp_data.append("device_type", config.device_type);
        verify_otp_data.append("player_id", config.player_id);
        verify_otp_data.append("user_otp", parseInt(user_otp));
        axios.post(verifyOtpUrl, verify_otp_data)
            .then((res) => {
                console.log(res)
                if (res.data.success === "true") {
                    let userInfo = JSON.stringify({
                        id: res.data.user_details.user_id,
                        email: res.data.user_details.email,
                        phone: res.data.user_details.mobile,
                        fname: res.data.user_details.f_name,
                        lname: res.data.user_details.l_name,
                        image: res.data.user_details.image,
                    });
                    AsyncStorage.setItem('userInfo', userInfo);
                } else {
                    null
                }
                res.data.success === "true" ?
                    (ToastAndroid.show(res.data.msg[0], ToastAndroid.SHORT, ToastAndroid.BOTTOM), setVisible(false), gotoAddBoatPage()) :
                    ToastAndroid.show(res.data.msg[0], ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            })
            .catch((err) => console.log(err))
    }
    //-----------//
    useEffect(() => {
        all_city_call()
    }, [])
    // --------Navigation --------- //
    const gotoAddBoatPage = () => {
        setloader(true);
        setTimeout(() => {
            setloader(false);
            Navigation.navigate("AddBoat")
        }, 3000);
    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={s.ImageBackground}
                source={back_img}
                imageStyle={s.ImageBackground_Img}
            >
                {
                    loader ? (
                        <ActivityIndicator
                            animating={loader}
                            color={Colors.white}
                            size={50}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 70
                            }}
                        />
                    ) : (
                        <ScrollView>

                            <Image
                                source={require('../../Images/orange.png')} style={s.Logo} />
                            <Text style={s.Text1}>Boat Owner</Text>
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "98%", alignSelf: "center" }}>
                                    <Input
                                        placeholder="First Name"
                                        containerStyle={s.Input1}
                                        inputContainerStyle={s.Input1}
                                        placeholderTextColor={Colors.white}
                                        inputStyle={{ color: Colors.white }}
                                        onChangeText={(t) => setF_name(t)}
                                        value={f_name}
                                    />
                                    <Input
                                        placeholder="Last Name"
                                        containerStyle={s.Input1}
                                        inputContainerStyle={s.Input1}
                                        placeholderTextColor={Colors.white}
                                        inputStyle={{ color: Colors.white }}
                                        onChangeText={(t) => setL_name(t)}
                                        value={L_name}
                                    />
                                </View>
                                <Input
                                    placeholder="Email"
                                    containerStyle={s.Input}
                                    inputContainerStyle={s.Input}
                                    placeholderTextColor={Colors.white}
                                    inputStyle={{ color: Colors.white }}
                                    keyboardType="email-address"
                                    onChangeText={(t) => setemail(t)}
                                    value={email}
                                />
                                <Input
                                    placeholder="Mobile"
                                    containerStyle={s.Input}
                                    inputContainerStyle={s.Input}
                                    placeholderTextColor={Colors.white}
                                    inputStyle={{ color: Colors.white }}
                                    keyboardType="number-pad"
                                    onChangeText={(t) => setm_number(t)}
                                    value={m_number}
                                />
                                <Input
                                    placeholder="Business Name"
                                    containerStyle={s.Input}
                                    inputContainerStyle={s.Input}
                                    placeholderTextColor={Colors.white}
                                    inputStyle={{ color: Colors.white }}
                                    keyboardType="default"
                                    onChangeText={(t) => setb_name(t)}
                                    value={b_name}
                                />
                                <Input
                                    placeholder="Business Location"
                                    containerStyle={s.Input}
                                    inputContainerStyle={s.Input}
                                    placeholderTextColor={Colors.white}
                                    inputStyle={{ color: Colors.white }}
                                    onChangeText={(t) => setb_location(t)}
                                    value={b_location}
                                />
                                <Picker
                                    selectedValue={city}
                                    style={[{ color: "#fff", fontSize: 30 }, s.Input11]}
                                    itemStyle={{ fontFamily: FontFamily.bold }}
                                    dropdownIconColor="#fff"
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) =>
                                        setcity(itemValue)
                                    }>
                                    <Picker.Item label="Choose City" value="" />
                                    {
                                        cityArr.length === 0 ? null : cityArr.map((val, ind) => {
                                            return <Picker.Item key={ind} label={val.city[0]} value={val.city[0]} />
                                        })
                                    }
                                </Picker>
                                <View style={{ borderColor: "#fff", borderBottomWidth: 1, width: "95%", alignSelf: "center", marginBottom: 23, marginTop: -7 }} />
                                <DatePicker
                                    style={{ width: "95%", alignSelf: "center", height: 60, color: "#fff" }}
                                    date={dob}
                                    mode="date"
                                    placeholder="Date of Birth"
                                    format="YYYY-MM-DD"
                                    // minDate="2016-05-01"
                                    // maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            alignItems: 'flex-end',
                                        },
                                        dateInput: {
                                            borderColor: '#234456',
                                            borderWidth: 0,
                                            // borderRadius: 4,
                                            alignItems: 'flex-start',
                                            paddingRight: 10,
                                            borderBottomColor: "#fff",
                                            borderBottomWidth: 1
                                        },
                                        dateText: {
                                            color: "#fff",
                                            fontFamily: FontFamily.semi_bold,
                                            // fontSize:30
                                        }
                                    }}
                                    onDateChange={(date) => setdob(date)}
                                />
                                <Picker
                                    selectedValue={gender}
                                    style={[{
                                        color: "#fff", marginTop: -20, borderBottomColor: Colors.white,
                                        borderBottomWidth: 1,
                                    }]}
                                    itemStyle={{ fontFamily: FontFamily.default }}
                                    dropdownIconColor="#fff"
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) =>
                                        setgender(itemValue)
                                    }>
                                    <Picker.Item label="Gender" value="" />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>
                                <View style={{ borderColor: "#fff", borderBottomWidth: 1, width: "95%", alignSelf: "center", marginBottom: 23, marginTop: -7 }} />
                                <Input
                                    placeholder="Password"
                                    secureTextEntry
                                    containerStyle={s.Input}
                                    inputContainerStyle={s.Input}
                                    placeholderTextColor={Colors.white}
                                    inputStyle={{ color: Colors.white }}
                                    onChangeText={(t) => setpassword(t)}
                                    value={password}
                                />
                                <Input
                                    placeholder="Confirm Password"
                                    containerStyle={s.Input}
                                    secureTextEntry
                                    inputContainerStyle={s.Input}
                                    placeholderTextColor={Colors.white}
                                    inputStyle={{ color: Colors.white }}
                                    onChangeText={(t) => setconfirmPass(t)}
                                    value={confirmPass}
                                />
                            </View>
                            <View>
                                <Text style={s.Text1}>
                                    By sign up, you agree to our terms of service and privacy policy.
                                </Text>
                            </View>
                            <View style={{ elevation: 5 }}>
                                <TouchableOpacity style={s.btn1} onPress={() => { signUp() }}>
                                    <Text style={s.btn1Text}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={[s.Text1, { marginBottom: 10 }]}>
                                    I have already account ?{" "}
                                    <Text style={{
                                        fontFamily: FontFamily.semi_bold,
                                        color: Colors.white,
                                        alignSelf: "center",
                                        textDecorationLine: "underline"
                                    }}
                                        suppressHighlighting={true}
                                        onPress={() => Navigation.navigate("Login")}
                                    >
                                        Login
                                    </Text>
                                </Text>
                            </View>
                        </ScrollView>
                    )
                }

            </ImageBackground>
            <Overlay visible={visible}>
                <View style={{ width: "90%", alignSelf: "center" }}>
                    <Text style={{ textAlign: "center", marginVertical: 10, fontFamily: FontFamily.semi_bold }}>Verify Otp</Text>
                    <Text style={{ textAlign: "center", marginBottom: 10, fontFamily: FontFamily.default }}>Otp is sent to {email}</Text>
                    <OtpInputs
                        handleChange={(code) => setOtp(code)}
                        numberOfInputs={6}
                        value={parseInt(otp)}
                        style={{ justifyContent: "space-between", flexDirection: "row", width: "100%", alignSelf: "center", fontFamily: FontFamily.semi_bold, }}
                        inputStyles={{
                            color: Colors.orange,
                            textAlign: "center",
                            fontFamily: FontFamily.semi_bold,
                            fontSize: 20,
                        }}
                        inputContainerStyles={{
                            backgroundColor: Colors.gray1,
                            borderColor: "#000",
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            borderWidth: 0,
                            elevation: 5,
                            justifyContent: "space-around"
                        }}
                        focusStyles={{
                            // borderWidth:1,
                            borderColor: Colors.orange,
                            backgroundColor: Colors.white,
                            elevation: 5
                        }}

                    />
                    <View style={{ flexDirection: "row", marginTop: 30, alignSelf: "center" }}>
                        <Text style={{ textAlign: "center", fontFamily: FontFamily.default }}> Didn't recived code ? </Text>
                        <TouchableOpacity style={{}} onPress={() => resendOtp({ user_id: userId })}><Text style={{ alignSelf: "center", fontFamily: FontFamily.semi_bold }}>Resend Code</Text></TouchableOpacity>
                    </View>
                    <View style={{ elevation: 5, marginBottom: 10 }}>
                        <TouchableOpacity style={s.btn1} onPress={() => { verifyOtp({ user_id: userId, user_otp: otp }) }}>
                            <Text style={s.btn1Text}>Verify & Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay>
        </View>
    )
}
const s = StyleSheet.create({
    ImageBackground: {
        height: "100%",
        width: Sizes.width,
        backgroundColor: Colors.black
    },
    ImageBackground_Img: {
        opacity: 0.5
    },
    Logo: {
        height: 70,
        width: 70,
        borderRadius: 20,
        // backgroundColor: Colors.orange,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    Text1: {
        textAlign: "center",
        fontFamily: FontFamily.default,
        color: Colors.white,
        fontSize: 16
    },
    Input1: {
        borderBottomColor: Colors.white,
        width: Sizes.width * 0.46,
        marginLeft: -5
    },
    Input: {
        borderBottomColor: Colors.white,
        marginTop: -15
    },
    Input11: {
        borderBottomColor: Colors.white,
        borderBottomWidth: 1,
        marginTop: -25,
        // marginBottom:20,
        borderColor: "#fff"
    },
    btn1: {
        height: 48,
        width: "95%",
        backgroundColor: Colors.orange,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        marginVertical: 10,
        elevation: 5
    },
    btn1Text: {
        fontSize: 20,
        fontFamily: FontFamily.semi_bold,
        color: Colors.white
    }
})
export default SignUp;