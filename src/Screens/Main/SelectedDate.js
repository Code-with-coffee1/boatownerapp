import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import {
    Icon,
    Input,
    Card,
    AirbnbRating,
    Overlay,
    Image
} from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from 'react-native-elements/dist/helpers';
import Header from '../../Components/Header';
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
import RadioButtonRN from 'radio-buttons-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import config from '../../Constants/config';
import moment from 'moment';

const SelectedDate = (props) => {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [date, setDate] = useState(new Date);
    const [user_id_post, setUser_id_post] = useState(false);
    const [boatData, setBoatData] = useState([]);
    const [boatDataCheck, setboatDataCheck] = useState([]);
    const [boatids, setBoatIds] = useState([]);
    const [timeType, setTimeType] = useState('fullDay');
    const [showFromTime, setShowFromTime] = useState('off');
    const [showToTime, setShowToTime] = useState('off');
    const [toTime, setToTime] = useState(new Date);
    const [FromTime, setFromTime] = useState(new Date);
    const [allSelect, setAllSelect] = useState(false);
    // const boatData = []
    const TouchableRef = createRef();
    useEffect(async () => {
        console.log(props.route.params.data.dateString)
        let userInfo = await AsyncStorage.getItem('userInfo');
        let parsedInfo = JSON.parse(userInfo);
        setUser_id_post(parsedInfo.id)
        setDate(props.route.params.data.dateString)
        addOnData();
    }, []);
    const boatselectCheckBox = index => {
        // const data = boatData;
        // let data = boatData
        setAllSelect(false)
        console.log('indes', boatData);
        for (let i = 0; i < boatData.length; i++) {
            if (i === index) {
                if (boatData[i].onCheck === 1) {
                    boatData[i].onCheck = 0;
                } else {
                    let count = boatData.filter(function (s) {
                        return s.onCheck === 1;
                    });

                    boatData[i].onCheck = 1;
                }
                let data = boatData
                setBoatData(boatData)

                let petList = data.filter(function (s) {
                    return s.onCheck === 1;
                });
                setboatDataCheck(petList)
                BoatCheck()
            }
        }
    };
    const BoatCheck = () => {
        let id = boatDataCheck.map(function (item) {
            return item['boat_id'].toString();
        });
        setBoatIds(id)
    };
    const addOnData = async () => {
        let userInfo = await AsyncStorage.getItem('userInfo');
        let parsedInfo = JSON.parse(userInfo);
        let url =
            config.apiUrl +
            '/boat_trip_type_for_add_advr.php?user_id_post=69' +
            // parsedInfo.id +
            '&country_code=965';
        axios
            .get(url)
            .then(res => {
                console.log('boat_trip_type_for_add_advr', res.data.boat_arr);
                if (res) {
                    setBoatData(res.data.boat_arr)
                } else {
                    alert(res.data.msg[0]);
                    console.log(res.data.success);
                }
            })
            .catch(err => console.log(err));
    };
    const allSelectfunc = (type) => {
        setAllSelect(type)
        console.log(type)
        if (type) {
            for (let i = 0; i < boatData.length; i++) {

                boatData[i].onCheck = 1;
                setBoatData(boatData)
                let petList = boatData.filter(function (s) {
                    return s.onCheck === 1;
                });
                setboatDataCheck(petList)
                BoatCheck()

            }
        } else {
            for (let i = 0; i < boatData.length; i++) {

                boatData[i].onCheck = 0;
                setBoatData(boatData)
                let petList = boatData.filter(function (s) {
                    return s.onCheck === 0;
                });
                setboatDataCheck(petList)
                BoatCheck()

            }
        }

    }
    const onSubmit = () => {
        let url = config.apiUrl + '/unavailable_add.php';
        var data = new FormData();
        data.append('user_id_post', user_id_post);
        data.append('dates', date);
        data.append('time_types', timeType === 'fullDay' ? 1 : 2);
        data.append('start_times', moment(FromTime).format('HH:mm:ss'));
        data.append('end_times', moment(toTime).format('HH:mm:ss'));
        data.append('selected_boat_types', allSelect ? 1 : 2);
        data.append('selected_boat_ids', boatids.toString());
        // this.setState({ loader: true });
        setLoader(true)
        console.log(data)
        axios
            .post(url, data)
            .then(res => {
                console.log('unavailable_add', res.data);
                // this.setState({ loader: false });
                setLoader(false)
                if (res.data.success) {
                    navigation.goBack();
                } else {
                    alert(res.data.msg[0]);
                    console.log(res.data);
                }
            })
            .catch(err => console.log(err));

    }
    // console.log(boatids.toString())
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header backBtn={true} name="Selected Date" />
            <View style={sb.SEC2}>
                <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            flexDirection: 'row',
                            width: '48%',
                            marginVertical: 10
                        }}>
                            {allSelect ? (
                                <Fontisto
                                    onPress={() => allSelectfunc(!allSelect)}
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
                                    onPress={() => allSelectfunc(!allSelect)}
                                    name="radio-btn-passive"
                                    size={25}
                                    color={Colors.orange}
                                    style={{
                                        alignSelf: 'center',
                                        marginEnd: 5,
                                    }}
                                />
                            )}
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    alignSelf: 'center',
                                    marginStart: 10
                                }}>
                                All Select
                            </Text>
                        </View>
                        {/*  */}
                        <View style={{ borderWidth: 0.5, marginVertical: 15, borderColor: "rgba(0, 0, 0, 0.55)" }} />
                        {/*  */}
                        <View>
                            <Text>Select Boat</Text>
                            <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>

                                {boatData.map((itm, ind) => {
                                    return (
                                        <View key={ind}>
                                            <TouchableOpacity ref={TouchableRef} />
                                            <TouchableOpacity key={ind} style={{
                                                //   height:30,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderColor: "#999",
                                                borderWidth: 1,
                                                margin: 3,
                                                backgroundColor: itm.onCheck !== 1 ? ("#fff") : (Colors.orange)
                                            }}
                                                onPress={() => boatselectCheckBox(ind)}
                                            >
                                                <Text style={{ padding: 7, paddingHorizontal: 20 }}>
                                                    {itm.name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        {/*  */}
                        <View style={{ borderWidth: 0.5, marginVertical: 15, borderColor: "rgba(0, 0, 0, 0.55)" }} />
                        {/*  */}
                        {/* Time type  */}
                        <View style={{
                            flexDirection: 'row',
                            width: '48%',
                            marginVertical: 10
                        }}>
                            {timeType === 'fullDay' ? (
                                <Fontisto
                                    onPress={() => setTimeType('fullDay')}
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
                                    onPress={() => setTimeType('fullDay')}
                                    name="radio-btn-passive"
                                    size={25}
                                    color={Colors.orange}
                                    style={{
                                        alignSelf: 'center',
                                        marginEnd: 5,
                                    }}
                                />
                            )}
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    alignSelf: 'center',
                                    marginStart: 10
                                }}>
                                Full Day
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '48%',
                            marginVertical: 10
                        }}>
                            {timeType === 'hours' ? (
                                <Fontisto
                                    onPress={() => setTimeType('hours')}
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
                                    onPress={() => setTimeType('hours')}
                                    name="radio-btn-passive"
                                    size={25}
                                    color={Colors.orange}
                                    style={{
                                        alignSelf: 'center',
                                        marginEnd: 5,
                                    }}
                                />
                            )}
                            <Text
                                style={{
                                    marginStart: 10,
                                    alignSelf: 'center',
                                    alignSelf: 'center',
                                }}>
                                Select Hours
                            </Text>
                        </View>
                        {/* Date Selector  */}
                        <View>
                            <View style={{
                                marginStart: 15, flexDirection: 'row', marginVertical: 10,
                                width: '40%', justifyContent: 'space-between',
                            }} >
                                <Text style={{ alignItems: 'center', fontSize: 15, fontWeight: 'bold' }} >From</Text>
                                <TouchableOpacity
                                    onPress={() => setShowFromTime('show')}>
                                    <Text>{moment(FromTime).format('hh:mm a')}</Text>
                                </TouchableOpacity>
                            </View>
                            {showFromTime === 'show' && timeType === 'hours' && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={FromTime}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="spinner"
                                    onTouchCancel={() => {
                                        var currentDate = new Date;
                                        setFromTime(currentDate);
                                        setShowFromTime('off');
                                    }}
                                    onChange={(event, selectedDate) => {
                                        var currentDate = selectedDate || new Date;
                                        setFromTime(currentDate);
                                        setShowFromTime('off');
                                    }}
                                />
                            )}
                            <View style={{
                                marginStart: 15, flexDirection: 'row', marginVertical: 10,
                                width: '40%', justifyContent: 'space-between',
                            }}>
                                <Text style={{ alignItems: 'center', fontSize: 15, fontWeight: 'bold' }}>To</Text>
                                <TouchableOpacity
                                    onPress={() => setShowToTime('show')}>
                                    <Text>{moment(toTime).format('hh:mm a')}</Text>
                                </TouchableOpacity>
                            </View>
                            {showToTime === 'show' && timeType === 'hours' && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={toTime}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="spinner"
                                    onTouchCancel={() => {
                                        var currentDate = new Date;
                                        setToTime(currentDate);
                                        setShowToTime('off');
                                    }}
                                    onChange={(event, selectedDate) => {
                                        var currentDate = selectedDate || new Date;
                                        setShowToTime('off');
                                        setToTime(currentDate);
                                    }}
                                />
                            )}
                        </View>
                        <TouchableOpacity onPress={() => onSubmit()}
                            style={{
                                alignSelf: 'center', backgroundColor: Colors.orange, marginTop: 10,
                                paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10
                            }} >
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }} >Add Unavailablity</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}
const sb = StyleSheet.create({
    SEC2: {
        backgroundColor: Colors.white,
        marginTop: -120,
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
        flex: 1
    },
})

export default SelectedDate;