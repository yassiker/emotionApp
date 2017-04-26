import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet

} from 'react-native';

import Camera from 'react-native-camera';
var GLOBAL = require('./globals');
var Index = require('./Index');
import RNFS from 'react-native-fs';
import Popup from 'react-native-popup';
global.Buffer = global.Buffer || require('buffer').Buffer;

class Second extends Component {
  constructor(props){
        super(props);
        this.state = {
          emotion: "",
          emotionvalue:0
        };
    }


    showAlert(){

      this.props.navigator.push({
        id: 'First'
      });
      //alert(GLOBAL.emotion);
      //alert(GLOBAL.emotionvalue);
      /*this.setState({emotion : , emotionvalue: }, function () {
        alert("You are " + this.state.emotion + " " + this.state.emotionvalue);

      });*/

    }

    onButtonPress(){
      this.props.navigator.push({
        id: 'Second'
      });
    }

  render() {
    return (

      <View style={styles.container}>

      <TouchableHighlight onPress={this.onButtonPress.bind(this)} style={{
              flexDirection: 'row',
              backgroundColor: 'skyblue',
              marginTop:100,
              minHeight: 40,
              width:300,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20}}>
        <Text style={styles.buttonText}> Player 1
        </Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={this.onButtonPress.bind(this)} style={{
              flexDirection: 'row',
              backgroundColor: 'skyblue',
              backgroundColor: 'skyblue',
              marginBottom: 50,
              marginLeft:400,
              minHeight: 40,
              width:300,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20}}>
        <Text style={styles.buttonText}> Player 2
        </Text>
      </TouchableHighlight>

        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality.high}
          type={Camera.constants.Type.front}
          captureTarget={Camera.constants.CaptureTarget.disk}>


          <TouchableHighlight style ={styles.capture} onPress={this.takePicture.bind(this)}>
            <Text style={styles.buttonText}> Capture
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style ={styles.quit} onPress={this.showAlert.bind(this)}>
            <Text style={styles.buttonText}> Home
            </Text>
          </TouchableHighlight>

          <Popup style={styles.mypopup} ref={popup => this.popup = popup }/>
        </Camera>

      </View>
    );
  }

  takePicture() {
    const options = {};
    this.camera.capture([options])
      .then((data) => {
        myimg = data.path;
        var img = myimg.replace('file:', '');
        RNFS.readFile(img, 'base64')
            .then((file) => {
              file = new Buffer(file);
              if (!global.atob) {
                global.atob = require('base-64').decode;
              }
              let buffer = atob(file);
              var array = new Uint8Array(new ArrayBuffer(buffer.length));

              for (i = 0; i < buffer.length; i++) {
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
                return response.json() })
              .then(function(responseData){
                return responseData; })
                .then((data) => {

                  var arrtemp = [];
                  for (var i = 0; i < 8; i++) {
                      switch (i) {
                        case 0:
                          arrtemp[i] = data[0].scores.anger;
                          break;
                          case 1:
                            arrtemp[i] = data[0].scores.contempt;
                            break;
                            case 2:
                              arrtemp[i] = data[0].scores.disgust;
                              break;
                              case 3:
                                arrtemp[i] = data[0].scores.fear;
                                break;
                                case 4:
                                  arrtemp[i] = data[0].scores.happiness;
                                  break;
                                  case 5:
                                    arrtemp[i] = data[0].scores.neutral;
                                    break;
                                    case 6:
                                      arrtemp[i] = data[0].scores.sadness;
                                      break;
                                      case 7:
                                        arrtemp[i] = data[0].scores.surprise;
                                        break;
                        default:

                      }
                  }


                  console.log(arrtemp);
                  var ind = myindex(arrtemp);
                  //alert('max index is '+ ind);

                  switch (ind) {
                    case 0:
                      GLOBAL.emotion = "Angry";
                      GLOBAL.emotionvalue = arrtemp[0];
                      break;
                      case 1:
                        GLOBAL.emotion = "Contempt";
                        GLOBAL.emotionvalue = arrtemp[1];
                        break;
                        case 2:
                          GLOBAL.emotion = "Disgust";
                          GLOBAL.emotionvalue = arrtemp[2];
                          break;
                          case 3:
                            GLOBAL.emotion = "Fear";
                            GLOBAL.emotionvalue = arrtemp[3];
                            break;
                            case 4:
                              GLOBAL.emotion = "Happy";
                              GLOBAL.emotionvalue = arrtemp[4];
                              break;
                              case 5:
                                GLOBAL.emotion = "Neutral";
                                GLOBAL.emotionvalue = arrtemp[5];
                                break;
                                case 6:
                                  GLOBAL.emotion = "Sad";
                                  GLOBAL.emotionvalue = arrtemp[6];
                                  break;
                                  case 7:
                                    GLOBAL.emotion = "Surprise";
                                    GLOBAL.emotionvalue = arrtemp[7];
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

                  /*this.setState({
                      emotion: GLOBAL.emotion,
                      emotionvalue: GLOBAL.emotionvalue

                  });*/



                  this.setState({emotion: GLOBAL.emotion , emotionvalue: GLOBAL.emotionvalue }, function () {
                    this.popup.tip({
                          title: 'Emotion',
                          content: ['You are ' + this.state.emotionvalue*100 + '%' , this.state.emotion],
                      });

                  });



                 }).catch(function(err) {
                    console.log(err);
                })
          })

      })
      .then((data) => this.props.navigator.push({
        id: 'Second'
        }))
      .catch(err => console.error(err));

  }

}

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
    minHeight: 40,
    width:200,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  button1: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    height: 40,
    width: 40
  },

  button2: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    height: 40,
    width: 40
  },
  quit: {
    backgroundColor: 'red',
    marginBottom: 50,
    marginTop:50,
    minHeight: 40,
    width:200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20

  },
});

module.exports = Second;
