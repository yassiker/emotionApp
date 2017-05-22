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
    alert('The Emotion is selected Randomly for you, Just Click on Capture to start');
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
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <View style = {styles.container}>
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
          <View style={{flexDirection:'row', marginRight:20, justifyContent:'center', alignItems:'center'}}>
          <Animated.View
            style={{
              opacity,
              alignItems:'flex-start'}} >
            <Image
              styleName="small-avatar"
              source={this.pic}
              style={{width:100, height:100}}
              />
            </Animated.View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',width:500,height:100,backgroundColor: 'skyblue',borderRadius: 50,marginRight:40}}>
          <Text style={styles.mytext}>"{this.state.emotionObject.emotionName}"</Text>
           <TouchableHighlight style={styles.fullWidthButton} onPress = {() => this.navigate('EmotionApi')}>
              <Text style={styles.fullWidthButtonText}>CAPTURE</Text>
            </TouchableHighlight>
          </View>
          <View style={{alignItems:'flex-end'}}>
          <Animated.View
            style={{
              opacity,
              alignItems:'flex-end'}} >
            <Image
              styleName="small-avatar"
              source={this.pic}
              style={{width:100, height:100}}
              />
            </Animated.View>
           </View>
        </View>
      </View>

    );
  }
}

GetEmotion.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  preview: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  textview: { 
    flexDirection:'row',

  },
  mytext: {
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
  },
  fullWidthButtonText: {
    fontSize: 35,
    height:40,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default GetEmotion;
