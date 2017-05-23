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
      this.refs.Load.setTimeClose(2000);
    }
  }

  _counter = () => {
    this.takePictureInterval = setInterval(() => this._counting(), 1000);
  }

  _createimage = (data) => {
    var myimg = data.path;
    var img = myimg.replace('file:', '');
    Config.myurl = img;
    return RNFS.readFile(img, 'base64');
  }

  _transformimage = (file) => {
    file = new Buffer(file);
    if (!global.atob) {
      global.atob = require('base-64').decode;
    }
    let buffer = atob(file);
    //RNFS.unlink(file);
    var array = new Uint8Array(new ArrayBuffer(buffer.length))
      .map((x, i) => buffer.charCodeAt(i));
      // Memory leak
    return this._sendimagetoApi(array);
  }

  _sendimagetoApi = (array) => {
    return fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?*', {
      method: 'POST',
      body: array,
      headers: {
        'Ocp-Apim-Subscription-Key': '7bea3b94b4434e118e3715da57d8c17f',
        'Content-Type': 'application/octet-stream'
      },
      credentials: 'same-origin',
    });
  }

  _navigatetoResult = (data) =>{
    console.log(data);
    this.setState({
      showCounter: false,
      temp: 3
    }, this.props.navigator.push({
      name: 'MyResult',
      data: { name: this.props.data.emotionName , value: data[0].scores[this.props.data.emotionKey] }
    })
    );
  }  

  _takephoto = () => {
    this.setState({
      showCounter: false,
      temp: 3
    });
    const options = {};
    this.camera.capture([options])
      .then(this._createimage)
      .then(this._transformimage)
      .then(function (response) {
        console.log(response.json);
        return response.json();
      })    
      .then((data) => {
        this._navigatetoResult(data);
      })
      .catch(function (err) {
        console.log(err);
      });         
  }

  _counting = () => {
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
            <View style={styles.counterstyle}>
              <Text style={styles.counter} >{this.state.temp}</Text>
            </View>
          ) : <View style={styles.loading}>
              <Text style={styles.counter} >Loading...</Text>
            </View>
        }
        <Load ref="Load"></Load>
      </View>
    );
  }
}

EmotionApi.propTypes = {
  navigator: PropTypes.object,
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
  counterstyle : {
    alignItems: 'center', 
    height: 100, 
    justifyContent: 'center'
  },
  loading: {
    alignItems: 'center', 
    height: 100, 
    justifyContent: 'center'
  },
  counter: {
    fontSize: 60,
    textAlign: 'center',
    zIndex: 1,
    color: 'black'
  },
});

export default EmotionApi;
