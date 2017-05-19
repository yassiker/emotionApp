import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Animated,
    Easing
} from 'react-native';

import {
  Image,

} from '@shoutem/ui';
import Camera from 'react-native-camera';
var img = require('./assets/imgs/myframe.png');
let ico = require('./assets/imgs/happy.jpg');
import { getRandomEmotion } from '../config/emotions';
import { getIcon } from '../config/emoticon';

class GetEmotion extends Component {

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      emotionObject : getRandomEmotion(),
    };
 
    this.pic = getIcon(this.state.emotionObject.emotionKey);
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    
    //alert('The Emotion is selected Randomly for you, Just Click on Capture to start');
  }

  componentDidMount () {
 
    this.animate();
  }

  animate () {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate());
  }

  navigate = (name) => {
    this.props.navigator.push({
      name,
      data: this.state.emotionObject
    
    });

  }

  render() {
    //alert(this.picval);
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <View style = {styles.cont}>
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
            <Image
            styleName="large-square"
            source={img}
            />
            
        </Camera>
        <View style={styles.textview}>
          <Text style={styles.mytext}>"{this.state.emotionObject.emotionName}"</Text>
          <Animated.View
            style={{
              bottom:20,
              left:310,
              opacity,
              alignItems:'flex-start'}} >
            <Image
              styleName="small-avatar"
              source={this.pic}
              />
            </Animated.View>
             <TouchableHighlight style={styles.fullWidthButton} onPress = {() => this.navigate('EmotionApi')}>
          <Text style={styles.fullWidthButtonText}>CAPTURE</Text>
        </TouchableHighlight>
        </View>
      </View>

    );
  }
}

GetEmotion.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  myimg: {
    top:30,
  },
  textview: {
    alignItems:'center', 
    flexDirection:'column',
    height:100,
    width:500,
    backgroundColor: 'skyblue',
    borderRadius: 50,
    
  },
  mytext:{
    fontSize: 40, 
    fontWeight: 'bold', 
    color:'white',
     
  },
  fullWidthButton: {
    backgroundColor: 'blue',
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width:200,
    borderWidth:2,
    borderColor: '#d6d7da',
    bottom:50
  },
  fullWidthButtonText: {
    fontSize: 35,
    height:40,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default GetEmotion;
