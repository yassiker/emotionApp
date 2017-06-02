import React , { Component } from 'react';

import NavigationExperimental from 'react-native-deprecated-custom-components';
import Index from './Index';
import Home from './Home';
import Result from './Result';
import GetImage from './GetImage';

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
    }
  }

  render() {
    return (
    <NavigationExperimental.Navigator
    style={{ flex:1}}
    initialRoute  = {{name : 'Index'}}
    renderScene = {this.renderScene}
    />
    );
  }
}

export default App;
