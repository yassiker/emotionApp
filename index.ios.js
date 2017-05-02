import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import MotionApi from './components/MotionApi';
import Home from './components/Home';
import Emotions from './components/Emotions';
import Result from './components/Result';

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
      return(<MotionApi navigator = {navigator} title='MotionApi' />);
    case 'Home' :
      return(<Home navigator = {navigator} title='Home'/>);
    case 'Emotions' :
      return(<Emotions navigator = {navigator} title='Emotions'/>);
    case 'Result' :
      return(<Result navigator = {navigator} title='Result'/>);

    }
  }
}

AppRegistry.registerComponent('motionApp', () => motionApp);
