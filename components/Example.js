'use strict';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import {
    Spinner
} from '@shoutem/ui';

var TimerMixin = require('react-timer-mixin');
const timer = require('react-native-timer');
var num = 0;

class Example extends Component {

  constructor() {
    super();
    this.state = {
      showMsg: false,
      counter: 5,
      showSpinner: false,
      animating: true,
    };
  }



  setToggleTimeout() {
    setTimeout(() => {
      this.setState({animating: !this.state.animating});
      this.setToggleTimeout();
    }, 3000);
  }

  componentDidMount() {
    this.setToggleTimeout();
  }

  componentWillUnmount() {
    timer.clearInterval(this);
  }
 
  showMsg() {
    for(var i = 0; i<3 ;i++) { 
      this.setState({showMsg: true}, () => timer.setInterval(
      this, 'hideMsg', this.myalert.bind(this), 1000
    ));
    }

  }
 
  myalert() { 
    num  = num + 1 ;
    if(this.state.counter == 0 ) {
        
      timer.clearInterval(this);
      this.setState({
        counter : 5,
        showMsg: false,
        showSpinner: true
      });
      
      /*this.props.navigator.push({
        id: 'Home',
      
      });*/
      //alert('Yooooo');
    }else {
    
      this.setState({
        counter : this.state.counter - 1
      });
    }
    
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent:'center'}}>

          
        <Text>counter is {this.state.counter}</Text>
        <TouchableOpacity onPress={() => requestAnimationFrame(() => this.showMsg())} style={{backgroundColor:'skyblue', width:150, marginTop:10,marginBottom:10}}>
          <Text>Press Me</Text>
        </TouchableOpacity>
 
        {this.state.showMsg ? ( 
          <Text>{this.state.counter}</Text>
        ) : (
          null
        )}
        {this.state.showSpinner ? ( 
          <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
        />
        ) : (
          null
        )}
      </View>
    );
  }
 

  
}
Example.propTypes = {
  navigator: PropTypes.object
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
  },
});

module.exports = Example;
