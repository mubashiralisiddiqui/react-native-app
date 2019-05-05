
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetInfo,BackHandler,Dimensions,ActivityIndicator,Image,TextInput,View,StyleSheet,TouchableOpacity,Text,Alert,AsyncStorage} from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default class Editprofile extends Component {
  
    static navigationOptions = ({ navigation, screenProps }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => {
          navigation.state.params.onGoBack();
          navigation.pop();
        }}>
            <Image  style={ {'height':35, 'width':35}} source={ require('../image/back.png') }/>
        </TouchableOpacity>
    ),
    title:'Edit Profile',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 16,
      },
        headerStyle: {
          backgroundColor:  '#CC0000',
        }
      });
        constructor(props) {
            super(props);
            const { params } = this.props.navigation.state;
            this.state = {
              isLoading: false,
              fname:'',
              lname:'',
              mobile:'',
              email:'',
              street:'',
              city:'',
              state:'',
              zip:'',
              dataSource:[],
              height:44,
              modalVisible: false,
              datetime:params.datetime,
       photos: [],
       index: null,
       imageurl:'',
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
<KeyboardAwareScrollView>
<TouchableOpacity  onPress= {this.selectPhotoTapped.bind(this)}>
    <View style={styles.logocontainer}>
    <Image style={styles.avatar} source={{uri: this.state.imageurl?this.state.imageurl : this.state.dataSource.image ? 'http://nurloc.piervin.com/image/' + this.state.dataSource.image + '?' + this.state.datetime : 'http://nurloc.piervin.com/image/customer.png'}}/>
    <View  style={{marginBottom:-60,marginLeft:-30}}>
    <Image source={require('../image/Edit_Profile-camera.png')} style = {{ height: 30, width:30, resizeMode : 'stretch'}} />
        </View>
 </View>
 </TouchableOpacity>
<View>
<View style={{flexDirection: 'row', backgroundColor:'#ffffff',padding:10}}>
      <View >
            <Image source={require('../image/profile.png')} style = {{height: 20, width: 20, resizeMode : 'stretch'}} />
               </View>
               <Text style = {{color : 'black',fontSize:15,marginLeft:10}}>Personal Information </Text>
              
    </View>
<View>
<TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]}
placeholderTextColor = "#A9A9A9" 
placeholder ="First Name"
         autoCorrect = {true}
         keyboardType = "email-address"
         returnKeyType = "next"
         value={this.state.fname}
         autoCorrect = {false}
         autoFocus = {true}
         onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
          }}
         onSubmitEditing={(event) => { 
             this.refs.lname.focus(); 
           }}
         onChangeText={(fname) => this.setState({fname})}
         ref = "fname"
        />
        <TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]}
        placeholderTextColor = "#A9A9A9" 
        placeholder ="Last Name"
         returnKeyType = "next"
         autoCorrect = {false}
         value={this.state.lname}
         onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
          }}
         onSubmitEditing={(event) => { 
             this.refs.mobile.focus(); 
           }}
         onChangeText={(lname) => this.setState({lname})}
         ref = "lname"
        />
        <TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]}
         placeholderTextColor = "#A9A9A9" 
         placeholder ="Mobile No"
         keyboardType = "number-pad"
         returnKeyType = "next"
         autoCorrect = {false}
         value={this.state.mobile}
         maxLength={10}
         onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
          }}
         onSubmitEditing={(event) => { 
             this.refs.email.focus(); 
           }}
         onChangeText={(mobile) => this.setState({mobile})}
         ref = "mobile"
        />
        <TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]}
         placeholderTextColor = "#A9A9A9"
          placeholder ="Email id"
         autkeyboardType = "email-address"
         returnKeyType = "next"
         value={this.state.email}
         autoCorrect = {false}
         onSubmitEditing={(event) => { 
             this.refs.city.focus(); 
           }}
         onChangeText={(email) => this.setState({email})}
         ref = "email"
        />
        <TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]}
        placeholderTextColor = "#A9A9A9"
         placeholder ="Street"
         returnKeyType = "next"
         value={this.state.street}
         autoCorrect = {false}
         onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
          }}
         onSubmitEditing={(event) => { 
             this.refs.city.focus(); 
           }}
         onChangeText={(street) => this.setState({street})}
         ref = "street"
        />
        <TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]} 
        placeholderTextColor = "#A9A9A9"
         placeholder ="City"
         returnKeyType = "next"
         value={this.state.city}
         autoCorrect = {false}
         onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
          }}
         onSubmitEditing={(event) => { 
             this.refs.state.focus(); 
           }}
         onChangeText={(city) => this.setState({city})}
         ref = "city"
        />
        <TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]}
        placeholderTextColor = "#A9A9A9" 
        placeholder ="State"
        returnKeyType = "next"
        value={this.state.state}
        autoCorrect = {false}
        onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
          }}
        onSubmitEditing={(event) => { 
            this.refs.zip.focus(); 
          }}
        onChangeText={(state) => this.setState({state})}
         ref = "state"
        />
        <TextInput style={[styles.input,{height: Math.max(35, this.state.height)}]}
        placeholderTextColor = "#A9A9A9"
         placeholder ="Zip Code"
         keyboardType = "number-pad"
         returnKeyType = "done"
         value={this.state.zip}
         autoCorrect = {false}
         maxLength={6}
         onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
          }}
         onSubmitEditing={(event) => { 
           }}
         onChangeText={(zip) => this.setState({zip})}
         ref = "zip"
        />
         <TouchableOpacity  style={styles.Touchable} onPress = {this.btnupdate}>
         <Text style={styles.button}>Save</Text>
         </TouchableOpacity>
 </View>
