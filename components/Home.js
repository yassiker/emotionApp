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
//import { getRandomEmotion } from '../config/emotions';
let img1 = require('./imgs/backEm.jpg');

class Home extends Component {

  constructor(props) {
    super(props);
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

    this.props.navigator.push({
      id: 'Test',

    });
    
  }
}


Home.propTypes = {
  navigator: PropTypes.object,
  emotionObj: PropTypes.object,
  myemotion: PropTypes.object,
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
