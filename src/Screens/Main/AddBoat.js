import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import { back_img, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import config from '../../Constants/config';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';

const AddBoat = (props) => {
    const Navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [user_id_post, setUser_id_post] = useState('');
    const [boat_name, setBoat_name] = useState('');
    const [boat_brand, setBoat_brand] = useState('');
    const [boat_number, setBoat_number] = useState('');
    const [registration_no, setRegistration_no] = useState('');
    const [boat_year, setBoat_year] = useState(new Date());
    const [boat_length, setBoat_length] = useState('');
    const [boat_capacity, setBoat_capacity] = useState('');
    const [cabins, setCabins] = useState('');
    const [toilets, setToilets] = useState('');
    const [showDate, setShowDate] = useState('off');
    const [date, setDate] = useState(new Date());
    const [pageType, setPageType] = useState('Add');

    useEffect(async () => {
        let userInfo = await AsyncStorage.getItem('userInfo');
        let parsedInfo = JSON.parse(userInfo);
        console.log('parsedInfo', parsedInfo);
        setUser_id_post(parsedInfo.id);
        getBoatNumber()
        if (props.route.params) {
            if (props.route.params.type === 'Edit') {
                setPageType('Edit')
                setItems()
            } else {
                getBoatNumber()
            }
        } else {
            getBoatNumber()
        }

        // setItems()


    }, []);
    const getBoatNumber = async () => {
        setLoader(true)
        let userInfo = await AsyncStorage.getItem('userInfo');
        let parsedInfo = JSON.parse(userInfo);
        let url = config.apiUrl + '/getLastBoatNumber.php?user_id_post=' + parsedInfo.id;
        axios
            .get(url)
            .then(res => {
                setLoader(false)
                console.log('getLastBoatNumber', res.data);
                if (res.data.boat_number) {
                    setBoat_number(parseInt(res.data.boat_number) + 1)
                } else {
                    setBoat_number(1)
                    // alert(res.data.msg[0]);
                    // console.log(res.data.success);
                }
            })
            .catch(err => console.log(err));
    }
    const setItems = async () => {
        const { item } = props.route.params
        console.log('item', item);
        setBoat_name(item.name)
        // setBoat_brand(item.name)
        setBoat_number(item.boat_number)
        setRegistration_no(item.registration_no)
        setBoat_year(new Date(item.manufacturing_year))
        setBoat_length(item.boat_length)
        setBoat_capacity(item.boat_capacity)
        setCabins(item.cabins)
        setToilets(item.toilets)

    };
    const AddBoat = async () => {
        setLoader(true)
        let url = config.apiUrl + '/boat_create.php';
        var data = new FormData();
        data.append('user_id_post', user_id_post);
        data.append('boat_name', boat_name);
        data.append('boat_brand', boat_brand);
        data.append('boat_number', boat_number);
        data.append('registration_no', registration_no);
        data.append('boat_year', moment(boat_year).format('YYYY-MM-DD'));
        data.append('boat_length', boat_length);
        data.append('boat_capacity', boat_capacity);
        data.append('cabins', cabins);
        data.append('toilets', toilets);
        console.log(data)
        axios
            .post(url, data)
            .then(res => {
                console.log('boat_create', res);
                if (res.data.success === 'true') {
                    setLoader(false)
                    if (props.route.params) {
                        Navigation.goBack();
                    } else {
                        Navigation.replace('Home');
                    }

                } else {
                    alert(res.data.msg[0]);
                    console.log(res.data.success);
                }
            })
            .catch(err => console.log(err));
    };
    const editBoat = async () => {
        setLoader(true)
        let url = config.apiUrl + '/boat_edit.php';
        var data = new FormData();
        data.append('user_id_post', user_id_post);
        data.append('boat_id_post', props.route.params.item.boat_id);
        data.append('boat_name', boat_name);
        data.append('boat_brand', boat_brand);
        data.append('boat_number', boat_number);
        data.append('registration_no', registration_no);
        data.append('boat_year', moment(boat_year).format('YYYY-MM-DD'));
        data.append('boat_length', boat_length);
        data.append('boat_capacity', boat_capacity);
        data.append('cabins', cabins);
        data.append('toilets', toilets);
        console.log(data)
        axios
            .post(url, data)
            .then(res => {
                console.log('boat_edit', res);
                setLoader(false)
                if (res.data.success === 'true') {

                    Navigation.goBack();
                } else {
                    alert(res.data.msg[0]);
                    console.log(res.data.success);
                }
            })
            .catch(err => console.log(err));
    };
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate('off');
        setBoat_year(currentDate);
        // console.log(currentDate)
    };
    console.log('date', showDate, boat_year);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header imgBack={true} name={pageType + " Boat"} backBtn={true} />
            <View style={s.SEC2}>
                <ScrollView>
                    <View style={{ marginTop: 5 }}>
                        <Input
                            value={boat_name}
                            placeholder="Boat Name"
                            containerStyle={s.Input}
                            inputContainerStyle={s.Input}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setBoat_name(txt)}
                        />
                        <Input
                            value={boat_number.toString()}
                            placeholder="Boat Number"
                            disabled
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setBoat_number(txt)}
                        />
                        <Input
                            value={boat_brand}
                            placeholder="Boat Brand"
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setBoat_brand(txt)}
                        />
                        <Input
                            value={registration_no}
                            placeholder="Boat Registration Number"
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setRegistration_no(txt)}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingBottom: 10,
                                marginBottom: 20,
                                marginHorizontal: 15,
                                borderBottomWidth: 1,
                                alignSelf: 'center',
                                width: '93%',
                            }}>
                            <Text style={{ fontSize: 18, alignSelf: 'center', color: Colors.gray }}>Boat Year</Text>

                            {showDate !== 'off' ? (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={boat_year}
                                    mode={'date'}
                                    // is24Hour={true}
                                    display="spinner"
                                    onChange={onDateChange}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={{ alignSelf: 'center', fontSize: 18 }}
                                    onPress={() => setShowDate('show')}>
                                    <Text>{moment(boat_year).format('YYYY-MM-DD')}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        {/* <Input
                            placeholder="Boat Year"
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setBoat_year(txt)}
                        /> */}
                        <Input
                            value={boat_length}
                            placeholder="Boat length"
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setBoat_length(txt)}
                            keyboardType={'number-pad'}
                        />
                        <Input
                            value={boat_capacity}
                            placeholder="Boat Capacity"
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setBoat_capacity(txt)}
                            keyboardType={'number-pad'}
                        />
                        <Input
                            value={cabins}
                            placeholder="Cabins"
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setCabins(txt)}
                            keyboardType={'number-pad'}
                        />
                        <Input
                            value={toilets}
                            placeholder="Toilet"
                            containerStyle={s.Input1}
                            inputContainerStyle={s.Input1}
                            placeholderTextColor={Colors.gray1}
                            onChangeText={txt => setToilets(txt)}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={pageType === 'Edit' ? editBoat : AddBoat} style={s.btn1}>
                            {loader ? <ActivityIndicator size="small" color="#000" /> : <Text style={s.btn1Text}>Submit</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
const s = StyleSheet.create({
    SEC2: {
        backgroundColor: Colors.white,
        marginTop: -80,
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
        flex: 1,
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
    },
    btn1Text: {
        fontSize: 20,
        fontFamily: FontFamily.semi_bold,
        color: Colors.white,
    },
});
export default AddBoat;
