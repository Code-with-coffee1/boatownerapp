import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Root } from "native-base";
import TabNav from './src/Navi/BottomNav';
// import  from './src/Navi/BottomNav';
import Stacks from './src/Navi/Stack';

const App =()=>{
  return(
    <NavigationContainer>
      <Root>
      <StatusBar hidden />
      <Stacks />
      {/* <TabNav /> */}
      </Root>
    </NavigationContainer>
  )
}

export default App;
