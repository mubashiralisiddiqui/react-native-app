
import React, { Component } from 'react';
import {Image,View,StyleSheet,AsyncStorage} from 'react-native';

export default class splash extends Component {
    static navigationOptions = {
        header: null,
        };
        constructor(props) {
            super(props);
            this._bootstrapAsync();
          }
        _bootstrapAsync = async () => {
            const userToken = await AsyncStorage.getItem('login');
            this.props.navigation.push(userToken ? 'HomeScreen' : 'LoginScreen');
          };
 render() {
     
 return (
     <View style={styles.container}>
    <View style={styles.logocontainer}>
        <Image source={require('./src/image/logo.png')} style = {{height: 100, width: 100, resizeMode : 'stretch',marginBottom:50,}} />
 </View>
 </View>

 );
 }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
  });
