/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NetInfo,Alert, StyleSheet, Text, View,TouchableOpacity,BackHandler} from 'react-native';
import { Calendar} from 'react-native-calendars';
import {
  Image,
  FlatList, 
  ActivityIndicator,AsyncStorage
} from "react-native";
export default class Allschedule extends Component{
    static navigationOptions = () => ({
      title:'All Schedule',
        headerTintColor: 'white',
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
    this.state = {
      dataSource: null,
      isLoading: false,
      isLoadingMore: false,
      id:"",
      _data: null,
      selectdate:'',
      currentdate:'',
      labeldate:'',
      ishiddenview:false,
    };
  }
  
  _fetchData(callback) {
    console.log(this.state.selectdate);
    fetch('http://nurloc.piervin.com/api/taskmodule/gettasklist.php',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 0,
    body: JSON.stringify({
      'date': this.state.selectdate,
      'UserId': this.state.id,
    })
}).then(response => response.json())
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }
 
  componentDidMount() {
    AsyncStorage.getItem("userid").then((value) => {
        var date = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    if(date<10) {
        date = '0'+date
    } 
    
    if(month<10) {
        month = '0'+month
    } 
    this.setState({
      id : value,
    selectdate :  year + '-' + month + '-' + date,
    currentdate : year + '-' + month + '-' + date,
    labeldate : month + '-' + date + '-' + year
    });
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected){
        this.setState({
          isLoading: true,
          });
        this.fetchData(responseJson => {
          if (responseJson.responsecode == 200){
        const data = responseJson.tasklist;
        this.setState({
          isLoading: false,
          _data: data,
          
        });
      }else{
        this.setState({
          isLoading: false,
          _data: [],
        });
        Alert.alert(
          '',
          'No schedule found',
          [
            {text: 'OK', 
          },
          ],
          { cancelable: false }
        )
      }
      
    });
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

      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
  
    componentWillUnmount() {
      console.log('remove')
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
  
    handleBackPress = () => {
      console.log('remove')
      this.props.navigation.pop();
       return true;
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
       <View style={{backgroundColor:'#FFFFFF',padding:10,marginBottom:5,marginTop:5}}>
               <View style={{flexDirection: 'row',}}>
               <Text style = {{color : 'black',fontSize:18,marginLeft:10}}>{this.state.labeldate}</Text>
               <View style={{alignSelf:'flex-end',justifyContent: 'flex-end',flex:1 }}>
               <TouchableOpacity style={{alignSelf:'flex-end',Left: 0}} onPress={this.calanderhide.bind(this)}>
            <Image source={require('../image/calendar.png')} style = {{ height: 25, width: 25, resizeMode : 'stretch'}} />
            </TouchableOpacity>
               </View>
               </View>
          </View>
        <Calendar style={this.state.ishiddenview ? styles.hide : styles.show}
         current = {(this.state.selectdate)}
      markedDates={
        { [this.state.selectdate] : {textColor: 'green',selected: true},
         
        }}
         minDate={this.state.currentdate}
      markingType={'simple'}
   scrollEnabled={true}
  showControls={true}
  titleFormat={'MMM YYYY'}
  dayHeadings={['Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri','Sat']}
  monthNames={['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']}
  prevButtonText={'Prev'}
  nextButtonText={'Next'}
  onDayPress={(date) => this.onChangeDate(date)}
  onTouchPrev={this.onTouchPrev}
  onTouchNext={this.onTouchNext}
  onSwipePrev={this.onSwipePrev}
  onSwipeNext={this.onSwipeNext}
  eventDates={this.state.events}
  customStyle={{day: {fontSize: 15, textAlign: 'center', color: '#4c4b4b'}}}
  orizontal={true}
  pagingEnabled={true}
/>
        <FlatList style={{marginTop:10}}
           data={this.state._data} 
           renderItem={({item: rowData}) => { 
            return (
              <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txtview}>
                  Patient Name : {rowData.PatientName}
                  </Text>
                  <Text style={styles.txtview}>
                    Schedule Time : {(rowData.StartDate !== undefined) ? rowData.StartDate.split(' ')[1].trim().split(':')[0] : ''}:{(rowData.StartDate !== undefined) ? rowData.StartDate.split(' ')[1].trim().split(':')[1] : ''} - {(rowData.EndDate !== undefined) ? rowData.EndDate.split(' ')[1].trim().split(':')[0] : ''}:{(rowData.EndDate !== undefined) ? rowData.EndDate.split(' ')[1].trim().split(':')[1] : ''}
                  </Text>
                  <Text style={styles.txtAddress}>
                  Address
                  </Text>
                  <Text style={styles.txtview}>
                   {rowData.PatientAddress}
                  </Text>
                  <Text style={styles.txtview}>
                   Phone No : {rowData.PatientPhone}
                  </Text>
                  <TouchableOpacity style={styles.btnmap} onPress={() => this.btnclick(rowData)}>
                  <Image
                    style={{ width: 30, height: 30}}
                    source={require('../image/map.png')}
                  />
              </TouchableOpacity> 
                </View>
                
              </View>
            );
          }
        }
        keyExtractor={(item, index) => index.toString()}
        />
        </View>
      );
  }
  calanderhide(){
    if (this.state.ishiddenview == true){
    this.setState({
      ishiddenview : false,
      }
    );
  }else{
    this.setState({
      ishiddenview : true,
      }
    );
  }
  }
  btnclick(rowData){
      if ((rowData.Latitude != "") && (rowData.longitude != "")){
        this.props.navigation.navigate('Mapview',{"Latitude":rowData.Latitude,"Longitude":rowData.Longitude,"title":rowData.PatientName})
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
  onChangeDate(date){
    let dd= date.dateString.split('-')
    this.setState({
    selectdate : date.dateString,
    labeldate : dd[1]+'-'+dd[2]+'-'+dd[0],
    }, () => {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected){
          this.setState({
            isLoading: true,
            });
          this.fetchData(responseJson => {
            console.log(responseJson);
            if (responseJson.responsecode == 200){
          const data = responseJson.tasklist;
          this.setState({
            isLoading: false,
            _data: data,
            
          });
        }else{
          this.setState({
            isLoading: false,
            _data: [],
          });
          Alert.alert(
            '',
            'No schedule found',
            [
              {text: 'OK', 
            },
            ],
            { cancelable: false }
          )
        }
        
      });
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
});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E7E7E7',
  },
  listItem: {
    flex: 1,
    backgroundColor:'#FFFFFF',
    borderBottomWidth: 5,
    borderBottomColor: '#d6d7da',
    padding: 10,
  },
  imageWrapper: {
    padding: 5,
  },
  hide:{
display:'none',
  },
  show:{

  },
  title: {
    fontSize: 20,
    margin: 6,
  },
  txtview: {
    fontSize: 14,
    margin: 3,
  },
  txtAddress: {
    fontSize: 14,
    margin: 3,
  color:'#CC0000'
  },btnmap:{
      alignSelf:'flex-end',
      marginTop:-30
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