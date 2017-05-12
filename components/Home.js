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
let img1 = require('./imgs/backEm.jpg');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showView: true
    };
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
            <Title styleName="md-gutter-bottom" style={{bottom: 200,fontSize: 20, fontWeight: 'bold' }}>EMOTION RECOGNITION</Title>
            <Title styleName="md-gutter-bottom" style={{ bottom: 150, fontSize: 20, fontWeight: 'bold' }}>ANGER, HAPPINESS, SADNESS, AND MORE ...</Title>
            <Button styleName="dark" onPress={this.onButtonPress.bind(this)} style={{marginBottom:100,top: 250, width: 130 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>START</Text>
            </Button>
            <Overlay styleName="solid-bright" style={{ top: 150, height: 50 }}>
              <Subtitle styleName="sm-gutter-horizontal" style={{ paddingTop:5,fontSize: 20, fontWeight: 'bold', }}>TO CHALLEGNE YOUR FACE EMOTIONS</Subtitle>
            </Overlay>
          </Tile>
        </Image>
        <Popup ref={popup => this.popup = popup} />

      </View>

    );
  }

  onButtonPress = () =>  {

    this.props.navigator.push({
      id: 'EmotionApi',

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
