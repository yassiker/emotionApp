import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import {
 
  View,
  TouchableOpacity,
  StyleSheet

} from 'react-native';

import {

  Button,
  Text,
  Title,
  Icon,
  Tile,
  Image,
  Heading,


} from '@shoutem/ui';

var Config = require('./Config');
let img1 = require('./imgs/homeS.png');
import { getRandomEmotion } from '../config/emotions';
class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'result',
      myvalue : Config.emotionV
    };
   
  }

 
  
  onBack() {

    this.props.navigator.push({
      id: 'Home'
    });
  }

  render() {

    return (
        
      <View style={styles.container}>
        <Tile >
        
        <Image
            styleName="large-portrait"
            source={{uri:Config.myurl}}
        > 
        
        <Tile>
          <Title>YOUR Are</Title>
          <Heading>{Config.emotionV*100}%</Heading>
          <Heading>{Config.randomEmotion}</Heading>
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

  onBackPress() {

    //var myobject = getRandomEmotion();
    //alert(myobject.emotionKey);
    Config.showMsg = true;
    Config.emt = getRandomEmotion().emotionName;
    Config.key = getRandomEmotion().emotionKey;
    if(Config.emt === null) {
      alert('ddddd');
    }else{
      this.props.navigator.pop({
        id: 'Test', 
        props: {
          myprop: 'fffff'
        }
      });
    }
    

  }
}


Result.propTypes = {
  navigator: PropTypes.object,
  myvar: PropTypes.string,
  emotionscore : PropTypes.number,


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },


});

module.exports = Result;

