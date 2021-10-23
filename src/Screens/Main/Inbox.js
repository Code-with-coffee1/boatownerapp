import React, {useState} from 'react';
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
} from 'react-native';
import {Icon, Input, Card} from 'react-native-elements';
import Header from '../../Components/Header';
import {Colors, FontFamily, Sizes} from '../../Constants/Constants';
import Chats from '../../Data/Chats';
import {useNavigation} from '@react-navigation/core';
import {Loading} from '../../Components/Loader';

const Inbox = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  // --------------------------------------- //
  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <Header name="Massages" imgBack={true} searchBtn={true} />
      <View style={sb.SEC2}>
        {loader ? (
          <Loading />
        ) : (
          <View>
            <FlatList
              data={Chats}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                const unseenMsgCount = undefined || item.unseen_msg_count;
                return (
                  <Card containerStyle={{borderRadius: 10, elevation: 4}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Chats', {item})}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '70%',
                            alignItems: 'center',
                          }}>
                          <Image style={sb.avatar} source={{uri: item.avtar}} />
                          <View style={{marginHorizontal: 7}}>
                            <Text style={sb.name}>{item.name}</Text>
                            <Text style={sb.last_msg}>{item.last_msg}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'space-around',
                          }}>
                          <Text style={sb.last_msg_time}>
                            {item.last_msg_time}
                          </Text>
                          {unseenMsgCount === undefined ? (
                            <View />
                          ) : (
                            <View
                              style={{
                                height: 20,
                                width: 20,
                                backgroundColor: Colors.orange,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: FontFamily.default,
                                  fontSize: 12,
                                  color: Colors.white,
                                }}>
                                {unseenMsgCount}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Card>
                );
              }}
              keyExtractor={(itm, ind) => ind}
              style={{
                marginTop: 30,
              }}
              contentContainerStyle={{
                paddingBottom: 15,
              }}
              contentInsetAdjustmentBehavior="automatic"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const sb = StyleSheet.create({
  SEC2: {
    backgroundColor: Colors.white,
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 15,
  },
  name: {
    fontSize: 16,
    fontFamily: FontFamily.semi_bold,
  },
  last_msg: {
    fontFamily: FontFamily.default,
    fontSize: 12,
    color: '#818080',
  },
  last_msg_time: {
    fontSize: 10,
    fontFamily: FontFamily.default,
    color: '#999',
  },
});

export default Inbox;
