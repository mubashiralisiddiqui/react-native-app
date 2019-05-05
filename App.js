/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import  Login  from './src/controller/login/login';
import  Home  from './src/controller/home/home';
import { StackNavigator } from 'react-navigation';

import  Loginform  from './src/controller/login/loginform';
import  TodaySchedule  from './src/controller/todayschedule';
import  AllSchedule  from './src/controller/allschedule';
import  Mapview  from './src/controller/mapview';
import  Profile  from './src/controller/profile';
import  Changepassword  from './src/controller/changepassword';
import  Forgotpassword  from './src/controller/forgotpassword';
import  Task  from './src/controller/task';
import  Editprofile  from './src/controller/editprofile';
import  Splash  from './splash';

const AppNavigator = StackNavigator({
  SplashScreen: { screen: Splash },
  LoginScreen: { screen: Login },
  HomeScreen: { screen: Home },
  LoginformScreen: { screen: Loginform },
  TodayScheduleScreen: {screen:TodaySchedule},
  AllSchedule: {screen:AllSchedule},
  Mapview: {screen:Mapview},
  Profile: {screen:Profile},
  Changepassword: {screen:Changepassword},
  Forgotpassword: {screen:Forgotpassword},
  Task: {screen:Task},
  Editprofile: {screen:Editprofile},
},{
  cardStyle: {
  backgroundColor: "#CC0000"
  }});
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      <AppNavigator />
             </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC0000',
    justifyContent: 'center', 
  }
});