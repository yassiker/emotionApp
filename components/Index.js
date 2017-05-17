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

import { getRandomEmotion } from '../config/emotions';
let img1 = require('./imgs/backEm.jpg');

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emotionName : getRandomEmotion().emotionName,
    };
    this.navigate = this.navigate.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      emotionName: getRandomEmotion().emotionName
    });

  }

  navigate = (name) => {
    this.props.navigator.push({
      name,
      data: this.state.emotionName
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
            <Title styleName="md-gutter-bottom" style={{paddingTop:15,bottom: 200,fontSize: 40, fontWeight: 'bold' }}>EMOTION RECOGNITION</Title>
            <Title styleName="md-gutter-bottom" style={{ paddingTop:15,bottom: 150, fontSize: 35, fontWeight: 'bold' }}>ANGER, HAPPINESS, SADNESS </Title>
             <Title styleName="md-gutter-bottom" style={{ paddingTop:15,bottom: 150, fontSize: 35, fontWeight: 'bold' }}>AND MORE ...</Title>
            <Button styleName="dark" onPress = {() => this.navigate('GetEmotion')} style={{marginBottom:100,top: 250, width: 130 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>START</Text>
            </Button>
            <Overlay styleName="solid-bright" style={{ top: 170, height: 100 }}>
              <Subtitle styleName="sm-gutter-horizontal" style={{ paddingTop:15,fontSize: 25, fontWeight: 'bold', }}>TO CHALLEGNE YOUR FACE EMOTIONS</Subtitle>
            </Overlay>
          </Tile>
        </Image>

      </View>
    );
  }
}

Index.propTypes = {
  navigator: PropTypes.object,
  myobject: PropTypes.object,
  data : PropTypes.string,
};



const styleTypes = {
  selectedOption: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
};

export default Index;
