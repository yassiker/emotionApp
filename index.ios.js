/*import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import EmotionApi from './components/EmotionApi';
import Home from './components/Home';
import Result from './components/Result';


class motionApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      js: ''
    };

  }

  render() {

    return (
      <Navigator
        initialRoute={{
          id: 'Home'
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
      return (<Home navigator={navigator} title='Home' />);
    case 'Result':
      return (<Result navigator={navigator} title='Result' {... route.props}/>);
    case 'EmotionApi':
      return (<EmotionApi navigator={navigator} title='EmotionApi'/>);

    }
  }
}

AppRegistry.registerComponent('motionApp', () => motionApp);*/


import { AppRegistry } from 'react-native';
import App from './components/Route';


AppRegistry.registerComponent('motionApp', () => App);

