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
      name: 'GetImage',
      data: this.state.emotionObject
    });
  }

  _changeemotion = () => {
    //alert('You want to change me');
    let mynewobject = getRandomEmotion();
    if(this.state.emotionObject.emotionName === mynewobject.emotionName) {
      this.setState({
        emotionObject : getRandomEmotion()
      });
    }
  }
  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{borderBottomColor:'white',backgroundColor: 'black', alignItems:'center', justifyContent:'center', height:50, borderWidth:3}}>
          <Text style={{color:'white',fontSize: 30,fontWeight: 'bold'}}>Emotion Recognition</Text>
        </View>
         <View style = {{
           flex:1,
           justifyContent:'center', 
           alignItems:'center',
           zIndex:1, 
           position:'absolute',
           top:0,
           bottom:0,
           left: 0,
           right: 0}}>
              <View style = {{opacity:0.5,borderRadius:4,backgroundColor:'white',height:180, justifyContent:'center', alignItems:'center', padding:10}}>
                <Text style={{marginBottom:20,fontSize: 30,fontWeight: 'bold'}}>Make a "{this.state.emotionObject.emotionName}" face</Text>
                <Image
                  source={this.pic}
                  style = {{width:84, height:84}}
                />
              </View>
              <TouchableHighlight onPress={() => this._changeemotion()} style={{opacity:0.5,padding:20,marginTop:10, backgroundColor:'white', borderRadius:30}}><Text style={{fontSize: 25,fontWeight: 'bold',color:'black'}}>Or change the emotion</Text></TouchableHighlight>
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
           <View style={{zIndex:1,right: 0,bottom: 0,left: 0,position: 'absolute',opacity: 0.4,height:100, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
            <TouchableHighlight onPress={() => this._onPressButton('GetImage')} style={{justifyContent:'center', alignItems:'center'}}>  
            <View>
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
