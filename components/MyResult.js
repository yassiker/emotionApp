import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';

import {

  Tile,
  Title,
  Button,
  Text,
  Icon,
  Image,

} from '@shoutem/ui';

var Config = require('./Config');

class MyResult extends Component  {

  constructor() {
    super();
    this.state = {
      temp: 3,
      animation: 0,
      showCounter: false
    };
  }

  render() {
    return (
    <View style = {styles.container}>
    <Image
      styleName="large-portrait"
      source={{uri:Config.myurl}}
    >
      <Tile>
        <Title styleName="md-gutter-bottom" style={{paddingTop:10,fontSize: 30,fontWeight: 'bold'}}>YOU ARE</Title>
        <Title styleName="md-gutter-bottom" style={{paddingTop:10,fontSize: 30,fontWeight: 'bold'}}>{(this.props.data.value*100).toFixed(2)}%</Title>
        <Title styleName="md-gutter-bottom" style={{paddingTop:10,fontSize: 30,fontWeight: 'bold'}}>{this.props.data.name}</Title>
        <Button styleName="md-gutter-top" onPress={() => this.props.navigator.replace({
          name : 'GetEmotion',
        })}>
          <Icon name="refresh"/>
          <Text>Try Again</Text>
        </Button>

        <Button styleName="md-gutter-top" onPress={() => this.props.navigator.replace({
          name : 'Index',
        })}>
          <Icon name="close"/>
          <Text>   Home   </Text>
        </Button>
      </Tile>
    </Image>
    </View>
    );
  }
}

MyResult.propTypes = {
  navigator: PropTypes.object,
  data: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  mytext: {
    paddingTop:10, 
    fontSize: 30, 
    fontWeight: 'bold'
  }

});
export default MyResult;


