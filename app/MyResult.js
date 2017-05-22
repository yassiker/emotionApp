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
import { getBackImage } from '../config/emoticon';

class MyResult extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      temp: 3,
      animation: 0,
      showCounter: false
    };
    this.pic = getBackImage(this.props.data.name);
  }

  render() {
    return (
    <View style = {styles.container}>
    <Image
      styleName="large-portrait"
      source={this.pic}
    
    >
      <Tile style={{justifyContent:'center',alignItems:'center',width:370, backgroundColor:'#185a9d', borderRadius: 100,height:800, left:20, top:100}}>
        <Image
          styleName="medium-wide"
          style={{height:350}}
          source={{uri:Config.myurl}}
        />
        <Title styleName="md-gutter-bottom" style={{paddingTop:10,fontSize: 30,fontWeight: 'bold'}}>YOU ARE</Title>
        <Title styleName="md-gutter-bottom" style={{paddingTop:10,fontSize: 30,fontWeight: 'bold'}}>{(this.props.data.value*100).toFixed(2)}%</Title>
        <Title styleName="md-gutter-bottom" style={{paddingTop:10,fontSize: 30,fontWeight: 'bold'}}>{this.props.data.name}</Title>
        <Button styleName="md-gutter-top"  onPress={() => this.props.navigator.replace({
          name : 'GetEmotion',
        })}>
          <Icon name="refresh"/>
          <Text>Try Again</Text>
        </Button>

        <Button styleName="md-gutter-top"  onPress={() => this.props.navigator.replace({
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
    justifyContent: 'center',
    alignItems:'center'
  },
  mytext: {
    paddingTop:10, 
    fontSize: 30, 
    fontWeight: 'bold'
  }

});
export default MyResult;


