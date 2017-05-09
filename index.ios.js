import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import MotionApi from './components/MotionApi';
import Home from './components/Home';
import Result from './components/Result';
import { getRandomEmotion } from './config/emotions';

class motionApp extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      js: ''
    };

  }

  render() {

    return(
      <Navigator
        initialRoute = {{
          id:'Home'
        }}
        renderScene={
          this.NavigatorRenderScene
        }
      />
    );
  }

  NavigatorRenderScene(route, navigator) {
   
    switch (route.id) {
    case 'MotionApi':
      return(<MotionApi navigator = {navigator} title='MotionApi' emotionObject ={ getRandomEmotion() } />);
    case 'Home' :
      return(<Home navigator = {navigator} title='Home'/>);
    case 'Result' :
      return(<Result navigator = {navigator} title='Result' emotion='emotion' emotionscore = {0} />);


    }
  }
}

AppRegistry.registerComponent('motionApp', () => motionApp);
