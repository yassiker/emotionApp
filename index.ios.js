import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import MotionApi from './components/MotionApi';
import Home from './components/Home';
import Result from './components/Result';
import Test from './components/Test';


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
          id: 'Result'
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
      return (<MotionApi navigator={navigator} title='MotionApi'  />);
    case 'Home':
      return (<Home navigator={navigator} title='Home' />);
    case 'Result':
      return (<Result navigator={navigator} title='Result' {... route.props}/>);
    case 'Test':
      return (<Test navigator={navigator} title='Test'/>);

    }
  }
}

AppRegistry.registerComponent('motionApp', () => motionApp);
