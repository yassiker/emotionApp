import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight
} from 'react-native';

import Camera from 'react-native-camera';

import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Emotion Recognition',
  };
  constructor(props) {
    super(props);
    this.state = {
      showme : true
    };
  }

  componentDidUpdate() {
    alert('masdfqsfqsdqke a happy face'); //This is working
  }

  componentWillMount() {
    alert('make a happy face'); //This is working
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
    <View style= {styles.container}>
    <Text>Home Screen</Text>
    <Camera
         ref={(cam) => {
           this.camera = cam;
         }}
         style={styles.preview}
         aspect={Camera.constants.Aspect.fill}
         captureQuality={Camera.constants.CaptureQuality.high}
         type={Camera.constants.Type.front}
         captureTarget={Camera.constants.CaptureTarget.disk}
       >

       { this.state.showme && 
            <Text>Hello Yassine </Text>
        }
       <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
         <View style = {{opacity:0.5,borderRadius:4,backgroundColor:'white', justifyContent:'center', alignItems:'center', padding:10}}>
           <Text style={{marginBottom:5}}>Make a "Happy" face</Text>

         </View>
       </View>
       <Button
         onPress = {() => navigate('Camera')}
         title='Click Me'
       />
       <View style={{opacity: 0.4,height:50, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
         <TouchableHighlight onPress={() => this._onPressButton('GetImage')} style={{justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>
         <Text style={{justifyContent:'center', alignItems:'center',borderColor:'white',borderWidth:10, height:30, width:30, borderRadius:15}}>
         <Text style={{backgroundColor:'red',borderWidth:5, height:2, width:10, borderRadius:5}}></Text>
         </Text>
         </TouchableHighlight>
       </View>
       </Camera>

    </View>);
  }
}

class CameraScreen extends Component {

  static navigationOptions = {
    title: 'Camera',
    headerLeft: null,
  };


  render() {
    return(
      <View style = {styles.container}>
        <Camera
         ref={(cam) => {
           this.camera = cam;
         }}
         style={styles.preview}
         aspect={Camera.constants.Aspect.fill}
         captureQuality={Camera.constants.CaptureQuality.high}
         type={Camera.constants.Type.front}
         captureTarget={Camera.constants.CaptureTarget.disk}
       />
       
      </View>
    );
  }
}

const emotionapp = StackNavigator({
  Home: { screen: HomeScreen },
  Camera: {screen: CameraScreen}
});

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
AppRegistry.registerComponent('emotionapp', () => emotionapp);
