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

let img1 = require('./imgs/backEm.jpg');

class Index extends Component {

  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
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
            <Title styleName="md-gutter-bottom" style={{fontSize: 20,fontWeight: 'bold'}}>EMOTION RECOGNITION</Title>
            <Title styleName="md-gutter-bottom" style={{fontSize: 25,fontWeight: 'bold'}}>ANGER, HAPPINESS, SADNESS </Title>
             <Title styleName="md-gutter-bottom" style={{fontSize: 25,fontWeight: 'bold'}}>AND MORE ...</Title>
            <Button styleName="dark" onPress = {() => this.navigate('GetEmotion')} style={{marginBottom:100,top: 130, width: 130 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>START</Text>
            </Button>
            <Overlay styleName="solid-bright" style={{ top:50,height: 100 }}>
              <Subtitle styleName="sm-gutter-horizontal" style={{paddingTop:15,fontSize: 20,fontWeight: 'bold',}}>TO CHALLENGE YOUR FACE EMOTIONS</Subtitle>
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
