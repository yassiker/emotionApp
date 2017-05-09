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
import { getRandomEmotion } from '../config/emotions';
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

  constructor() {
    super();
    this.state = {
      showView: true
    };
  }

  removeView() {
    this.setState({
      showView: false
    });
  }

  render() {

    return (
      <View style={styleTypes.selectedOption}>
        <Image
          styleName='large-square'
          source={img1}
          style={styleTypes.backgroundImage}
        >
          <Tile>
            <Title styleName="md-gutter-bottom" style={{ marginBottom: 20, bottom: 150, fontSize: 20, fontWeight: 'bold' }}>EMOTION RECOGNITION</Title>
            <Title styleName="md-gutter-bottom" style={{ marginBottom: 200, bottom: 150, fontSize: 20, fontWeight: 'bold' }}>ANGER, HAPPINESS, SADNESS, AND MORE ...</Title>
            <Button styleName="dark" onPress={this.onButtonPress.bind(this)} style={{ top: 100, width: 130 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>START</Text>
            </Button>
            <Overlay styleName="solid-bright" style={{ top: 120, height: 50 }}>
              <Subtitle styleName="sm-gutter-horizontal" style={{ fontSize: 20, fontWeight: 'bold', }}>TO CHALLEGNE YOUR FACE EMOTION</Subtitle>
            </Overlay>
          </Tile>
        </Image>
        <Popup ref={popup => this.popup = popup} />

      </View>

    );
  }

  onButtonPress() {

    var myemotion = getRandomEmotion();

    //alert('random value is ' + myemotion.emotionName);
    //alert('random value is ' + myemotion.emotionKey);

    //Generate a random emotion value
    //var i = Math.floor((Math.random() * 8) + 1);

    /* switch (i) {
     case 1:
       Config.randomEmotion = 'Angry';
       Config.index = 0;
       break;
     case 2:
       Config.randomEmotion = 'Contempt';
       Config.index = 1;
       break;
     case 3:
       Config.randomEmotion = 'Disgust';
       Config.index = 2;
       break;
     case 4:
       Config.randomEmotion = 'Scared';
       Config.index = 3;
       break;
     case 5:
       Config.randomEmotion = 'Happy';
       Config.index = 4;
       break;
     case 6:
       Config.randomEmotion = 'Neutral';
       Config.index = 5;
       break;
     case 7:
       Config.randomEmotion = 'Sad';
       Config.index = 6;
       break;
     case 8:
       Config.randomEmotion = 'Surprise';
       Config.index = 7;
       break;
     default:
 
     }*/

    this.props.navigator.push({
      id: 'MotionApi',
      passProps:{
        emotionKey: myemotion.emotionKey,
        emotionName: myemotion.emotionName,
        myemotion
      }
      

    });

  }
}


Home.propTypes = {
  navigator: PropTypes.object,
};

const styleTypes = {
  selectedOption: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingTop: 0,

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
};

module.exports = Home;
