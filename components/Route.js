import React , { Component } from 'react';

import NavigationExperimental from 'react-native-deprecated-custom-components';
import GetEmotion from './GetEmotion';
import EmotionApi from './EmotionApi';
import Index from './Index';
import MyResult from './MyResult';
class App extends Component {

  constructor() {
    super();
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene = (route, navigator) => {

    if(route.name === 'Index') {
      return < Index navigator = {navigator} data={route.data} />;
    } else if (route.name === 'GetEmotion') {
      return < GetEmotion navigator = {navigator} data={route.data} />;
    } else if(route.name === 'EmotionApi') {
      return < EmotionApi navigator = {navigator} data={route.data} />;
    } else if (route.name === 'MyResult') {
      return < MyResult navigator = {navigator} data={route.data} />;
    }
  }

  render() {

    return (
    <NavigationExperimental.Navigator
    initialRoute  = {{name : 'Index'}}
    renderScene = {this.renderScene}
    />
    );
  }


}


export default App;
