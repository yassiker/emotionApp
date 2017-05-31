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
import { getRandomEmotion } from '../config/emotions';
import { getIcon } from '../config/emoticon';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      emotionObject : getRandomEmotion(),

    }; 
    this.pic = getIcon(this.state.emotionObject.emotionKey);
  }

  _onPressButton =  (name) => {
    this.props.navigator.push({
      name,
      data: this.state.emotionObject
    });
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{backgroundColor: 'black', alignItems:'center', justifyContent:'center', height:80}}>
          <Text style={{color:'white',fontSize: 30,fontWeight: '300'}}>Emotion Recognition</Text>
        </View>
         <View style = {{
           flex:1,
           justifyContent:'center', 
           alignItems:'center',
           zIndex:1, 
           padding:30,
           position:'absolute',
           top:0,
           bottom:0,
           left: 0,
           right: 0}}>
              <View style = {{opacity:0.8,borderRadius:10,backgroundColor:'white',height:180, justifyContent:'center', alignItems:'center', padding:70}}>
                <Text style={{marginBottom:30,fontSize: 30,fontWeight: '300'}}>Make a "{this.state.emotionObject.emotionName}" face</Text>
                <Image
                  source={this.pic}
                  style = {{width:84, height:84}}
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
        <Text style={{color:'white',fontSize: 20,fontWeight: 'bold'}}> </Text>
        </Camera> 
           <View style={{zIndex:1,right: 0,bottom: 0,left: 0,position: 'absolute',opacity: 0.4,height:95, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
            <TouchableHighlight onPress={() => this._onPressButton('GetImage')} style={{justifyContent:'center', alignItems:'center'}}>  
            <View style={{top:13}}>
            <Text style={{justifyContent:'center', alignItems:'center',borderColor:'white',borderWidth:25, height:70, width:70, borderRadius:35}}>
            </Text>
            <Text style={{bottom:46,borderColor:'red',borderWidth:11, height:22, width:22, borderRadius:11, zIndex:1,left:24}}></Text>
            </View>
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
    justifyContent: 'flex-end',
    alignItems:'center',
  },
});

export default Home;
