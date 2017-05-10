import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {

  Text,
  View,
  StyleSheet,
  TouchableOpacity

} from 'react-native';

import {

  Title,
  Image

} from '@shoutem/ui';

import { Buffer } from 'buffer';
import Camera from 'react-native-camera';
var Config = require('./Config');
import { getRandomEmotion } from '../config/emotions';
import RNFS from 'react-native-fs';
var img = require('./imgs/myframe.png');
//global.Buffer = global.Buffer || require('buffer').Buffer;



class MotionApi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showEmotion: true,
      showMsg: false,
      emotion: '',
      emotionvalue: 0,
      timer: 3,
      mylook: '',
      counter: 3,
      myvar: 0,
      myobject: getRandomEmotion()
    };

  }

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
          <Image
            styleName="large-square"
            source={img}
            style={{ bottom: 150 }}
          />

          {this.state.showEmotion ? (
            <Title styleName="md-gutter-bottom" style={{ color: 'skyblue', fontWeight: 'bold', fontSize: 25, left: 5 }}>{this.props.myemotion.emotionKey}</Title>
          ) : (
              <Title styleName="md-gutter-bottom" style={{ color: 'skyblue', fontWeight: 'bold', fontSize: 25, left: 5 }}></Title>
            )

          }


          {this.state.showMsg ? (
            <View>

              <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'skyblue', left: 5 }}>{this.state.counter}</Text>
            </View>
          ) : (
              null
            )}

          <TouchableOpacity onPress={this.startProcess} style={{ backgroundColor: 'skyblue', justifyContent: 'center', marginLeft: 25, width: 150, marginTop: 10, marginBottom: 10, height: 60 }}>
            <Text style={{ marginLeft: 30, fontSize: 20, fontWeight: 'bold', }}>Capture</Text>
          </TouchableOpacity>

        </Camera>

      </View>
    );
  }

  navigate() {
    this.props.navigator.replace({
      id: 'Result',
      passProps:{
        emotionscore : this.state.emotionvalue
      }
    });
  }
  startProcess = async () => {

    this.props.myemotion = getRandomEmotion();
    this.setState({
      showMsg: true,
      myobject: this.props.myemotion,
    });
    this.takePictureInterval = setInterval(() => {
      if (this.state.counter === 0) {
        //this.props.myemotion.emotionKey = null;
        clearInterval(this.takePictureInterval);
        
        this.takePicture();
        //Calling an new component
        this.navigate();
       

        this.setState({
          counter: 3,
          showEmotion: false,
          myobject: getRandomEmotion(),
        });

      } else {
        this.setState({
          counter: --this.state.counter
        });
      }

    }, 1000);

  }

  sendImageToAnalysis =  (array) => {

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
        Config.emotionV = data[0].scores.this.props.myemotion.emotionKey;
        var retValue = this.props.myemotion.extractEmotionScore(data[0].scores);
        //Config.emotionvalue = retValue;
        alert('value is  ' + Config.emotionV);

        this.setState({
          emotionvalue : retValue
        });
   
        
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
  myemotion: PropTypes.object,
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
    justifyContent: 'center',
    alignItems: 'center'
  },

});

module.exports = MotionApi;