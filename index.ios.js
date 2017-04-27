import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import Home from './components/Home';
import MotionApi from './components/MotionApi';

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
    case 'Home':
      return(<Home navigator = {navigator} title='Home' />);
    case 'MotionApi':
      return(<MotionApi navigator = {navigator} title='MotionApi' />);

    }
  }
}

AppRegistry.registerComponent('motionApp', () => motionApp);
