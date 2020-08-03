import React, {Component} from 'react';
import {Text, View, StyleSheet, Image,Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
var styles = StyleSheet.create({
    canvas: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
      },
  });
  
export default class CruiseMap extends Component {
  render() {
    return (
	  <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={600}
                       imageHeight={600}>   
      <Image 
        
        source={require('../images/cruise_map.png')}
        style={styles.canvas}
      />
	  </ImageZoom>
 
    );
  }
}