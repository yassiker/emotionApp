import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,

} from 'react-native';

import {

  Tile,
  Title,
  Overlay,
  Subtitle

} from '@shoutem/ui';

import Camera from 'react-native-camera';
var Config = require('./Config');
import RNFS from 'react-native-fs';
import Popup from 'react-native-popup';
global.Buffer = global.Buffer || require('buffer').Buffer;

class Api extends Component {
  constructor(props) {
    super(props);
    let myvar;
    
    
    this.state = {
      emotion: '' ,
      emotionvalue:0,
      timer:5,
      mylook: '',
      myvar: 0
    };
    

    /*this.setState(myvar, function() {
     
      this.myvar =  Math.floor(Math.random() * (7 - 1)) + 1;
    
    });*/
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  onButtonPress() {
    return 'yassine';
        
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

          <Tile styleName="text-centric" style={{marginLeft:60, top:270,marginBottom:300, width:250}}>
          <Title styleName="md-gutter-bottom">TRY TO LOOK</Title>
          <Title styleName="md-gutter-bottom">{Config.randomEmotion}</Title>
          <Overlay styleName="solid-dark" style={{borderRadius:25, width:50, height:50,shadowColor:'black', shadowOpacity:0, shadowRadius:25,shadowOffset:{width: 0, height: 40}}}>
            <Subtitle styleName="sm-gutter-horizontal">{this.state.timer}</Subtitle>
          </Overlay>
          </Tile>
           <View >
          </View>
          <TouchableHighlight style ={styles.capture} onPress={this.takePicture.bind(this)}>
            <Text style={styles.buttonText}> Start
            </Text>
          </TouchableHighlight>

          <Popup style={styles.mypopup} ref={popup => this.popup = popup }/>
        </Camera>

      </View>
    );
  }

  takePicture() {

     
    setTimeout( () => {
      if(this.state.timer == 0) {
        
        //Inser here ------------------
        const options = {};
        this.camera.capture([options])
      .then((data) => {
        var myimg = data.path;
        var img = myimg.replace('file:', '');
        Config.myurl = img;
        RNFS.readFile(img, 'base64')
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
              .then(function(response) {
                return response.json(); })
              .then(function(responseData) {
                return responseData; })
                .then((data) => {

                  var arrtemp = [];
                  for (var i = 0; i < 8; i++) {
                    switch (i) {
                    case 0:
                      arrtemp[i] = data[0].scores.anger;
                      Config.mydata[i] = data[0].scores.anger;
                      Config.emotionArray[i] = 'Angry';
                      break;
                    case 1:
                      arrtemp[i] = data[0].scores.contempt;
                      Config.mydata[i] = data[0].scores.contempt;
                      Config.emotionArray[i] = 'Contempt';
                      break;
                    case 2:
                      arrtemp[i] = data[0].scores.disgust;
                      Config.mydata[i] = data[0].scores.contempt;
                      Config.emotionArray[i] = 'Disgust';
                      break;
                    case 3:
                      arrtemp[i] = data[0].scores.fear;
                      Config.mydata[i] = data[0].scores.contempt;
                      Config.emotionArray[i] = 'Fear';
                      break;
                    case 4:
                      arrtemp[i] = data[0].scores.happiness;
                      Config.mydata[i] = data[0].scores.contempt;
                      Config.emotionArray[i] = 'Happiness';
                      break;
                    case 5:
                      arrtemp[i] = data[0].scores.neutral;
                      Config.mydata[i] = data[0].scores.contempt;
                      Config.emotionArray[i] = 'Neutral';
                      break;
                    case 6:
                      arrtemp[i] = data[0].scores.sadness;
                      Config.mydata[i] = data[0].scores.contempt;
                      Config.emotionArray[i] = 'Sad';
                      break;
                    case 7:
                      arrtemp[i] = data[0].scores.surprise;
                      Config.mydata[i] = data[0].scores.contempt;
                      Config.emotionArray[i] = 'Surprise';
                      break;
                    default:

                    }
                  }

                  var mexIndex = myindex(arrtemp);
               
                  switch (mexIndex) {
                  case 0:
                    Config.emotion = 'Angry';
                    Config.emotionvalue = arrtemp[0];
                    break;
                  case 1:
                    Config.emotion = 'Contempt';
                    Config.emotionvalue = arrtemp[1];
                    break;
                  case 2:
                    Config.emotion = 'Disgust';
                    Config.emotionvalue = arrtemp[2];
                    break;
                  case 3:
                    Config.emotion = 'Fear';
                    Config.emotionvalue = arrtemp[3];
                    break;
                  case 4:
                    Config.emotion = 'Happy';
                    Config.emotionvalue = arrtemp[4];
                    break;
                  case 5:
                    Config.emotion = 'Neutral';
                    Config.emotionvalue = arrtemp[5];
                    break;
                  case 6:
                    Config.emotion = 'Sad';
                    Config.emotionvalue = arrtemp[6];
                    break;
                  case 7:
                    Config.emotion = 'Surprise';
                    Config.emotionvalue = arrtemp[7];
                    break;
                  default:

                  }

                  function myindex(arrtemp) {
                    if (arrtemp.length === 0) {
                      return -1;
                    }

                    var max = arrtemp[0];
                    var maxIndex = 0;

                    for (var i = 1; i < arrtemp.length; i++) {
                      if (arrtemp[i] > max) {
                        maxIndex = i;
                        max = arrtemp[i];
                      }
                    }
                    return maxIndex;
                  }
                  
                  this.setState({emotion: Config.emotion , emotionvalue: Config.emotionvalue }, function () {
                    this.popup.tip({
                      title: 'Emotion',
                      content: ['You are ' + this.state.emotionvalue*100 + '%' , this.state.emotion],
                    });

                  });

                }).catch(function(err) {
                  console.log(err);
                });
            });

      })
      .then(() => this.props.navigator.push({
        id: 'Result'
      }))
      .catch(err => console.error(err));

        // Stops here -----------------


      }else {
        //alert('Im right');
        this.setState({
          timer : this.state.timer - 1
        });
        this.takePicture();
      }
      
    },1000);

    
  }

}

Api.propTypes = {
  navigator: PropTypes.object
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
    marginBottom: 0,
    marginTop:100,
    height: 40,
    width:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  

});

module.exports = Api;