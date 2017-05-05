import React, { Component } from 'react';

import { PropTypes } from 'prop-types';

import {
  Image,
  Title,
  Tile,
  Button,
  Subtitle,
  Overlay, 
  Text,
  View 

} from '@shoutem/ui';

import Popup from 'react-native-popup';
var Config = require('./Config');
let img1 = require('./imgs/backEm.jpg');
let contempt = require('./imgs/emojs/contempt.jpeg');
let fear = require('./imgs/emojs/fear.jpeg');
let happy = require('./imgs/emojs/happy.jpeg');
let neutral = require('./imgs/emojs/neutral.jpeg');
let surprise = require('./imgs/emojs/surprise.jpeg');
let sad = require('./imgs/emojs/sad.jpeg');
let angry = require('./imgs/emojs/angry.jpeg');
let disgust = require('./imgs/emojs/disgust.jpeg');

class Home extends Component {

  render() {
      
    return (
      <View style={styleTypes.selectedOption}>
        <Image
          styleName='large-square'
          source={img1}
          style={styleTypes.backgroundImage}
        >
          <Tile>
            <Title styleName="md-gutter-bottom" style={{marginBottom:20, bottom:150,fontSize: 20,fontWeight: 'bold'}}>EMOTION RECOGNITION</Title>
            <Title styleName="md-gutter-bottom" style={{marginBottom:200, bottom:150,fontSize: 20,fontWeight: 'bold'}}>ANGER, HAPPINESS, SADNESS, AND MORE ...</Title>
            <Button styleName="dark" onPress={this.onButtonPress.bind(this)} style={{top:100,width:130}}>
            <Text style={{fontSize: 20,fontWeight: 'bold',}}>START</Text>
            </Button>
            <Overlay styleName="solid-bright" style={{top:120,height:50}}>
              <Subtitle styleName="sm-gutter-horizontal" style={{fontSize: 20,fontWeight: 'bold',}}>TO CHALLEGNE YOUR FACE EMOTION</Subtitle>
            </Overlay>
          </Tile>
        </Image>
        <Popup ref={popup => this.popup = popup }/>
       
      </View>

    );
  }

  onButtonPress() {
    var i = Math.floor((Math.random() * 8) + 1);
    
    /*Config.randomEmotion = 'Neutral';
    Config.emotURL = neutral;
    Config.index = 5;*/

    switch (i) {
    case 1:
      Config.randomEmotion = 'Angry';
      Config.emotURL = angry;
      Config.index = 0;
      break;
    case 2:
      Config.randomEmotion = 'Contempt';
      Config.emotURL = contempt;
      Config.index = 1;
      break;
    case 3:
      Config.randomEmotion = 'Disgust';
      Config.emotURL = disgust;
      Config.index = 2;
      break;
    case 4:
      Config.randomEmotion = 'Scared';
      Config.emotURL = fear;
      Config.index = 3;
      break;
    case 5:
      Config.randomEmotion = 'Happy';
      Config.emotURL = happy;
      Config.index = 4;
      break;
    case 6:
      Config.randomEmotion = 'Neutral';
      Config.emotURL = neutral;
      Config.index = 5;
      break;
    case 7:
      Config.randomEmotion = 'Sad';
      Config.emotURL = sad;
      Config.index = 6;
      break;
    case 8:
      Config.randomEmotion = 'Surprise';
      Config.emotURL = surprise;
      Config.index = 7;
      break;
    default:

    }
  
    //alert('index is :' + Config.index);         
    //Config.randomVal = 8;
    this.props.navigator.push({
      id: 'MotionApi',
      
    });

  }
}


Home.propTypes = {
  navigator: PropTypes.object
};

const styleTypes = {
  selectedOption: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'skyblue',
    paddingTop: 0,
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',  
  }
};

module.exports = Home;
