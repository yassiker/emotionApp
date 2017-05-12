import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
 
  View,
  StyleSheet

} from 'react-native';

import {

  Button,
  Text,
  Title,
  Icon,
  Tile,
  Image,

} from '@shoutem/ui';

var Config = require('./Config');
import { getRandomEmotion } from '../config/emotions';

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'result',
      myvalue : Config.emotionV
    };
   
  }

  onBack = () => {

    this.props.navigator.push({
      id: 'Home'
    });
  }

  render() {

    return (
        
      <View style={styles.container}>
        <Image
            styleName="large-portrait"
            source={{uri:Config.myurl}}
        > 
        
        <Tile>
          <Title styleName="md-gutter-bottom" style={{paddingTop:10, fontSize: 30, fontWeight: 'bold' }}>YOU ARE</Title>
          <Title styleName="md-gutter-bottom" style={{paddingTop:10, fontSize: 30, fontWeight: 'bold' }}>{(Config.emotion*100).toFixed(4)}%</Title>
          <Title styleName="md-gutter-bottom" style={{paddingTop:10, fontSize: 30, fontWeight: 'bold' }}>{Config.randomEmotion}</Title>
          <Button styleName="md-gutter-top" onPress={() => this.onBackPress()}>
            <Icon name="refresh"/>
            <Text>Try Again</Text>         
          </Button>
        </Tile>
      </Image>
  
      </View>

    );
  }
  
  _navigate = () => {

    if(Config.key != null) {
      this.props.navigator.pop({
        id: 'EmotionApi', 
      });
    }
  }

  async onBackPress() {

    var myobject = getRandomEmotion();
    if(myobject.emotionKey != null) {
      Config.key = myobject.emotionKey;
      Config.emt = myobject.emotionName;
      Config.showMsg = true;
      this._navigate();
    }

  }
}


Result.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

});

module.exports = Result;

