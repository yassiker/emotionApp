import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';


import Camera from 'react-native-camera';
var img = require('./imgs/myframe.png');
import { getRandomEmotion } from '../config/emotions';

class GetEmotion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emotionObject : getRandomEmotion()
    };
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    alert('The Emotion is selected Randomly for you, Just Click on Capture to start');
  }

  navigate = (name) => {
    this.props.navigator.push({
      name,
      data: this.state.emotionObject
    });

  }

  render() {
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
            styleName="featured"
            source={img}
            >
            </Image>
        </Camera>
        <View style={{alignItems:'center', height:50}}>
        <Text style={{fontSize: 40, fontWeight: 'bold',backgroundColor:'white'}}>"{this.state.emotionObject.emotionName}"</Text>
        </View>
        <TouchableHighlight style={styles.fullWidthButton} onPress = {() => this.navigate('EmotionApi')}>
          <Text style={styles.fullWidthButtonText}>CAPTURE</Text>
        </TouchableHighlight>
      </View>

    );
  }
}

GetEmotion.propTypes = {
  navigator: PropTypes.object,
  myobject: PropTypes.object,

};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  myimg: {
    top:30,
  },
  fullWidthButton: {
    backgroundColor: 'skyblue',
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#d6d7da',
  },
  fullWidthButtonText: {
    fontSize: 35,
    height:40,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default GetEmotion;
