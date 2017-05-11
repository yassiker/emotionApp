import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {

  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Title,
  Image,
  Navigator

} from 'react-native';
import Camera from 'react-native-camera';
var img = require('./imgs/myframe.png');
import { getRandomEmotion } from '../config/emotions';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
var Config = require('./Config');


class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showEmotion: true,
      myobject : getRandomEmotion(),
      showMsg: false,
      emotion: '',
      emotionvalue: 0,
      temp: 3,
      timer: 3,
      mylook: '',
      counter: 3,
      myvar: 0,
    };

  }


  _onPressOut() {

    this.takePictureInterval = setInterval(() => {

      if (this.state.temp === 0) {
        
        clearInterval(this.takePictureInterval);  
        this.props.navigator.push({
          id : 'Result',
                //data: this.state.myobject,         
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
              Config.emotionV = data[0].scores.anger;
              var msg = data[0].scores.anger;
              alert(msg);
              
            })
            .then(() => {
              this.props.navigator.push({
                id : 'Result',
                //data: this.state.myobject,         
              });
            })
            .catch(function (err) {
              console.log(err);
            });

            

          });
      })
      .catch(err => console.error(err));
      }else {
        this.setState({
          temp: --this.state.temp
        });
      }
    }, 1000);
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
            />
            
          <TouchableHighlight style={ styles.button } onPress={ () => this._onPressOut() }>
            <Text>Push</Text>
        </TouchableHighlight>
        <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'skyblue', bottom: 50 }}>{this.state.myobject.emotionName}</Text>
            <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'skyblue', bottom: 50 }}>{this.state.temp}</Text>
        
        </Camera>
      
      </View>
    );
  }
}


Test.propTypes = {
  navigator : PropTypes.object,
  data: PropTypes.object,
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',


  },
  button: {
    height:60,
    backgroundColor: '#ededed',
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

module.exports = Test;