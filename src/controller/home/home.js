
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import {BackHandler,Image, Text,Alert, TouchableOpacity, View,StyleSheet,ActivityIndicator,AsyncStorage} from 'react-native';
export default class Home extends Component {
    static navigationOptions = () => ({
        header: null,
        gesturesEnabled: false,
        title: 'Home',
        headerTintColor: 'blue',
        headerStyle: {
          backgroundColor: 'red'
        },
      });
      constructor(props) {
        super(props);
        this.state = {
          onGoBack: () => this.callback(),
          isLoading: false,
          dataSource:[]
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
            <View style={styles.header}></View>
            <Image source={require('../../image/logo.png')} style = {{marginTop:-150,height: 60, width: 60, resizeMode : 'stretch',marginBottom:50,alignSelf:'center',}} />
          <Image style={styles.avatar} source={{uri: this.state.dataSource.image ? 'http://nurloc.piervin.com/image/' + this.state.dataSource.image+ '?' + new Date() : 'http://nurloc.piervin.com/image/customer.png'}}/>
          <View style={styles.body}>
          <Text style={styles.name}>{this.state.dataSource.FirstName} {this.state.dataSource.LastName}</Text> 
            <View style={styles.bodyContent}>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.props.navigation.navigate('Profile',{
      onGoBack: () => this.callback(),
    })}}>
                <Text style={{paddingTop:7,paddingBottom:7}}>View Profile</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.props.navigation.navigate('TodayScheduleScreen')}}>
                <Text style={{paddingTop:7,paddingBottom:7}}>Today's Schedule</Text> 
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.props.navigation.navigate('AllSchedule')}}>
                <Text style={{paddingTop:7,paddingBottom:7}}>All Schedule</Text>  
              </TouchableOpacity> 
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                this.props.navigation.dispatch({
                  type: NavigationActions.NAVIGATE,
                  routeName: 'LoginScreen',
                  action: {
                    type: NavigationActions.RESET,
                    index: 0,
                    actions: [{type: NavigationActions.NAVIGATE, routeName: 'LoginScreen'}]
                  }
                })
                
                //this.props.navigation.navigate('LoginScreen')}
              }
                }>
                <Text style={{paddingTop:7,paddingBottom:7}}>Logout</Text>  
              </TouchableOpacity> 
            </View>
        </View>
          </View>
        );
      }
      componentDidMount(){
        this.setState({isLoading: true})
        AsyncStorage.getItem("userid").then((value) => {
          this.getdata(value) 
      }).done();
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
      callback() {
        this.setState({isLoading: true})
        AsyncStorage.getItem("userid").then((value) => {
          this.getdata(value) 
      }).done();
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
                console.log(responseJson);
                this.setState({isLoading: false})
                if (responseJson.responsecode == 200){
                this.setState({dataSource: responseJson.userinfo})
                }else{
                  this.alertdisplay("Try again");
                }
              })
              .catch((error) => {
                this.setState({isLoading: false})
              })
          }
        }
      }
      alertdisplay(msg){
        Alert.alert(msg);
     }
     logout(){
   }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7E7E7",
    },
    header:{
        backgroundColor: "#CC0000",
        height:220,
      },
      avatar: {
        backgroundColor:'#ffffff',
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:160
      },
      name:{
        fontSize:18,
        color:"#CC0000",
        fontWeight:'500',
        alignSelf:'center',
        marginTop:60
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        paddingTop:50,
        backgroundColor: "#E7E7E7",
      },
      buttonContainer: {
        marginTop:5,
        flexDirection: 'row',
        marginBottom:5,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center', 
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