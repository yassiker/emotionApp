import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  View,
  TouchableHighlight

} from 'react-native';

//var r = require("./index.js");
var GLOBAL = require('./globals');

class Third extends Component {

  constructor(props){
        super(props);
        this.state = {
          emotion: "",
          emotionvalue:0
        };
    }

  onButtonPress(){
    alert(GLOBAL.emotion);
    alert(GLOBAL.emotionvalue);
    this.setState({
        emotion: GLOBAL.emotion,
        emotionvalue: GLOBAL.emotionvalue

    });

    /*this.props.navigator.push({
      id: 'Second'
    });*/
  }

  onButtonPress1(){
    this.props.navigator.push({
      id: 'First'
    });
  }

  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.largeText}>
          You look
        </Text>

        <TouchableHighlight onPress={this.onButtonPress.bind(this)} style={{
                backgroundColor: 'skyblue',
                marginBottom: 100,
                minHeight: 30,
                width: 300,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20}}>
          <Text style={styles.buttonText}> Get Result</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onButtonPress1.bind(this)} style={{
                backgroundColor: 'red',
                marginBottom: 250,
                minHeight: 30,
                width: 300,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20}}>
          <Text style={styles.buttonText}> Home
          </Text>
        </TouchableHighlight>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dddfd4'
  },

  button: {
    flex:1
  },

  largeText: {
    flex:1,
    fontSize: 52,
    fontFamily: "HelveticaNeue-Light",
    paddingTop: 40 ,
    paddingRight: 20,
    paddingLeft: 20,
    color: '#173e43'
  }

});

module.exports = Third;
