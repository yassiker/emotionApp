import React, { Component } from 'react';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import First from './components/First';
import Second from './components/Second';
import Third from './components/Third';
//import Index from './components/Index';


class motionApp extends Component{
  constructor(props) {
        super(props);
        this.state = {
            js: ''
        };

        
    }



  render(){
    return(
      <Navigator
        initialRoute = {{
          id:'First'
        }}
        renderScene={
          this.NavigatorRenderScene
        }
      />
    )
  }

  NavigatorRenderScene(route, navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'First':
        return(<First navigator = {navigator} title='First' />);
      case 'Second':
        return(<Second navigator = {navigator} title='Second' />);
      case 'Third':
        return(<Third navigator = {navigator} title='Third' />);

    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dddfd4'
  }


});

AppRegistry.registerComponent('motionApp', () => motionApp);

export default motionApp;
