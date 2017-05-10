import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import {
 
  View,
  TouchableOpacity

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

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'result',
    };

  }

  onBack() {

    this.props.navigator.push({
      id: 'Home'
    });
  }

  render() {
    
    return (
        
      <View>
        <Tile >
        <TouchableOpacity onPress={()  => this.onBack()} style={{backgroundColor:'skyblue',justifyContent:'center', marginLeft:25, width:32, marginTop:10,marginBottom:10, height:32, left:300,top:50, zIndex: 1}}>
          <Image
              source={img1}
          />
        </TouchableOpacity>
        <Image
            styleName="large-portrait"
            source={{uri:Config.myurl}}
        > 
        <Tile>
          <Title>YOUR Are</Title>
          <Heading>{Config.emotionvalue}</Heading>
          <Heading></Heading>
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

  onHomePress() {
    alert('emotion score is : ' + this.props.emotionscore);
    this.props.navigator.push({
      id: 'Home'
    });

  }

  onBackPress() {

    //var myobject = getRandomEmotion();
    //alert(myobject.emotionKey);
    this.props.navigator.push({
      id: 'MotionApi', 
      
    });

  }
}


Result.propTypes = {
  navigator: PropTypes.object,
  myvar: PropTypes.string,
  emotionscore : PropTypes.number

};



module.exports = Result;

