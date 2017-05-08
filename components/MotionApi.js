import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity

} from 'react-native';

import {

  Tile,
  Title,

} from '@shoutem/ui';

import Camera from 'react-native-camera';
var Config = require('./Config');
import RNFS from 'react-native-fs';
import Popup from 'react-native-popup';
let img1 = require('./imgs/homeicon.png');
global.Buffer = global.Buffer || require('buffer').Buffer;
const timer = require('react-native-timer');


class MotionApi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMsg: false,
      emotion: '' ,
      emotionvalue:0,
      timer:3,
      mylook: '',
      counter:3,
      myvar: 0
    };

    this.setToggleTimeout = this.setToggleTimeout.bind(this);

  }


  setToggleTimeout() {
    /*setTimeout(() => {
      this.setState({animating: !this.state.showMsg, counter:3});
      this.setToggleTimeout();
    }, 5000);
    */

    //this.setState({showMsg: !this.state.showMsg, counter:3});
  }

  componentDidMount() {
    alert(this.state.showMsg);
    this.setState({showMsg: true, counter:3});
    //this.setToggleTimeout();
  }

  componentWillUnmount() {
    //this.setToggleTimeout();
    timer.clearInterval(this);
  }

  myalert() { 
    
    num  = num + 1 ;
    if(this.state.counter == 0 ) {
      
      timer.clearInterval(this);
      this.setState({
        counter : 3,
        showMsg: false, 
      });
      Config.randomEmotion = '';
      this.props.navigator.push({
        id: 'Result',
        myvar: 3 ,
      });

    }else {
    
      this.setState({
        counter : this.state.counter - 1
      });
    }
    
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
 
  onBack() {

    this.props.navigator.push({
      id: 'Home'
    });
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
            
            <Button title="" onPress = {this.onBack.bind(this)}>
            <Image src={img1}/>
            </Button>
            <Tile styleName="text-centric" style={{marginLeft:150,marginBottom:100, marginRight:150, marginTop:0, backgroundColor:'transparent',borderColor:'black'}}>
            <Text style={{top:200,color:'skyblue',borderColor:'black', borderWidth:5,fontWeight: 'bold',fontSize: 50,paddingTop: 20,borderRadius:275,width: 550,height:550,textAlign: 'center'}}></Text>           
          
          </Tile>
          <Tile styleName="text-centric" style={{marginLeft:150,marginBottom:100, marginRight:150, marginTop:0, backgroundColor:'transparent'}}>
            <Title styleName="md-gutter-bottom" style={{color:'skyblue',fontWeight: 'bold',fontSize: 25}}>{Config.randomEmotion.toUpperCase()}</Title>            
          </Tile>

          {this.state.showMsg ? ( 
     
             <Text style={{fontSize: 60,fontWeight: 'bold',color:'skyblue'}}>{this.state.counter}</Text>  
        
        ) : (
          <Text style={{fontSize: 60,fontWeight: 'bold',color:'skyblue'}}>ddddd</Text>
        )}

          <TouchableOpacity onPress={()  => this.takePicture()} style={{backgroundColor:'skyblue',justifyContent:'center', marginLeft:25, width:150, marginTop:10,marginBottom:10, height:60}}>
            <Text style={{marginLeft:30,fontSize: 20,fontWeight: 'bold',}}>Capture</Text>
          </TouchableOpacity>

            
        </Camera>

      </View>
    );
  }

  takePicture() {
 
    this.setState({showMsg: true}, () => timer.setInterval(
      this, 'hideMsg', this.myalert.bind(this), 1000
    ));
    

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

                  switch (Config.index) {
                  case 0:
                    Config.emotionvalue = data[0].scores.anger;
                    Config.emotion = 'Angry';
                    break;
                  case 1:
                    Config.emotionvalue = data[0].scores.contempt;
                    Config.emotion = 'Contempt';
                    break;
                  case 2:
                    Config.emotionvalue = data[0].scores.disgust;
                    Config.emotion = 'Disgust';
                    break;
                  case 3:
                    Config.emotionvalue = data[0].scores.fear;
                    Config.emotion = 'Scared';
                    break;
                  case 4:
                    Config.emotionvalue = data[0].scores.happiness;
                    Config.emotion = 'Happy';
                    break;
                  case 5:
                    Config.emotionvalue = data[0].scores.neutral;
                    Config.emotion = 'Neutral';
                    break;
                  case 6:
                    Config.emotionvalue = data[0].scores.sadness;
                    Config.emotion = 'Sad';
                    break;
                  case 7:
                    Config.emotionvalue = data[0].scores.surprise;
                    Config.emotion = 'Surprise';
                    break;
                  default:

                  }
                  
                  console.log(data);

                  this.props.navigator.push({
                    id: 'Result',
                    myvar: '10',
                  });

                  /*this.setState({
                    counter : 3,
                    showMsg: false, 
                  });*/


                }).catch(function(err) {
                  console.log(err);
                });
            });

      })
      .catch(err => console.error(err));

      
  }

   
}

MotionApi.propTypes = {
  navigator: PropTypes.object,
  title: PropTypes.string.isRequired,
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
    width:140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:25,
    paddingLeft:10,
    paddingRight:10,
    
  },
  buttonText:{
    fontWeight: 'bold',
    fontSize: 25
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',  
  }
  

});

module.exports = MotionApi;