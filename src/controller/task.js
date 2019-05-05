

import React, { Component } from 'react';
import {TextInput,PermissionsAndroid,Modal,ActivityIndicator,Alert,Geolocation,Image,View,StyleSheet,Text,TouchableOpacity,ScrollView,FlatList,Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
import VideoPreview from 'react-native-video-preview';
var VideoPlayer = require('react-native-native-video-player');
const frameWidth = width;
const columnWidth = frameWidth / 3;
export default class Task extends Component {
  static navigationOptions = () => ({
    headerTintColor: 'white',
    title:'Patient\'s Schedule',
    headerTitleStyle: {
      fontSize: 16,
  },
    headerStyle: {
      backgroundColor:  '#CC0000'
    },
  });
      constructor(props) {
        super(props);
        this.fetchData = this._fetchData.bind(this);
        const { params } = this.props.navigation.state;  
        this.state = {
          ScheduleId:params.ScheduleId,
          modalVisible: false,
        dataSource: [],
        index: null,
        imageurl:'',
        incident: false,
        lat:'',
        long:'',
        isLoading: false,
        isLoading1: false,
        leveltask:0,
        inouttext:'Sign in',
        modalVisible: false,
        desciption:'',
        videourl:'',
        signin:'',
        signout:''
        };
      }
      componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
     }
       async  requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Location Permission',
              'message': 'This app needs access to your location',
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            navigator.geolocation.getCurrentPosition(
              (position)=> {
                 this.setState({ 
                   lat:position.coords.latitude,
                   long:position.coords.longitude
                  });
              },
              (error) => alert(error.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
           );
           this.watchID = navigator.geolocation.watchPosition((position)=> {
              this.setState({ 
                lat:position.coords.latitude,
                   long:position.coords.longitude
               });
           });
          } else {
          }
        } catch (err) {
          console.warn(err)
        }
      }
      render() {
        var add = []
        if (this.state.dataSource.LocationAddress !== undefined){
         add = this.state.dataSource.LocationAddress.split(',');
        }
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
            <View style={{backgroundColor:'#ffffff',margin:20,padding:10}}>
              <Text style={{backgroundColor:'#cc0000',color:'#ffffff',fontSize:16,textAlign:'center',height:40,paddingTop:10}}>Description about video</Text>
              <TextInput
              autoCorrect = {false}
              multiline
               numberOfLines = {10}
               value={this.state.desciption}
               onChangeText={(desciption) => this.setState({desciption})}
              style={{height:100,borderColor:'#cc0000',borderRadius:5,borderWidth:1,marginTop:10,marginBottom:10}}
              >
              </TextInput>
              <TouchableOpacity  style={{borderColor:'#cc0000',borderWidth:1,paddingTop:10,paddingBottom:10,textAlign:'center'}} onPress={this.displayIncidentAlert.bind(this)}>
         <Text style={{textAlign:'center',fontSize:16,color:'#cc0000'}}>Submit</Text>
         </TouchableOpacity>
            </View>
          </View>
        </Modal>
            <ScrollView>
              <View style={ styles.mainview}>
              <View style={{flexDirection: 'row',marginBottom:20,}}>
      <View >
            <Image source={require('../image/profile.png')} style = {{height: 20, width: 20, resizeMode : 'stretch'}} />
               </View>
               <Text style = {{color : '#cc0000',fontSize:15,marginLeft:10}}>Patient Information </Text>
    </View>
    
              <Text style={ styles.txtview}>Patient Name:     {this.state.dataSource.PatientName}</Text>
              <Text style={ styles.txtview}>Phone Number:  {this.state.dataSource.PatientPhone}</Text>
              <Text style={ styles.txtview1}>Patient Address</Text>
              <Text style={ styles.txtview}>Street:   {add[0]}{"\n"}City:      {add[1]}{"\n"}State:    {add[2]}{"\n"}Zip:        {add[3]}{"\n"}</Text>
              </View>
              <View style={{height:5,backgroundColor:"#E7E7E7"}}>
                </View>
                <View style={ styles.mainview}>
                <View style={{flexDirection: 'row',}}>
               <Text style = {{color : 'black',fontSize:14}}>Location </Text>
               <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1 }}>
               <TouchableOpacity style={{alignSelf:'flex-end',Left: 0}} onPress={() => this.btnopenmao()}>
            <Image source={require('../image/map.png')} style = {{ height: 20, width: 20, resizeMode : 'stretch'}} />
            </TouchableOpacity>
               </View>
               </View>
                </View>
            <View style={{height:5,backgroundColor:"#E7E7E7"}}>
                </View>
                <View style={ styles.mainview}>
                <View style={{flexDirection: 'row'}}>
               <Text style = {{color : 'black',fontSize:13,top:0}}>Sign in: </Text>
               <Text style = {{color : 'black',fontSize:13,width:100}}>{this.state.signin}</Text>
               <View style={{top:0,justifyContent: 'flex-end',flex:1,flexDirection: 'row',}}>
               <Text style = {{color : 'black',fontSize:13,top:0}}>Sign off: </Text>
               <Text style = {{color : 'black',fontSize:13,width:100}}>{this.state.signout}</Text>
               </View>
               </View>
                </View>
                <View style={{height:1,backgroundColor:"#E7E7E7"}}>
                </View> 
                <View style={ styles.mainview}>
                <FlatList
           data={this.state.dataSource.VideoUrlList} 
           renderItem={({item: rowData}) => { 
            return (
              <View>
             <View style={{flexDirection: 'row',}}>
             <Text style={{color:'#000000'}}>{rowData.Description}</Text>
                     <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1,flexDirection: 'row'}}>
<View style={{flexDirection: 'column',alignSelf:'flex-end',justifyContent: 'flex-end',color:'#000000'}}>
                     <Text style={{color:'#000000',marginLeft:25,fontSize:13,textAlign:'right'}}>
                       {rowData.video_datetime.split(' ')[0].trim().split('-')[1]+'-'+rowData.video_datetime.split(' ')[0].trim().split('-')[2]+'-'+rowData.video_datetime.split(' ')[0].trim().split('-')[0]+' '+rowData.video_datetime.split(' ')[1].trim().split(':')[0]+':'+rowData.video_datetime.split(' ')[1].trim().split(':')[1]}{'\n'}
                     </Text>
                     <TouchableOpacity style={{padding:30,marginLeft:55,}} onPress={() => this.videoplay('http://nurloc.piervin.com/videos/'+rowData.Url)}>
                     <View style={styles.absoluteView}>
                         <VideoPreview
  source={{ uri:'http://nurloc.piervin.com/videos/'+rowData.Url }}
  style={styles.thumbnail}
  resizeMode={"stretch"}
  />
  </View>
  <Image source={require('../image/play.png')} style = {{height: 30, width: 30}} />
  </TouchableOpacity>
  </View>
  <Image style={this.state.incident ? { height: 40, width: 40 } : { display: 'none' }} source={require('../image/incident.png')} />
                     </View>
             </View>
             <View style={styles.separator} />
     </View>
            )}}
            keyExtractor={(item, index) => index.toString()}
            />
           </View>
