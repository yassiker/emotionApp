import React , { Component } from 'react';

import NavigationExperimental from 'react-native-deprecated-custom-components';
import GetEmotion from './GetEmotion';
import EmotionApi from './EmotionApi';
import Index from './Index';
import MyResult from './MyResult';
import Home from './Home';
import Result from './Result';
import GetImage from './GetImage';
import Index2 from './Index2';

class App extends Component {

  constructor() {
    super();
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene = (route, navigator) => {

    if(route.name === 'Index') {
      return < Index navigator = {navigator} data={route.data} />;
    } else if (route.name == 'Home') {
      return < Home navigator = {navigator} data={route.data} />;
    } else if (route.name == 'Result') {
      return < Result navigator = {navigator} data={route.data} />;
    } else if (route.name == 'GetImage') {
      return < GetImage navigator = {navigator} data={route.data}/>;
    } else if (route.name == 'Index2') {
      return < Index2 navigator = {navigator} data={route.data}/>;
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
    style={{ flex:1}}
    initialRoute  = {{name : 'Result'}}
    renderScene = {this.renderScene}
    />
    );
  }


}


export default App;
