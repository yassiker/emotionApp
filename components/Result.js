import React, { Component } from 'react';

import { PropTypes } from 'prop-types';

import {
  View,
  Button,
  Text,
  Title,
  Icon,
  Tile,
  Image,
  Heading,

} from '@shoutem/ui';

var Config = require('./Config');
let contempt = require('./imgs/emojs/contempt.jpeg');
let fear = require('./imgs/emojs/fear.jpeg');
let happy = require('./imgs/emojs/happy.jpeg');
let neutral = require('./imgs/emojs/neutral.jpeg');
let surprise = require('./imgs/emojs/surprise.jpeg');
let sad = require('./imgs/emojs/sad.jpeg');
let angry = require('./imgs/emojs/angry.jpeg');
let disgust = require('./imgs/emojs/disgust.jpeg');


class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'result',
    };

  }

  render() {

    return (
        
      <View>
        <Tile >
        <Image
            styleName="large-portrait"
            source={{uri:Config.myurl}}
        >
        <Tile>
          <Title>YOUR Are</Title>
          <Heading>{(Config.emotionvalue*100)}%</Heading>
          <Heading>{Config.emotion} </Heading>
          <Button styleName="md-gutter-top" onPress={this.onBackPress.bind(this)}>
            <Icon name="refresh"/>
            <Text>Next</Text>
          </Button>
         
        </Tile>
      </Image>
 
        </Tile>
        
      </View>

    );
  }

  onHomePress() {
    
    this.props.navigator.push({
      id: 'Home'
    });

  }

  onBackPress() {

    Config.emotionvalue = 0;
    Config.emotion = '';
    Config.emotURL = '',
    Config.myurl = '';
    Config.historyCnt = 3;
    var i = Math.floor((Math.random() * 8) + 1);

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
    this.props.navigator.push({
      id: 'MotionApi' 
    });

  }
}


Result.propTypes = {
  navigator: PropTypes.object,
  myvar: PropTypes.string,
};



module.exports = Result;

