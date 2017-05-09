import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {

  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity

} from 'react-native';

import {

  Tile,
  Title,

} from '@shoutem/ui';

//import MotionConfig from '../config/emotions';

import Camera from 'react-native-camera';
var Config = require('./Config');
import RNFS from 'react-native-fs';
let img1 = require('./imgs/homeS.png');
global.Buffer = global.Buffer || require('buffer').Buffer;
const timer = require('react-native-timer');


class MotionApi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMsg: true,
      emotion: '',
      emotionvalue: 0,
      timer: 3,
      mylook: '',
      counter: 3,
      myvar: 0
    };

  }

  /*myalert() {

    if (this.state.counter === 0) {
      Config.randomEmotion = '';

      this.props.navigator.push({
        id: 'Result',
        passProps: { emotionscore: 15 }
      });

      timer.clearInterval(this);

      this.setState({
        counter: 3,
        showMsg: false,
      });


    } else {

      this.setState({
        counter: this.state.counter - 1
      });
    }

  }*/

  render() {

    return (

      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality.high}
          type={Camera.constants.Type.front}
          captureTarget={Camera.constants.CaptureTarget.disk}>

          <Tile styleName="text-centric" style={{ marginLeft: 150, marginBottom: 100, marginRight: 150, marginTop: 0, backgroundColor: 'transparent', borderColor: 'black' }}>
            <Text style={{ top: 200, color: 'skyblue', borderColor: 'black', borderWidth: 5, fontWeight: 'bold', fontSize: 50, paddingTop: 20, borderRadius: 275, width: 550, height: 550, textAlign: 'center' }}></Text>

          </Tile>
          <Tile styleName="text-centric" style={{ marginLeft: 150, marginBottom: 100, marginRight: 150, marginTop: 0, backgroundColor: 'transparent' }}>
            <Title styleName="md-gutter-bottom" style={{ color: 'skyblue', fontWeight: 'bold', fontSize: 25 }}>{Config.randomEmotion.toUpperCase()}</Title>
          </Tile>

          {this.state.showMsg ? (

            <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'skyblue' }}>{this.state.counter}</Text>

          ) : (
              <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'skyblue' }}></Text>
            )}

          <TouchableOpacity onPress={this.startProcess} style={{ backgroundColor: 'skyblue', justifyContent: 'center', marginLeft: 25, width: 150, marginTop: 10, marginBottom: 10, height: 60 }}>
            <Text style={{ marginLeft: 30, fontSize: 20, fontWeight: 'bold', }}>Capture</Text>
          </TouchableOpacity>

        </Camera>

      </View>
    );
  }

  startProcess = () => {

    this.takePictureInterval = setInterval(() => {
      // counter is at 0, take a picture and send it via API for analyze
      if (this.state.counter === 0) {
        clearInterval(this.takePictureInterval);
        this.takePicture();
      }
      // as long as counter is not 0, show current status to the user
      // so he can smile for the picture
      this.setState({
        counter: --this.state.counter
      });
    }, 1000);

  }

  sendImageToAnalysis = (array) => {

    fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?*', {
      method: 'POST',
      body: array,
      headers: {
        'Ocp-Apim-Subscription-Key': '7bea3b94b4434e118e3715da57d8c17f',
        'Content-Type': 'application/octet-stream'
      },
      credentials: 'same-origin',
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // Here we need to get scores
        // emotions.extractEmotionScore(data[0].scores)
        var myvalue = this.props.emotionKey;
        alert(data[0].scores.anger);
        Config.emotionvalue = data[0].scores.myvalue;
        Config.emotion = this.props.emotionObject.emotionName;

        this.props.navigator.push({
          id: 'Result'

        });

        /*switch (this.props.emotionKey ) {
        case 'anger':
          Config.emotionvalue = data[0].scores.this.props.emotionKey;
          Config.emotion = 'Angry';
          break;
        case 'contempt':
          Config.emotionvalue = data[0].scores.this.props.emotionKey;
          Config.emotion = 'Contempt';
          break;
        case 'Disgust':
          Config.emotionvalue = data[0].scores.this.props.emotionKey;
          Config.emotion = 'Disgust';
          break;
        case 'scared':
          Config.emotionvalue = data[0].scores.fear;
          Config.emotion = 'Scared';
          break;
        case 'happy':
          Config.emotionvalue = data[0].scores.happiness;
          Config.emotion = 'Happy';
          break;
        case 'neutral':
          Config.emotionvalue = data[0].scores.neutral;
          Config.emotion = 'Neutral';
          break;
        case 'sad':
          Config.emotionvalue = data[0].scores.sadness;
          Config.emotion = 'Sad';
          break;
        case 'surprise':
          Config.emotionvalue = data[0].scores.surprise;
          Config.emotion = 'Surprise';
          break;
        default:
        }*/

      }).catch(function (err) {
        console.log(err);
      });
  }

  takePicture() {

    const options = {};
    this.camera.capture([options])
      .then((data) => {
        var myimg = data.path;
        var img = myimg.replace('file:', '');

        Config.myurl = img;
        return RNFS.readFile(img, 'base64')
          .then((file) => {
            file = new Buffer(file);
            if (!global.atob) {
              global.atob = require('base-64').decode;
            }
            let buffer = atob(file);
            var array = new Uint8Array(new ArrayBuffer(buffer.length));

            for (var i = 0; i < buffer.length; i++) {
              array[i] = buffer.charCodeAt(i);
            }

            return this.sendImageToAnalysis(array);
          });
      })
      .catch(err => console.error(err));


  }


}

MotionApi.propTypes = {
  navigator: PropTypes.object,
  emotionObject: PropTypes.object,
  title: PropTypes.string.isRequired,
  emotionKey: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  capture: {
    backgroundColor: 'skyblue',
    marginBottom: 20,
    marginTop: 20,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,

  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }


});

module.exports = MotionApi;