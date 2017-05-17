import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Camera from 'react-native-camera';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
import Load from 'react-native-loading-gif';
var Config = require('./Config');

class EmotionApi extends Component {

  constructor() {
    super();
    this.state = {
      temp: 3,
      showCounter: true,
    };
  }

  componentDidMount() {
    this._counter();
  }

  componentDidUpdate() {
    if (this.state.temp === 0) {
      this.refs.Load.setTimeClose(3000);
    }
  }

  _counter = () => {
    this.takePictureInterval = setInterval(() => this._Counting(), 1000);
  }

  _takephoto = () => {

    this.setState({
      showCounter: false,
      temp: 3
    });

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
                Config.emotionValue = data[0].scores[this.props.data.emotionKey];
                Config.randomEmotion = this.props.data.emotionName;
                this.setState({
                  showCounter: false,
                  temp: 3
                }, this.props.navigator.push({
                  name: 'MyResult'
                })
                );

              })
              .catch(function (err) {
                console.log(err);
              });

          })
          .catch(err => console.error(err));
      });
  }

  _Counting = () => {
    if (this.state.temp === 0) {
      this._takephoto();
      clearInterval(this.takePictureInterval);
    } else {
      this.setState({
        temp: --this.state.temp
      });
    }
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
          captureTarget={Camera.constants.CaptureTarget.disk}
        >
         
        </Camera>
        {
          this.state.showCounter ? (
            <View style={{ alignItems: 'center', height: 85, justifyContent: 'center', }}>
              <Text style={styles.counter} >{this.state.temp}</Text>
            </View>
          ) : <View style={{ alignItems: 'center', height: 85, justifyContent: 'center', }}>
              <Text style={styles.counter} >Loading...</Text>
            </View>
        }
        <Load style={{ marginTop: 100, backgroundColor: 'black' }} ref="Load"></Load>
      </View>
    );
  }

}

EmotionApi.propTypes = {
  navigator: PropTypes.object,
  emotionObject: PropTypes.object,
  mycounter: PropTypes.number,
  data: PropTypes.object

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'skyblue'
  },

  preview: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

  },
  counter: {
    fontSize: 60,
    textAlign: 'center',
    zIndex: 1,
    top: 10,
    color: 'black'
  },


});
export default EmotionApi;
