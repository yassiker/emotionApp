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

let img1 = require('./assets/imgs/backimg2.png');
let img2 = require('./assets/imgs/angry.jpg');
let img3 = require('./assets/imgs/happy.jpg');

let ico = require('./assets/imgs/sad.jpg');

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
    this.props.navigator.push({
      name
    });

  }

  _initilize = () => {
    return textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    });  
  }


  goto = () => {
    alert('yeeeees');
  }
  render() {  
    /*const rotateX = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    });*/
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    });
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });
    return (
      <View style={styleTypes.selectedOption}>
        
        <Image
          styleName='large-wide'
          source={img1}
          style={styleTypes.backgroundImage}
        >

        
          <Tile style={{flex: 1,}}>
            <View style={{flexDirection:'row', bottom:50}}>
             <Image
              styleName='small'
              source={img2}
              style={{bottom:150,right:150, marginRight: 10}}
              onPress = { () => this.goto()}
            />
            <Image
              styleName='small'
              source={ico}
              style={{bottom:150,right:150, marginRight: 10}}
            />
            <Image
              styleName='small'
              source={img3}
              style={{bottom:150,right:150}}
            />
            </View>
           
            <Title style={{right:150,bottom:100,fontSize: 25,fontWeight: 'bold'}}>EMOTION RECOGNITION</Title>
            <Button styleName="dark" onPress = {() => this.navigate('GetEmotion')} style={{right:150,marginBottom:0,bottom: 50, width: 100 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', }}>START</Text>
            </Button>
            
            <Overlay styleName="solid-bright" style={{ right:120,top:0,height: 50 }}>
              <Subtitle styleName="sm-gutter-horizontal" style={{paddingTop:10,fontSize: 25,fontWeight: 'bold',}}>TO CHALLENGE YOUR FACE EMOTIONS</Subtitle>
            </Overlay>
          </Tile>
          <View style= {{top:250, right:100}}>
            <Animated.View
            style={{
              opacity,
              marginLeft,
              height: 30,
              top:130,
              
            }} >
            <Text style={{fontSize: 25,fontWeight: 'bold',color: 'yellow'}}>ANGER</Text>
            </Animated.View>
            <Animated.View
            style={{
              opacity,
              marginLeft,
              height: 30,
              top:130
            }} >
            <Text style={{fontSize: 25,fontWeight: 'bold', color:'black'}}>DISGUST</Text>
            </Animated.View>
            <Animated.View
            style={{
              opacity,
              marginLeft,
              height: 30,
              top:130
            }} >
            <Text style={{fontSize: 25,fontWeight: 'bold', color:'white'}}>NEUTRAL</Text>
            </Animated.View>
            <Animated.Text
            style={{
              opacity,
              fontSize: this._initilize(),
              marginTop: 10,
              color: 'green',
              top:25,
              fontWeight:'bold'}} >
              FEAR
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: textSize,
                marginTop: 10,
                color: 'orange',
                top:25,
                fontWeight:'bold'}} >
                HAPPINESS
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: textSize,
                marginTop: 10,
                color: 'red',
                top:25,
                fontWeight:'bold'}} >
                SADNESS
            </Animated.Text>
            <Animated.Text
              style={{
                opacity,
                fontSize: textSize,
                marginTop: 10,
                color: 'skyblue',
                top:25,
                fontWeight:'bold'}} >
                SURPRISE
            </Animated.Text>
          </View>

          
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
