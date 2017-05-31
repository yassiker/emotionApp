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

//let img = require('./assets/imgs/backimg2.png');
let backimage = require('./assets/imgs/iPad.png');
let img1 = require('./assets/imgs/angry.jpg');
let img2 = require('./assets/imgs/happy.jpg');
let img3 = require('./assets/imgs/sad.jpg');

class Index extends Component {

  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate () {
    this.animatedValue.setValue(0);
    Animated.timing(
    this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.in
      }
    ).start(() => this.animate());
  }
  navigate = (name) => {
    this.props.navigator.replace({
      name
    });

  }

  _initilize = () => {
    return textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    });  
  }

  _animation = () => {

    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    });
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });
    return <View style= {{top:250, right:100}}>
             <Animated.Text
            style={{
              opacity,
              fontSize: this._initilize(),
              marginTop: 10,
              marginLeft,
              color: 'yellow',
              top:120,
              fontWeight:'bold'}} >
              ANGER
            </Animated.Text>
             <Animated.Text
            style={{
              opacity,
              fontSize: this._initilize(),
              marginLeft,
              marginTop: 10,
              color: 'black',
              top:120,
              fontWeight:'bold'}} >
              DISGUST
            </Animated.Text>
             <Animated.Text
            style={{
              opacity,
              fontSize: this._initilize(),
              marginLeft,
              marginTop: 10,
              color: 'white',
              top:120,
              fontWeight:'bold'}} >
              NEUTRAL
            </Animated.Text>
            <Animated.Text
            style={{
              opacity,
              fontSize: this._initilize(),
              marginTop: 10,
              color: 'green',
              top:0,
              fontWeight:'bold'}} >
              FEAR
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: this._initilize(),
                marginTop: 10,
                color: 'orange',
                top:0,
                fontWeight:'bold'}} >
                HAPPINESS
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: this._initilize(),
                marginTop: 10,
                color: 'red',
                top:0,
                fontWeight:'bold'}} >
                SADNESS
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: this._initilize(),
                marginTop: 10,
                color: 'skyblue',
                top:0,
                fontWeight:'bold'}} >
                SURPRISE
            </Animated.Text>
          </View>; 

  }

  render() {  


    return (
      <View style={styleTypes.selectedOption}>
        
        <Image
          styleName='large-portrait'
          source={backimage}
          style={styleTypes.backgroundImage}
        > 
          <Tile style={{flex: 1,}}>
            <View style={{flexDirection:'row', bottom:50}}>
             <Image
              styleName='small'
              source={img1}
              style={{bottom:150,right:150, marginRight: 10}}
            />
            <Image
              styleName='small'
              source={img2}
              style={{bottom:150,right:150, marginRight: 10}}
            />
            <Image
              styleName='small'
              source={img3}
              style={{bottom:150,right:150}}
            />
            </View>
           
            <Title style={{right:150,bottom:100,fontSize: 25,fontWeight: 'bold'}}>EMOTION RECOGNITION</Title>
            <Button styleName="dark" onPress = {() => this.navigate('Home')} style={{right:150,marginBottom:0,bottom: 50, width: 100 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', }}>START</Text>
            </Button>
            
            <Overlay styleName="solid-bright" style={{ right:120,top:0,height: 50 }}>
              <Subtitle styleName="sm-gutter-horizontal" style={{paddingTop:10,fontSize: 25,fontWeight: 'bold',}}>TO CHALLENGE YOUR FACE EMOTIONS</Subtitle>
            </Overlay>
          </Tile>
          {this._animation()}
          
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
