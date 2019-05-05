/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NetInfo,Alert,BackHandler, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {
  Image,
  FlatList, //Replace ListView with FlatList
  ActivityIndicator,AsyncStorage
} from "react-native";
export default class Todayschedule extends Component{
    static navigationOptions = () => ({
      title:'Today\'s Schedule',
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
    };
  }
  
  _fetchData(callback) {
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
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if(date<10) {
        date = '0'+date
    } 
    if(month<10) {
        month = '0'+month
    } 
    this.setState({
      id : value,
    selectdate :  year + '-' + month + '-' + date
    });

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected){
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
          'No schedule found...',
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
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
  
    handleBackPress = () => {
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
        <FlatList style={{marginTop:10}}
           data={this.state._data} 
           renderItem={({item: rowData}) => { 
            return (
              
              <TouchableOpacity onPress={() => this.onclickitem(rowData)}>
              <View style={styles.listItem}>
              <View style={{backgroundColor:'#E7E7E7',height:60,margin:-10}}>
                </View>
                  <Image
                    style={{  backgroundColor:'#ffffff',width: 70, height: 70 , alignSelf:'center',borderRadius: 35,marginTop:-30}}
                    source={{
                      uri: rowData.profileImage === '' ||
                        rowData.profileImage === null
                        ? 'http://nurloc.piervin.com/image/customer.png'
                        : rowData.profileImage,
                    }}
                  />
                <View style={{ flex: 1 }}>
                  <Text style={styles.txtview}>
                  Patient Name : {rowData.PatientName}
                  </Text>
                  <Text style={styles.txtview}>
                    Schedule Time :  {(rowData.StartDate !== undefined) ?  rowData.StartDate.split(' ')[0].trim().split('-')[1] : ''}-{(rowData.StartDate !== undefined) ?  rowData.StartDate.split(' ')[0].trim().split('-')[2] : ''}-{(rowData.StartDate !== undefined) ?  rowData.StartDate.split(' ')[0].trim().split('-')[0] : ''} {(rowData.StartDate !== undefined) ?  rowData.StartDate.split(' ')[1].trim().split(':')[0] : ''}:{(rowData.StartDate !== undefined) ? rowData.StartDate.split(' ')[1].trim().split(':')[1] : ''} {'\n'}                               {(rowData.EndDate !== undefined) ? rowData.EndDate.split(' ')[0].trim().split('-')[1] : ''}-{(rowData.EndDate !== undefined) ? rowData.EndDate.split(' ')[0].trim().split('-')[2] : ''}-{(rowData.EndDate !== undefined) ? rowData.EndDate.split(' ')[0].trim().split('-')[0] : ''} {(rowData.EndDate !== undefined) ? rowData.EndDate.split(' ')[1].trim().split(':')[0] : ''}:{(rowData.EndDate !== undefined) ? rowData.EndDate.split(' ')[1].trim().split(':')[1] : ''}
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
                <View style={styles.absoluteView}>
             <Image
                    style={{ width: 20, height: 30}}
                    source={require('../image/forward.png')}
                  />
            </View>
              </View>
              </TouchableOpacity>
            );
          }
        }
        keyExtractor={(item, index) => index.toString()}
        />
        </View>
      );
  }
  onclickitem(rowData){
    this.props.navigation.navigate('Task',{"ScheduleId":rowData.ScheduleId})
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
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E7E7E7',
  },
  listItem: {
    flex: 1,
    backgroundColor:'#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 10,
  },
  imageWrapper: {
    padding: 5,
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
  ,btn:{
    backgroundColor: 'transparent',
    
  },
  absoluteView: {
    flex: 1,
    alignSelf:'flex-end',
    top: -70,
    marginTop:-30
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