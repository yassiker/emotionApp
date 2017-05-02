import React, { Component } from 'react';
import {
  Dimensions
} from 'react-native';
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

  render() {
    //var {height, width} = Dimensions.get('window');
   
    return (
      <View style={styleTypes.selectedOption}>
      <Image
        styleName='large-square'
        source={img1}
        style={styleTypes.backgroundImage}
      >
        <Tile>
          <Title styleName="md-gutter-bottom" style={{marginBottom:20, bottom:60}}>EMOTION RECOGNITION</Title>
          <Title styleName="md-gutter-bottom" style={{marginBottom:200, bottom:60}}>ANGER, HAPPINESS, SADNAESS, AND MORE ...</Title>
          <Button styleName="dark" onPress={this.onButtonPress.bind(this)} style={{top:20}}>
          <Text>START</Text>
          </Button>
          <Overlay styleName="solid-bright" style={{top:20}}>
            <Subtitle styleName="sm-gutter-horizontal">TO CHALLEGNE YOUR FACE EMOTION</Subtitle>
          </Overlay>
        </Tile>
      </Image>
      
       <Popup ref={popup => this.popup = popup }/>

      </View>

    );
  }
  onButtonPress() {

    this.props.navigator.push({
      id: 'Emotions'
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
    resizeMode: 'cover', // or 'stretch'
  }
};

module.exports = Home;
