
import React, { Component } from 'react';
import {NetInfo,Modal,ActivityIndicator,Image,TextInput,View,StyleSheet,TouchableOpacity,Text,Alert,AsyncStorage} from 'react-native';
export default class Forgotpassword extends Component {
    static navigationOptions = () => ({
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor:  '#CC0000',

        },
      });
        constructor(props) {
            super(props);
            this.state = {
              email: '',
              password: '',
              isLoading: false,
              modalVisible: false,
              securitycode: '',
              otp:''
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
      <Modal
          animationType="slide"
          transparent={true}
          backgroundColor='#000000'
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <ActivityIndicator
        animating={ this.state.isLoading1 }
        color="#CC0000"
        style={ this.state.isLoading1 ? loader.centering : loader.hideIndicator }
        size="large"
      />
          <View style={{backgroundColor:'rgba(0,0,0,0.3)',flex: 1,
    justifyContent: 'center',}}>
            <View style={{backgroundColor:'#cc0000',margin:20,padding:10}}>
              <Text style={{color:'#ffffff',fontSize:16,textAlign:'center',height:40,paddingTop:10}}>ENTER YOUR SECURITY CODE</Text>
              <TextInput
              placeholder = 'Security code from email'
              autoCorrect = {false}
               onChangeText={(otp) => this.setState({otp})}
              style={{textAlign:'center',height:40,marginTop:10,marginBottom:10,backgroundColor:'#ffffff'}}
              >
              </TextInput>
              <TouchableOpacity  style={{paddingTop:20,paddingBottom:10,textAlign:'center'}} onPress={this.btnback.bind(this)}>
         <Text style={{textAlign:'center',fontSize:16,color:'#ffffff'}}>BACK</Text>
         </TouchableOpacity>
         <TouchableOpacity  style={{paddingTop:10,paddingBottom:10,textAlign:'center',backgroundColor:'#ffffff',marginLeft:-10,marginRight:-10,marginBottom:-10}} onPress={this.confirmotp.bind(this)}>
         <Text style={{textAlign:'center',fontSize:16,color:'#000000'}}>Submit</Text>
         </TouchableOpacity>
            </View>
          </View>
        </Modal>
    <View style={styles.logocontainer}>
        <Image source={require('../image/logo.png')} style = {{height: 100, width: 100, resizeMode : 'stretch',marginBottom:50,}} />
 </View>
<View>
<View>
        <TextInput style={styles.input} placeholder = "Enter Email Id"
        placeholderTextColor = "#000000"
        keyboardType = "email-address"
        returnKeyType = "next"
        autoCorrect = {false}
        autoFocus = {true}
        onChangeText={(email) => this.setState({email})}
        />
         <TouchableOpacity  style={styles.Touchable} onPress={this.forgot.bind(this)}>
         <Text style={styles.button}>Submit</Text>
         
         </TouchableOpacity>
 </View>
</View>
 </View>
 );
 }
 btnback = () =>{
  this.setState({
    modalVisible :false
  })
 }
 confirmotp = () =>{

if (this.state.securitycode == this.state.otp){
  this.setState({
    modalVisible :false
  })
  this.props.navigation.navigate('Changepassword',{"email":this.state.email,'isback':0})

}else{
  this.alertdisplay("Incorrect OTP");
}
 }
 forgot = () =>{
    const { email } = this.state;
    if (email == "") {
        this.alertdisplay("Please enter email id");
    } else if (!this.validateEmail(email)){
        this.alertdisplay("Please enter valid email id");
    }else{
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected){
          this.setState({isLoading: true,
          })
          let result = this.apicall(email);
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
}
  apicall(email) {
    return {
      payload: {
        promise: fetch('http://nurloc.piervin.com/api/usermodule/forgotpassword.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            timeout: 0,
            body: JSON.stringify({
              'Email': email,
            })
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({isLoading: false})
              if (responseJson.responsecode == 200){
                this.setState({
                  modalVisible :true,
                  securitycode :responseJson.securitycode,
                })
             //this.props.navigation.navigate('Changepassword',{"email":email,'isback':0})
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
      padding: 10,
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