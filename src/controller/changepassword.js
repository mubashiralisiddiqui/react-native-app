
import React, { Component } from 'react';
import {NetInfo,ActivityIndicator,Image,TextInput,View,StyleSheet,TouchableOpacity,Text,Alert,AsyncStorage} from 'react-native';
export default class Changepassword extends Component {
    static navigationOptions = () => ({
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor:  '#CC0000',

        },
      });
        constructor(props) {
            super(props);
            const { params } = this.props.navigation.state; 
            this.state = {
              email:params.email,
              isback:params.isback,
                password1: '',
              password: '',
              isLoading: false
            };
          }

 render() {
     
 return (
     
     <View style={styles.container}>
     <ActivityIndicator
        animating={ this.state.isLoading }
        color="#CC0000"
        style={ this.state.isLoading ? loader.centering : loader.hideIndicator }
        size="large"
      />
    <View style={styles.logocontainer}>
        <Image source={require('../image/logo.png')} style = {{height: 100, width: 100, resizeMode : 'stretch',marginBottom:50,}} />
 </View>
<View>
<View>
<TextInput style={styles.input} placeholderTextColor = "#A9A9A9" placeholder ="Password"
         autoCorrect = {false}
         onChangeText={(password) => this.setState({password})}
         secureTextEntry
         ref = "password"
        />
        <TextInput style={styles.input} placeholderTextColor = "#A9A9A9" placeholder ="Re-enter Password"
         autoCorrect = {false}
         onChangeText={(password1) => this.setState({password1})}
         secureTextEntry
         ref = "repassword"
        />
         <TouchableOpacity  style={styles.Touchable}  onPress={this.changepassword}>
         <Text style={styles.button}>Submit Password</Text>
         </TouchableOpacity>
         
 </View>
</View>

 </View>

 );
 }
 changepassword = () =>{
    const { password1, password,email } = this.state;
    if (password == ""){
        this.alertdisplay("Please enter password");
    } if (password.length<6){
      this.alertdisplay("Passord must be atleast 6 digits");
  }
     else if (password != password1){
        this.alertdisplay("Password does not match");
    }else{
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected){
          this.setState({isLoading: true})
          let result = this.apicall(email,password);
  }else{
    Alert.alert('',
      "No internet Connection found...",
      [{
        text: 'OK', 
      },],
      { cancelable: false }
    )
  }
  });
     
    }
 }
 apicall(username,password) {
    return {
      payload: {
        promise: fetch('http://nurloc.piervin.com/api/usermodule/resetpassword.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            timeout: 0,
            body: JSON.stringify({
              'Email': username,
              'Password': password
            })
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({isLoading: false})
              if (responseJson.responsecode == 200){
                if (this.state.isback == 1){
             this.props.navigation.pop()
                }else{
                  this.props.navigation.pop(2)
                  Alert.alert(
                    '',
                    'Password successfully changed...',
                    [
                      {text: 'OK', 
                    },
                    ],
                    { cancelable: false }
                  )
                }
              }else{
                this.alertdisplay("Try again");
              }
          })
          .catch((error) => {
            this.setState({isLoading: false})
            console.error(error);
          })
      }
    }
  }
 
 alertdisplay(msg){
  Alert.alert(
    '',
    msg,
    [
      {text: 'OK', 
    },
    ],
    { cancelable: false }
  )
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
      height: 40 ,
      textAlign: 'center',
  textAlignVertical: 'center',
    },
    Touchable: {
    marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      borderWidth: 1,
  
      borderColor: '#fff'
    },
    button:{
    textAlign: 'center',
    textAlignVertical: 'center',
    color:'#ffffff',
    paddingTop:8,
    paddingBottom:8
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
  });
  const loader = StyleSheet.create({
    centering: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 5,
      backgroundColor: '#000',
      opacity: 0.8
    },
  
    hideIndicator: {
      position: 'absolute',
      top: -100,
      opacity: 0
    }
  });