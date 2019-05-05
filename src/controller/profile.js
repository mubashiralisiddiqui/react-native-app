
import React, { Component } from 'react';
import {NetInfo,ScrollView,BackHandler,Image, Text,Alert, TouchableOpacity, View,StyleSheet,ActivityIndicator,AsyncStorage} from 'react-native';
export default class Profile extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => {
          navigation.state.params.onGoBack();
          navigation.pop();
        }}>
            <Image  style={ {'height':30, 'width':30, marginLeft:13}} source={ require('../image/back.png') }/>
        </TouchableOpacity>
    ),
    title:'My Profile',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontSize: 16,
      },
        headerStyle: {
          backgroundColor:  '#CC0000',
        },
      });
      constructor(props) {
        super(props);
        this.state = {
          onGoBack: () => this.callback(),
          isLoading: false,
          text:false,
          dataSource:[]
        };
      }
      render() {
        var today = new Date();
        return (
          <ScrollView style={styles.container1}>
          <View style={styles.container}>
          <ActivityIndicator
        animating={ this.state.isLoading }
        color="#CC0000"
        style={ this.state.isLoading ? loader.centering : loader.hideIndicator }
        size="large"
      />
          <Image key={new Date()} style={styles.avatar} source={{uri: this.state.dataSource.image ? 'http://nurloc.piervin.com/image/' + this.state.dataSource.image + '?' + new Date() : 'http://nurloc.piervin.com/image/customer.png'}}/>
          <Text style={{ alignSelf:'center',color:'#000000'}}>{this.state.dataSource.FirstName} {this.state.dataSource.LastName}</Text>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <View style={{flexDirection: 'row',}}>
            <View >
            <Image source={require('../image/profile.png')} style = {{height: 20, width: 20, resizeMode : 'stretch'}} />
               </View>
               <Text style = {{color : 'black',fontSize:15,marginLeft:10}}>Personal Information </Text>
               <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1 }}>
               <TouchableOpacity style={{alignSelf:'flex-end',Left: 0}} onPress={() => {this.props.navigation.navigate('Editprofile',{
      onGoBack: () => this.callback(),"datetime":today.getDate() + "/"+ new Date().getMonth()+1 +"/"+ new Date().getFullYear()+"/"+ new Date().getSeconds() +"/"+ new Date().getMinutes() +"/"+ new Date().getSeconds()
    })}}>
            <Image source={require('../image/edit.png')} style = {{ height: 20, width: 20, resizeMode : 'stretch'}} />
            </TouchableOpacity>
               </View>
               </View>
               <View>
                
                 </View>
                 <View style={{flexDirection: 'row',paddingTop:15}}>
                 <Text>Name</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.FirstName} {this.state.dataSource.LastName}</Text>
                 </View>
                   </View>
                   <View style={{flexDirection: 'row',paddingTop:5}}>
                 <Text>Company</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.CompanyName}</Text>
                 </View>
                   </View>
                   <View style={{flexDirection: 'row',paddingTop:5}}>
                 <Text>Phone Number</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.MobileNo}</Text>
                 </View>
                   </View>
                   <View style={{flexDirection: 'row',paddingTop:5}}>
                 <Text>Email</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.Email}</Text>
                 </View>
                   </View>
                   <View style={{flexDirection: 'row',paddingTop:5}}>
                 <Text>Street</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.Street}</Text>
                 </View>
                   </View>
                   <View style={{flexDirection: 'row',paddingTop:5}}>
                 <Text>City</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.City}</Text>
                 </View>
                   </View>
                   <View style={{flexDirection: 'row',paddingTop:5}}>
                 <Text>State</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.State}</Text>
                 </View>
                   </View>
                   <View style={{flexDirection: 'row',paddingTop:5}}>
                 <Text>Zip</Text>
                 <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
                 <Text>{this.state.dataSource.Zip}</Text>
                 </View>
                   </View>
                   

            </View>
        </View>
        <View style={{backgroundColor:'#FFFFFF',padding:10,marginTop:10}}>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Changepassword',{"email":this.state.dataSource.Email,'isback':0})}}>
        <View style={{flexDirection: 'row',}}>
            <View >
            <Image source={require('../image/changeps.png')} style = {{height: 20,marginTop:3, width: 20, resizeMode : 'stretch'}} />
               </View>
               <Text style = {{color : 'black',fontSize:15,marginLeft:10}}>Change Password</Text>
               <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1 }}>
               <TouchableOpacity style={{alignSelf:'flex-end',Left: 0}} >
            <Image source={require('../image/forward.png')} style = {{ height: 20, width: 20, resizeMode : 'stretch'}} />
            </TouchableOpacity>
               </View>
               </View>
               </TouchableOpacity>
          </View>
         
          </View>
          <View style={{height:50}}>
          </View>
          </ScrollView>
         
        );
      }
      goBack(){
        console.log('sdfsdfsdfds')
      }
    callback() {
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
        this.props.navigation.pop();
         return true;
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
                this.setState({dataSource: responseJson.userinfo})
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
        paddingTop:70,
    },
    container1: {
      backgroundColor: "#E7E7E7",
  },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom:10,
        alignSelf:'center',
        
      },
     
      bodyContent: {
        marginTop:20,
        padding:10,
        backgroundColor: "#FFFFFF",
        
      },
      
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