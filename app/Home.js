import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

import Camera from 'react-native-camera';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {  

    }; 
  }

  _onPressButton =  (name) => {
    this.props.navigator.push({
      name
    });
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{borderBottomColor:'white',backgroundColor: 'black', alignItems:'center', justifyContent:'center', height:50, borderWidth:3}}>
          <Text style={{color:'white'}}>Emotion Recognition</Text>
        </View>
         <View style = {{position: 'absolute',justifyContent:'center', alignItems:'center',zIndex:1, width:200, top:250, left:90, right:0, height:200}}>
              <View style = {{opacity:0.5,borderRadius:4,backgroundColor:'white', justifyContent:'center', alignItems:'center', padding:10}}>
                <Text style={{marginBottom:5}}>Make a "Happy" face</Text>
                <Image
                  source={require('./assets/imgs/happy.jpeg')}
                  style = {{width:64, height:64}}
                />
              </View>
            </View>
      
         <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality.high}
          type={Camera.constants.Type.front}
          captureTarget={Camera.constants.CaptureTarget.disk}
        > 
        </Camera> 
           <View style={{zIndex:1,right: 0,bottom: 0,left: 0,position: 'absolute',opacity: 0.4,height:50, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
          <TouchableHighlight onPress={() => this._onPressButton('GetImage')} style={{justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>  
          <Text style={{justifyContent:'center', alignItems:'center',borderColor:'white',borderWidth:10, height:30, width:30, borderRadius:15}}>
          <Text style={{backgroundColor:'red',borderWidth:5, height:2, width:10, borderRadius:5}}></Text>
          </Text>
          </TouchableHighlight>
        </View>  
      </View>
    ); 
    
  }

}

Home.propTypes = {
  navigator: PropTypes.object,
 
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems:'center',
  },
});

export default Home;
