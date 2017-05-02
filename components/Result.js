import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes } from 'prop-types';

import {
  View,
  Button,
  Text,
  NavigationBar,
  Title,
  Icon,
  Card,
  Tile,
  Image,
  Subtitle,
  Caption,
  Divider,
  Screen,
  DropDownMenu 
} from '@shoutem/ui';

var Config = require('./Config');
let img1 = require('./imgs/image-2.png');
class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emotions: [
        { title: 'Other Results' , value: '' },
        { title: 'Contempt ', value: Config.mydata[1] },
        { title: 'Disgust' , value: Config.mydata[2] },
        { title: 'Fear'   , value: Config.mydata[3] },
        { title: 'Happiness', value: Config.mydata[4] },
        { title: 'Neutral'   , value: Config.mydata[5] },
        { title: 'Sadness', value: Config.mydata[6] },
        { title: 'Surprise', value: Config.mydata[7] }
    
      ],
    };
  }

  render() {

    return (
        
      <View style={styleTypes.selectedOption}>
        <NavigationBar
        leftComponent={<Button onPress={this.onBackPress.bind(this)} >
            <Icon name="back" />
            </Button>}
        centerComponent={<Title>RESULTS</Title>}
        rightComponent={(
            <Button styleName='clear' onPress={this.onHomePress.bind(this)}>
            <Text>Home</Text>
            </Button>
        )}
        />

        <Tile style={{top:60}}>
        <Image
            styleName="large-banner"
            source={img1}
        />
        <View styleName="content">
            <Title >YOU LOOK ' ' {Config.emotion} BY {Config.emotionvalue}</Title>
            <View styleName="horizontal space-between">
            </View>
        </View>
        </Tile>
        <Divider styleName="line" />
 
        <Screen style={{top:60, height:150}}>
        <DropDownMenu
          styleName="horizontal"
          options={this.state.emotions}
          selectedOption={this.state.selectedEmotion ? this.state.selectedEmotion : this.state.emotions[0]}
          onOptionSelected={(emotion) => this.setState({ selectedEmotion: emotion })}
          titleProperty="title"
          valueProperty="value"
        />
        <Text>{this.state.selectedEmotion ? this.state.selectedEmotion.value : this.state.emotions[0].value}</Text>
        </Screen>
        
      </View>

    );
  }

  onButtonPress() {

    //Alert.alert('Emotion Value : '+ Config.emotionvalue);
    this.props.navigator.push({
      id: 'Emotions'
    });

  }

  onHomePress() {

    //Alert.alert('Emotion Value : '+ Config.emotionvalue);
    this.props.navigator.push({
      id: 'Home'
    });

  }

  onBackPress() {

    //Alert.alert('Emotion Value : '+ Config.emotionvalue);
    this.props.navigator.push({
      id: 'Emotions'
    });

  }
}


Result.propTypes = {
  navigator: PropTypes.object
};

const styleTypes = {
  selectedOption: {
    flex: 1,
  }

};

module.exports = Result;
