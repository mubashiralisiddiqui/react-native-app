
import React, { Component } from 'react';
import {Dimensions,View,StyleSheet,TouchableOpacity,Text,Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
export default class TodaySchedule extends Component {
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
      Latitude:params.Latitude,
      Longitude:params.Longitude,
        mapRegion: {
          latitude: parseFloat(params.Latitude),
          longitude: parseFloat(params.Longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        markers : [
          {
            latitude: parseFloat(params.Latitude),
            longitude: parseFloat(params.Longitude),
            title: params.title,
            subtitle: ''
          }
        ]
      };
    }
    
      _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
      };

      render = () => {
        return (
          <View style={styles.container}>
             <MapView
              style={{ alignSelf: 'stretch', flex: 1, }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
              annotations = {this.state.markers}
            > 
           {this.state.markers.map(marker => (
    <Marker
      coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
      title={marker.title}
      description={marker.subtitle}
    />
  ))}
          </MapView>
          
            <View style={styles.absoluteView}>
            <TouchableOpacity 
          onPress={this.openMap }
          >
            <Text
              style={styles.btn}
            >Open Direction
            </Text>
            </TouchableOpacity>
            </View>
          </View>
          
        )
      }
      openMap = () =>{
        Linking.canOpenURL('http://maps.google.com/maps?saddr='+this.state.Latitude+','+this.state.Longitude).then(supported => {
          if (supported) {
              Linking.openURL('http://maps.google.com/maps?saddr='+this.state.Latitude+','+this.state.Longitude);
          } else {
              console.log('Don\'t know how to open URI: ');
          }
      });
    }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
      },btn:{
        padding:10,
        paddingLeft:50,
        paddingRight:50,
        fontSize:16,
        borderRadius:5,
        backgroundColor: '#ffffff',
      },
      absoluteView: {
        alignSelf:'center',
        position: 'absolute',
        justifyContent: 'center',
        bottom: 20,

    },
    });