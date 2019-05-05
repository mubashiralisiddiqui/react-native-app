
import React, { Component } from 'react';
import {NetInfo,Keyboard,BackHandler,ActivityIndicator,Image,TextInput,View,StyleSheet,TouchableOpacity,Text,Alert,AsyncStorage} from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
        headerStyle: {
          backgroundColor:  '#CC0000',
        },
        };
        constructor(props) {
            super(props);
            this.state = {
              email: '',
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
        <Image source={require('../../image/logo.png')} style = {{height: 100, width: 100, resizeMode : 'stretch',marginBottom:50,}} />
 </View>
<View>
<View>
        <TextInput style={styles.input} placeholder = "Enter Email Id:"
        placeholderTextColor = "#A9A9A9"
        keyboardType = "email-address"
        returnKeyType = "next"
        autoCorrect = {false}
        autoFocus = {true}
        onSubmitEditing={(event) => { 
            this.refs.password.focus(); 
          }}
        onChangeText={(email) => this.setState({email})}
        />


        <TextInput style={styles.input} placeholderTextColor = "#A9A9A9" placeholder ="Password"
         autoCorrect = {false}
         onChangeText={(password) => this.setState({password})}
         secureTextEntry
         ref = "password"
        />
         <TouchableOpacity  style={styles.Touchable} onPress={this.btnlogin}>
         <Text style={styles.button}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity  style={styles.Touchable} onPress={() => {this.props.navigation.navigate('Forgotpassword')}}>
         <Text style={styles.button2}>Forgot Password</Text>
         </TouchableOpacity>
 </View>
</View>
 </View>
 );
 }
 btnlogin = () =>{
  Keyboard.dismiss()
    const { email, password } = this.state;
    if (email == "") {
        this.alertdisplay("Please enter email id");
    }else if (password == ""){
        this.alertdisplay("Please enter password");
    } else if (!this.validateEmail(email)){
        this.alertdisplay("Please enter valid email id");
    }else{
        

        NetInfo.isConnected.fetch().then(isConnected => {
          if (isConnected){
            this.setState({isLoading: true})
          this.login(email,password);
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
 componentDidMount(){
   AsyncStorage.removeItem('userid')
   AsyncStorage.removeItem('login')
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  
  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
   )
   return true;
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
            timeout: 0,
            body: JSON.stringify({
              'Email': username,
              'Password': password
            })
          }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({isLoading: false})
              if (responseJson.responsecode == 200){
                AsyncStorage.setItem('userid', responseJson.UserId);
                AsyncStorage.setItem('login', "1");
             this.props.navigation.navigate('HomeScreen')
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
      marginBottom: 30,
      paddingLeft: 30,
      borderRadius:20,
      textAlign: 'left',
    },
    Touchable: {
    marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
      borderWidth: 1,width: 100,
      borderRadius:20,
      borderColor: '#fff',
    },
    button:{
    textAlign: 'center',
    textAlignVertical: 'center',
    color:'#ffffff',
   paddingTop:10,
   paddingBottom:10
    },button2:{
      textAlign: 'center',
      textAlignVertical: 'center',
      color:'#000',
     paddingTop:10,
     paddingBottom:10
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

  