<View >
</View>
</ScrollView>
<View>
<View style={styles.frame}>
<TouchableOpacity style={styles.but} onPress= {this.checkinout.bind(this)}>
<Image source={require('../image/check-in.png')} style = {{height: 20, width: 20, resizeMode : 'stretch'}} />
<Text style={{ color:'#ffffff'}}>{this.state.inouttext}
  </Text>
</TouchableOpacity>
<TouchableOpacity style={styles.but} onPress= {this.recordcamera.bind(this)}>
<Image source={require('../image/record-video.png')} style = {{height: 20, width: 20, resizeMode : 'stretch'}} />
<Text style={{ color:'#ffffff'}}>Record video 
  </Text>
</TouchableOpacity>
<TouchableOpacity style={styles.but} onPress= {this.opengellary.bind(this)}>
<Image source={require('../image/upload-video.png')} style = {{height: 20, width: 20, resizeMode : 'stretch'}} />
<Text style={{ color:'#ffffff'}}>Upload video
  </Text>
</TouchableOpacity>
</View>
</View>
          </View>
        );
      }
      videoplay(url){
VideoPlayer.showVideoPlayer(url);
      }
      checkinout(){
        if (this.state.leveltask < 2){
          if (this.state.leveltask == 0){
            this.checkinapi(this.state.ScheduleId,1)
          }else{
            this.checkinapi(this.state.ScheduleId,10)
          }
        }
      }
