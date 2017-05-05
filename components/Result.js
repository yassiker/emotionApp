import React, { Component } from 'react';

import { PropTypes } from 'prop-types';

import {
  View,
  Button,
  Text,
  NavigationBar,
  Title,
  Icon,
  Tile,
  Image,
  Heading,
  Caption 
} from '@shoutem/ui';

var Config = require('./Config');
var MotionApi = require('./Config');
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
      emotions: [
        { title: Config.emotionArray[0] , value: Config.mydata[0] },
        { title: Config.emotionArray[1] , value: Config.mydata[1] },
        { title: Config.emotionArray[2] , value: Config.mydata[2] },
        { title: Config.emotionArray[3] , value: Config.mydata[3] },
        { title: Config.emotionArray[4] , value: Config.mydata[4] },
        { title: Config.emotionArray[5] , value: Config.mydata[5] },
        { title: Config.emotionArray[6] , value: Config.mydata[6] },
        { title: Config.emotionArray[7] , value: Config.mydata[7] }
      ],

    };

  }

  render() {

    return (
        
      <View>
        <NavigationBar
        leftComponent={<Button onPress={this.onBackPress.bind(this)} >
            <Icon name="back" />
            </Button>}
        centerComponent={<Title>RESULT</Title>}
        rightComponent={(
            <Button styleName='clear' onPress={this.onHomePress.bind(this)}>
            <Text>Home</Text>
            </Button>
        )}
        />

        <Tile style={{top:60}}>
        <Image
            styleName="large-portrait"
            source={{uri:Config.myurl}}
        >
        <Tile>
          <Title>YOUR FACE EMOTION INDICATES THAT YOU LOOK</Title>
          <Heading>{Config.emotion} BY</Heading>
          <Heading>{(Config.emotionvalue*100).toFixed(2)}%</Heading>
          <Button styleName="md-gutter-top" onPress={this.onBackPress.bind(this)}>
            <Icon name="refresh"/>
            <Text>TRY AGAIN</Text>
          </Button>
          <Button styleName="md-gutter-top" onPress={this.onHistoryPress.bind(this)}>
            <Icon name="sidebar"/>
            <Text>{'  '} HISTORY</Text>
          </Button>
        </Tile>
      </Image>
 
        </Tile>
        
      </View>

    );
  }

  onCamPress() {

    this.props.navigator.push({
      id: 'MotionApi'
    });

  }
 
  onHistoryPress() {

    this.props.navigator.push({
      id: 'History'
    });

  }

  onHomePress() {

    this.props.navigator.push({
      id: 'Home'
    });

  }

  onBackPress() {
    Config.mytimer = 3;
    // randomly generating an emotion and coresponding icon
    Config.emotionvalue = 0;
    Config.emotion = '';
    Config.emotURL = '',
    Config.myurl = '';
    // this.MotionApi.hellome.bind(this);
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
  navigator: PropTypes.object
};



module.exports = Result;

