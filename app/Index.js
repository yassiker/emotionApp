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

import {
  Animated,
  Easing
} from 'react-native';

let img1 = require('./assets/imgs/backimage1.jpg');

class Index extends Component {

  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
  }

  navigate = (name) => {
    this.props.navigator.push({
      name
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
            <Title style={{bottom:100,fontSize: 15,fontWeight: 'bold'}}>EMOTION RECOGNITION</Title>
            <Title styleName="md-gutter-bottom" style={{bottom:100,fontSize: 15,fontWeight: 'bold'}}>ANGER, HAPPINESS, SADNESS </Title>
             <Title styleName="md-gutter-bottom" style={{bottom:100,fontSize: 15,fontWeight: 'bold'}}>AND MORE ...</Title>
            <Button styleName="dark" onPress = {() => this.navigate('GetEmotion')} style={{marginBottom:100,top: 140, width: 100 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', }}>START</Text>
            </Button>
            
            <Overlay styleName="solid-bright" style={{ top:50,height: 30 }}>
              <Subtitle styleName="sm-gutter-horizontal" style={{paddingTop:0,fontSize: 12,fontWeight: 'bold',}}>TO CHALLENGE YOUR FACE EMOTIONS</Subtitle>
            </Overlay>
          </Tile>
        </Image>

      </View>
    );
  }
}

Index.propTypes = {
  navigator: PropTypes.object,
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
  },

};

export default Index;