</View>
</KeyboardAwareScrollView>
 </View>
 );
 }
 takePicture() {
  this.camera.capture()
  .then((data) => console.log(data))
  .catch(err => console.error(err));
  }
 btnupdate = () =>{
    const { email, fname,lname,mobile,street,city,state,zip } = this.state;
    if (fname == "") {
        this.alertdisplay("Please enter first name");
    }else if (lname == ""){
        this.alertdisplay("Please enter last name");
    }else if (mobile == ""){
      this.alertdisplay("Please enter mobile no");
   }else if (mobile.length != 10){
    this.alertdisplay("please enter 10 digit Mobile no");
 } else if (email == ""){
    this.alertdisplay("Please enter email id");
  }else if (!this.validateEmail(email)){
        this.alertdisplay("Please enter valid email id");
  }else if (street == ""){
      this.alertdisplay("Please enter street");
  }else if (city == ""){
    this.alertdisplay("Please enter city");
}else if (state == ""){
  this.alertdisplay("Please enter state");
}else if (zip == ""){
  this.alertdisplay("Please enter zip");
}else{
  NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected){
      this.setState({isLoading: true})
      AsyncStorage.getItem("userid").then((value) => {
      let result = this.updateinfo(value,fname,lname,mobile,email,street,city,state,zip);
  })
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
 selectPhotoTapped() {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
  };
 ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled photo picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };
    this.setState({
    imageurl : response.uri
    });
    AsyncStorage.getItem("userid").then((value) => {

      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected){
          this.uploadData(value, response.uri) 
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
      
  }).done();
  }
});
 }
 uploadData(id,url)
   { this.setState({
    isLoading: true,
  });
     let formdata = new FormData();
     formdata.append("UserId", id)
     formdata.append("file", {uri: url ,name: 'test.jpg.', type: 'multipart/form-data'})
    fetch('http://nurloc.piervin.com/api/fileupload/imageupload.php',{
      method: 'post',
      headers: {  
            'Content-Type': 'multipart/form-data',
            'boundary':'------------------- boundary ------------------'
         },
         timeout: 0,
        body: formdata
    }).then((response)=>{
      this.setState({
        isLoading: false,
      });
      if(response.status==200)
                       {
                         console.log('response:',response);
                         response.json().then((responseData) => { 
                         console.log("inside responseData 200:",responseData);
                         console.log('responseData:',responseData);

                        })}
                        else
                        if(response.status==400)
                        { 
                        response.json().then((responseData) => { 
                        console.log("inside responseData 400:",responseData);

                        })
                        }
        else

         {console.log('hi else',response.status)}


     }).done();


   }
  updateinfo(id,fname,lname,mobile,email,street,city,state,zip) {
    return {
      payload: {
        promise: fetch('http://nurloc.piervin.com/api/usermodule/updateinfo.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'UserId': id,
              'FirstName': fname,
              'LastName': lname,
              'State': state,
              'City': city,
              'Zip': zip,
              'MobileNo': mobile,
              'Email': email,
              'Street': street
            })
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({isLoading: false})
              if (responseJson.responsecode == 200){
                Alert.alert(
                  '',
                  'Information successfully Updated...',
                  [
                    {text: 'OK', 
                  },
                  ],
                  { cancelable: false }
                )
                this.props.navigation.state.params.onGoBack();
                this.props.navigation.pop();
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
  componentDidMount(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected){
        this.setState({isLoading: true})
        AsyncStorage.getItem("userid").then((value) => {
          this.getdata(value) 
      }).done();
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
    
    
  BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
}

handleBackPress = () => {
  this.props.navigation.state.params.onGoBack();
  return false;
}
goBack(){
  this.props.navigation.state.params.onGoBack();
}
  getdata(id) {
    return {
      payload: {
        promise: fetch('http://nurloc.piervin.com/api/usermodule/userinfo.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            timeout: 0,
            body: JSON.stringify({
              'UserId': id,
            })
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({isLoading: false})
            if (responseJson.responsecode == 200){
            this.setState({dataSource: responseJson.userinfo,
              fname:responseJson.userinfo.FirstName,
              lname:responseJson.userinfo.LastName,
              mobile:responseJson.userinfo.MobileNo,
              email:responseJson.userinfo.Email,
              street:responseJson.userinfo.Street,
              city:responseJson.userinfo.City,
              state:responseJson.userinfo.State,
              zip:responseJson.userinfo.Zip,
            })
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
      marginTop: 3,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 3,
      padding: 7,
      paddingLeft: 10,
    },
    Touchable: {
      marginTop: 20,
      marginBottom: 20,
     paddingTop: 5,
      paddingLeft:40,
     paddingRight:40,
    paddingBottom:5,
      borderRadius:20,
      padding: 7,
      alignSelf:'center',
      backgroundColor:'#cc0000'
    },
    button:{
    textAlign: 'center',
    textAlignVertical: 'center',
    color:'#ffffff',
   fontSize:15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#E7E7E7",
    },
    logocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
     modalContainer: {
       paddingTop: 20,
       flex: 1
     },
     scrollView: {
       flexWrap: 'wrap',
       flexDirection: 'row'
     },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom:30,
        marginTop:30,
        alignSelf:'center',
        
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
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