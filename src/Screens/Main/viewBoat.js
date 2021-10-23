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
} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import Header from '../../Components/Header';
class viewBoat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item
        };
    }

    render() {
        console.log('details', this.state.item)
        const { item } = this.state
        return (
            <SafeAreaView>
                <Header imgBack={true} backBtn={true} name="Details" />
                <ScrollView style={{ marginTop: 10 }} >
                    <View style={styles.card} >
                        <Text style={styles.hText} >Boat Name  :</Text>
                        <Text style={styles.sText}>{item.name}</Text>
                    </View>
                    <View style={styles.card} >
                        <Text style={styles.hText} >Boat Number :</Text>
                        <Text style={styles.sText}>{item.boat_number}</Text>
                    </View>
                    <View style={styles.card} >
                        <Text style={styles.hText} >Registration Number :</Text>
                        <Text style={styles.sText}>{item.registration_no}</Text>
                    </View>
                    <View style={styles.card} >
                        <Text style={styles.hText} >Manufacturing Year :</Text>
                        <Text style={styles.sText}>{item.manufacturing_year}</Text>
                    </View>
                    <View style={styles.card} >
                        <Text style={styles.hText} >Boat Length :</Text>
                        <Text style={styles.sText}>{item.boat_length}</Text>
                    </View>
                    <View style={styles.card} >
                        <Text style={styles.hText} >Cabins :</Text>
                        <Text style={styles.sText}>{item.cabins}</Text>
                    </View>
                    <View style={styles.card} >
                        <Text style={styles.hText} >Boat Capacity :</Text>
                        <Text style={styles.sText}>{item.boat_capacity}</Text>
                    </View>
                    <View style={styles.card} >
                        <Text style={styles.hText} >Toilets :</Text>
                        <Text style={styles.sText}>{item.toilets}</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    };
}

export default viewBoat;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        elevation: 2,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#fff'
    },
    hText: {
        fontSize: 15
    },
    sText: {
        fontWeight: 'bold',
        marginRight: 10
    }
});