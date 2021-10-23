import React from "react"
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import {
    Icon,
    Input,
    Card,
    AirbnbRating,
    Overlay,

} from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { back_img3, boat_img1, Colors, FontFamily, Sizes } from '../../Constants/Constants';
class viewAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item
        };
    }
    render() {
        console.log('item', this.props.route.params.item);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView>
                    <Header
                        backBtn={true}
                        name="Advertisement Details"
                        imgBack={true}
                        headerHeight={300} />

                    <View style={{ margin: 10 }}>
                        <View style={styles.adressbox}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginStart: 20, justifyContent: 'center' }}>
                                    <Image
                                        style={{
                                            height: 60,
                                            width: 60,
                                            borderRadius: 30,
                                            resizeMode: 'cover',
                                            borderWidth: 1,
                                            borderColor: 'green'
                                        }}
                                        source={{
                                            uri: 'https://source.unsplash.com/400x400/?face',
                                        }}
                                        PlaceholderContent={
                                            <ActivityIndicator
                                                size={30}
                                                color={Colors.orange}
                                                style={{ alignSelf: 'center' }}
                                            />
                                        }
                                    />
                                </View>
                                <View style={{ marginStart: 15 }}>
                                    <Text style={{ color: 'orange', fontSize: 18, fontWeight: 'bold' }}>{this.state.item.captain_eng}</Text>
                                    <AirbnbRating
                                        showRating={false}
                                        size={12}
                                        isDisabled
                                        defaultRating={4}
                                        starContainerStyle={{ alignSelf: 'flex-start' }}
                                    />
                                    <Text style={{ fontWeight: 'bold' }}>{this.state.item.boat_name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                            <View >
                                <View style={styles.thirdiconbox}>
                                    <AntDesign name="star" size={30} color="white" />
                                </View>
                                <Text style={{ textAlign: 'center' }}>Sail</Text>
                            </View>
                            <View>
                                <View style={styles.thirdiconbox}>
                                    <Entypo name="location" size={30} color="white" />
                                </View>
                                <Text style={{ textAlign: 'center' }}>{this.state.item.location_address}</Text>
                            </View>
                        </View>
                        <View style={{ height: 150, width: '100%', backgroundColor: 'pink', marginTop: 10, alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '30%' }}>
                                    <View style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name="dollar" size={15} color="white" />
                                        {/* <Icon
                                            name="dots-three-vertical"
                                            type="entypo"
                                            color={Colors.orange}
                                        /> */}
                                    </View>
                                    <Text>KWD 10</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '30%' }}>
                                    <View style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name="hour-glass" size={15} color="white" />
                                        {/* <Icon
                                            name="dots-three-vertical"
                                            type="entypo"
                                            color={Colors.orange}
                                        /> */}
                                    </View>
                                    <Text>Minimum Hour</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '30%' }}>
                                    <View style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name="stopwatch" size={15} color="white" />
                                        {/* <Icon
                                            name="dots-three-vertical"
                                            type="entypo"
                                            color={Colors.orange}
                                        /> */}
                                    </View>
                                    <Text>1 Hours</Text>
                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '30%' }}>
                                    <View style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name="toilet" size={15} color="white" />
                                        {/* <Icon
                                            name="dots-three-vertical"
                                            type="entypo"
                                            color={Colors.orange}
                                        /> */}
                                    </View>
                                    <Text>Toilet</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '30%' }}>
                                    <View style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name="location" size={15} color="white" />
                                        {/* <Icon
                                            name="dots-three-vertical"
                                            type="entypo"
                                            color={Colors.orange}
                                        /> */}
                                    </View>
                                    <Text>2010</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '30%' }}>
                                    <View style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name="location" size={15} color="white" />
                                        {/* <Icon
                                            name="dots-three-vertical"
                                            type="entypo"
                                            color={Colors.orange}
                                        /> */}
                                    </View>
                                    <Text>Cabins</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: 10
                            }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Discription:-</Text>
                            <Text>Description definition is - an act of describing; specifically : discourse intended to give a mental image of something experienced. </Text>
                            <Text>Rental Price:KW 10</Text>
                            <Text>Extra per Hour price:KWD 5</Text>
                            <Text>Minimum Hour:1 Hours</Text>
                            <Text>Discount:KWD 0996</Text>
                            <Text>Ideal Hours:2 Hours</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: 'gray',
                                borderBottomWidth: 1,
                                marginTop: 5
                            }}
                        />
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>
                                Booking Details
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 2
                        }}>
                            {/* <Entypo name="location" size={15} color="black" /> */}
                            <Icon
                                name="dots-three-vertical"
                                type="entypo"
                                color={Colors.orange}
                                size={15}
                            />
                            <Text style={{ marginStart: 5 }}>Jamal Abdul Nasser St.KUwait</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 20 }}>
                            <TouchableOpacity style={{ ...styles.border, backgroundColor: 'white' }}>
                                <Text style={{ color: 'orange', alignSelf: 'center', fontSize: 16, }}>Change Booking Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.border}>
                                <Text style={{ alignSelf: 'center', fontSize: 17, color: 'white' }}>Cancel Booking</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    };
}

export default viewAdd;

const styles = StyleSheet.create({

    icontop: {
        marginTop: 20,
        marginStart: 10,
        flexDirection: 'row',
        flexDirection: 'row'
    },
    adressbox: {
        height: 80,
        width: '100%',
        backgroundColor: 'pink',
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    addressimage: {
        width: 50,
        height: 50, borderRadius: 25,
        borderColor: 'green',
        borderWidth: 1
    },
    thirdiconbox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'orange'
    },
    border: {
        height: 40,
        width: 160,
        backgroundColor: 'orange',
        elevation: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    }
});