checkinapi(id,inout){
  return {
    payload: {
      promise: fetch('http://nurloc.piervin.com/api/taskmodule/inouttask.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'ScheduleId': id,
            'inout':inout,
            'lat' : this.state.lat,
            'long' : this.state.long
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({isLoading: false})
          console.log(responseJson)
          if (responseJson.responsecode == 200){
  this.getdata()
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
      recordcamera(){
        if (this.state.leveltask == 1) {
        const options = {
          chooseFromLibraryButtonTitle:null,
          cameraType:'front',
          mediaType:'video',
          quality: 1.0,
          durationLimit:90,
          storageOptions: {
            skipBackup: true
          }
        };
       ImagePicker.launchCamera(options, (response) => {
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
          this.setState({
          videourl : response.uri,
          modalVisible : true
          });
        }
      });
    }else if (this.state.leveltask == 0){
      Alert.alert(
        '',
        'Please Sign in to record video',
        [
          {text: 'OK', 
        },
        ],
        { cancelable: false }
      )
    }else{
      Alert.alert(
        '',
        'You have already signed off for the day',
        [
          {text: 'OK', 
        },
        ],
        { cancelable: false }
      )
    }
      }
      opengellary(){
        if (this.state.leveltask == 1) {
        const options = {
          takePhotoButtonTitle:null,
          mediaType:'video',
          quality: 1.0,
          durationLimit:90,
          storageOptions: {
            skipBackup: true
          }
        };
       ImagePicker.launchImageLibrary(options, (response) => {
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
          this.setState({
            videourl : response.uri,
            modalVisible : true
            });
        }
      });
      }else if (this.state.leveltask == 0){
        Alert.alert(
          '',
          'Please Sign in to record video',
          [
            {text: 'OK', 
          },
          ],
          { cancelable: false }
        )
      }else{
        Alert.alert(
          '',
          'You have already signed off for the day',
          [
            {text: 'OK', 
          },
          ],
          { cancelable: false }
        )
      }
    }
      btnopenmao(){
        if ((this.state.dataSource.Latitude != "") && (this.state.dataSource.longitude != "")){
          this.props.navigation.navigate('Mapview',{"Latitude":this.state.dataSource.Latitude,"Longitude":this.state.dataSource.Longitude,"title":this.state.dataSource.PatientName})
      }else{
        Alert.alert(
          '',
          'No location found for this patient',
          [
            {text: 'OK', 
          },
          ],
          { cancelable: false }
        )
      }
    }
      componentDidMount(){
        this.requestLocationPermission()
        this.getdata()
      }

      displayIncidentAlert() {
        Alert.alert(
          'Incident?',
          'Choose Yes or NO if incident occurred since last check in',
          [
            {text: 'Yes', onPress: () => this.uploadData(true) },
            {text: 'No', onPress: () => this.uploadData(false), style: 'cancel'},
          ],
          { cancelable: false }
        )
      }

      uploadData(incidentHappened)
      {
        this.setState({
          incident: incidentHappened,
          isLoading1: true,
        });
        let formdata = new FormData();
        formdata.append("description", this.state.desciption)
        formdata.append("schedule_id", this.state.ScheduleId)
        formdata.append("incident", this.state.incident)
        formdata.append("lat", this.state.lat)
        formdata.append("long", this.state.long)
        formdata.append("file", {uri: this.state.videourl ,name: 'test.mp4.', type: 'video/mp4'})
       fetch('http://nurloc.piervin.com/api/fileupload/videoupload.php',{
         method: 'post',
         headers: {  
               'Content-Type': 'multipart/form-data',
               'boundary':'------------------- boundary ------------------'
            },
            timeout: 0,
           body: formdata
       }).then((response)=>{
        this.setState({
          desciption:'',
          isLoading1: false,
          modalVisible : false
        });
         if(response.status==200)
                          {
                            console.log('response:',response);
                            response.json().then((responseData) => { 
                              if (responseData.responsecode == 200){
                                Alert.alert(
                                  '',
                                  'Video successfully uploaded...',
                                  [
                                    {text: 'OK', 
                                  },
                                  ],
                                  { cancelable: false }
                                )
                            this.getdata()
                            }else{
                              Alert.alert(
                                '',
                                'Try again...',
                                [
                                  {text: 'OK', 
                                },
                                ],
                                { cancelable: false }
                              )
                            }
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
getdata(){
  this.setState({
    isLoading: true,
  });
  this.fetchData(responseJson => {
    if (responseJson.responsecode == 200){
  const data = responseJson.tasklist[0];
  var leveltask1 = 0;
  var inouttext1 ='Sign in'
  var signin1 =''
  var signout1 =''
  if (data.TypeCheckIn.trim() != ""){
  signin1 = data.TypeCheckIn.split(' ')[0].trim().split('-')[1]+'-'+data.TypeCheckIn.split(' ')[0].trim().split('-')[2]+'-'+data.TypeCheckIn.split(' ')[0].trim().split('-')[0]+' '+data.TypeCheckIn.split(' ')[1].trim().split(':')[0]+':'+data.TypeCheckIn.split(' ')[1].trim().split(':')[1]+':'+data.TypeCheckIn.split(' ')[1].trim().split(':')[2]
    leveltask1 = 1
    inouttext1='Sign off'
  }
  if (data.TypeCheckOut.trim() != ""){
    signout1 = data.TypeCheckOut.split(' ')[0].trim().split('-')[1]+'-'+data.TypeCheckOut.split(' ')[0].trim().split('-')[2]+'-'+data.TypeCheckOut.split(' ')[0].trim().split('-')[0]+' '+data.TypeCheckOut.split(' ')[1].trim().split(':')[0]+':'+data.TypeCheckOut.split(' ')[1].trim().split(':')[1]+':'+data.TypeCheckOut.split(' ')[1].trim().split(':')[2]
  
      leveltask1 = 2
      inouttext1='Sign off'
  }
  this.setState({
    isLoading: false,
    dataSource: data,
    leveltask:leveltask1,
    inouttext:inouttext1,
    signin:signin1,
    signout:signout1
  });
}else{
  this.setState({
    isLoading: false,
    dataSource: [],
  });
  Alert.alert(
    '',
    'No data found',
    [
      {text: 'OK', 
    },
    ],
    { cancelable: false }
  )
}
});
}
      _fetchData(callback) {
        fetch('http://nurloc.piervin.com/api/taskmodule/gettaskbyid.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 0,
        body: JSON.stringify({
          'ScheduleId': this.state.ScheduleId,
        })
    }).then(response => response.json())
          .then(callback)
          .catch(error => {
            console.error(error);
          });
      }
    }
    styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      mainview:{
        padding: 15,
      },txtview1:{
        fontSize: 14,
        margin: 3,
        color:'#cc0000'
      },
      txtview:{
        color:'#000000',
        fontSize: 14,
        margin: 3,
      },thumbnail: {
        width: 100,
        height: 100,
      },
      rightContainer: {
        flex: 1,
        alignSelf:'flex-end',
        justifyContent: 'flex-end',
      },
      separator: {
        marginBottom:5,
        marginTop:5,
         height: 1,
         backgroundColor: '#dddddd',
       },frame: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width: frameWidth,
        backgroundColor:'#cc0000',
      },
      absoluteView: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
      but: {
        width: columnWidth,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems:'center',
        color:'#ffffff'
      }
    })
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