import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS

} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';
//var base64 = require('base-64');
import base64ImageString from 'base-64';
//var fs = require('fs');
//var request = require('request');

import RNFS from 'react-native-fs';
var GLOBAL = require('./globals');
var index = require("./Index");
//import Index from './Index';
//var mydata = "";
class First extends Component {

  onButtonPress(){
    this.props.navigator.push({
      id: 'Second'
    });
  }


  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.largeText}>
          Challenge your face emotions
        </Text>
        <Image
          source={require('./imgs/emotion.jpg')} style={{width:700}}
        />
        <TouchableHighlight onPress={this.onButtonPress.bind(this)} style={{
                backgroundColor: 'skyblue',
                marginBottom: 50,
                marginTop:100,
                minHeight: 40,
                width:300,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20}}>
          <Text style={styles.buttonText}> Start the game
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onButtonPress.bind(this)} style={{
                backgroundColor: 'red',
                marginBottom: 150,
                minHeight: 30,
                width:300,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20}}>
          <Text style={styles.buttonText}> Quit
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
    flex:1,
    backgroundColor: 'skyblue',
    height: 40,
    width: 40
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

module.exports = First;
