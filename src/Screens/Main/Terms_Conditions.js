import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    I18nManager,
    TextInput
} from 'react-native';
import {
    Icon,
    Input,
    Card
} from 'react-native-elements';
import {Colors, FontFamily, Sizes } from '../../Constants/Constants';
import { useNavigation } from '@react-navigation/core';
import Header from '../../Components/Header';


const Terms_Conditions=()=>{
    return(
        <View style={{flex:1,backgroundColor:Colors.white}}>
            <Header backBtn={true} imgBack={true} name="Terms & Conditions" />
            <View style={subrata.SEC2}>
                <View style={{marginTop:30,paddingHorizontal:20}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{fontSize:16,fontFamily:FontFamily.bold,marginBottom:10}}>
                            Terms & Conditions
                        </Text>
                        <Text style={{textAlign:"auto",fontFamily:FontFamily.default,fontSize:12,lineHeight:27}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.{'\n'}
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{'\n'}
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. {'\n'}
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.{'\n'} 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{'\n'}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}
const subrata=StyleSheet.create({
    SEC2:{
        backgroundColor:Colors.white,
        borderTopLeftRadius:30,
        borderTopEndRadius:30,
        marginTop:-40,
        flex:1
    },
})
export default Terms_Conditions;