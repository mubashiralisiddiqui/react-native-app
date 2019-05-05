
import React, { Component } from 'react';
import {TextInput,View,StyleSheet,TouchableOpacity,Text,Alert,AsyncStorage} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import home from '../home/home'
export default class Loginform extends Component {
  static navigationOptions = {
    title: "Welcome"
  }
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };
      }
 render() {

 return (
   
  <View>
        <TextInput style={styles.input} placeholder = "Enter Email Id"
        placeholderTextColor = "#000000"
        keyboardType = "email-address"
        returnKeyType = "next"
        autoCorrect = {false}
        autoFocus = {true}
        onSubmitEditing={(event) => { 
            this.refs.password.focus(); 
          }}
        onChangeText={(email) => this.setState({email})}
        />
        <TextInput style={styles.input} placeholderTextColor = "#000000" placeholder ="Password"
         autoCorrect = {false}
         onChangeText={(password) => this.setState({password})}
         secureTextEntry
         ref = "password"
        />
         <TouchableOpacity  style={styles.Touchable} onPress={this.btnlogin}>
         <Text style={styles.button}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity  style={styles.Touchable} onPress={() => {this.props.navigation.navigate('HomeScreen')}}>
         <Text style={styles.button}>Sign Up</Text>
         
         </TouchableOpacity>
 </View>
 );
 }
 btnlogin = () =>{
    const { email, password } = this.state;
    if (email == "") {
        this.alertdisplay("please enter email id");
    }else if (password == ""){
        this.alertdisplay("please enter password");
    } else if (!this.validateEmail(email)){
        this.alertdisplay("please enter valid email id");
    }else{
        let result = this.login(email,password);
    }
 }
  login(username,password) {
    return {
      payload: {
        promise: fetch('http://nurloc.piervin.com/api/usermodule/login.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'Email': username,
              'Password': password
            })
          }).then((response) => response.json())
          .then((responseJson) => {
             AsyncStorage.setItem('emailid', username);
            return responseJson.message;
          })
          .catch((error) => {
            console.error(error);
          })
      }
    }
  }
 
 alertdisplay(msg){
    Alert.alert(msg);
 }
 validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };
}
const styles = StyleSheet.create({
    input: {

      backgroundColor: '#FFFFFF',
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      padding: 10,
      height: 35 ,
      textAlign: 'center',
  textAlignVertical: 'center',
    },
    Touchable: {
        marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      borderWidth: 1,
      padding: 7,
      height: 35 ,
      borderColor: '#fff'
    },
    button:{
    textAlign: 'center',
    textAlignVertical: 'center',
    color:'#ffffff',
   
    }
  });
