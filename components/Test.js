import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {

  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Title,

  Navigator,
  Animated,
  Easing

} from 'react-native';
import {
  Image,
  Button,


} from '@shoutem/ui';

import Camera from 'react-native-camera';
var img = require('./imgs/myframe.png');
import { getRandomEmotion } from '../config/emotions';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
var Config = require('./Config');


class Test extends Component {

  constructor(props) {
    super(props);
    this.props.myprop = 'dddd';
    this.state = {
      showEmotion: true,
      myobject: getRandomEmotion(),
      emotion: '',
      emotionvalue: 0,
      temp: 3,
      timer: 3,
      mylook: '',
      counter: 3,
      myvar: 0,
      showMap: true,

    };

  }

  componentWillUnmount() {
    alert('finished');
  }

  _onPressOut() {

    this.takePictureInterval = setInterval(() => {

      if (this.state.temp === 0) {

        clearInterval(this.takePictureInterval);
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
                    var key = Config.key;
                    Config.emotionV = data[0].scores.key;
                    //Config.randomEmotion= this.state.myobject.emotionName;
                    this.props.navigator.push({
                      id: 'Result',
                    });

                  })
                  .then(() => {
                    this.setState({
                      showMap: true,
                      temp: 3,
                      myobject: getRandomEmotion()
                    });
                    Config.showMsg = false;

                  })
                  .catch(function (err) {
                    console.log(err);
                  });

              });
          })
          .catch(err => console.error(err));
      } else {
        this.setState({
          temp: --this.state.temp
        });
      }
    }, 1000);
  }

  render() {
    var mytext = Config.showMsg ? (
      <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'skyblue', bottom: 90 }}>{Config.emt}</Text>
    ) : null;

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
          />
          {mytext}

          <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'skyblue', }}>{this.state.temp}</Text>


          <TouchableHighlight onPress={() => this._onPressOut()} style={{ backgroundColor: 'skyblue' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', }}>CAPTURE</Text>
          </TouchableHighlight>
        </Camera>

      </View>
    );
  }
}


Test.propTypes = {
  navigator: PropTypes.object,
  myprop: PropTypes.string,

};


var styles = StyleSheet.create({
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

module.exports = Test;