import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
} from 'react-native';

import {

} from '@shoutem/ui';
import Camera from 'react-native-camera';

class GetImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showelement: true
    };
  }

  myalert = (name) => {
    this.props.navigator.push({
      name
    });

  }
  render() {
    return (<View style = { styles.container}>
                <View style={{position: 'absolute',borderBottomColor:'white',backgroundColor: 'black', alignItems:'center', justifyContent:'center', height:50, borderWidth:3,zIndex:1}}>
                  <Text style={{color:'white'}}>Emotion Recognition</Text>
                </View>
                <View style = {{position: 'absolute', justifyContent:'center', alignItems:'center',zIndex:1, top:100, right:0, left:0}}>
                  <View style = {{opacity:1, justifyContent:'center', height:450, width:300,alignItems:'center', padding:10, borderWidth:2, borderColor:'white'}}>
                    <View style = {{backgroundColor: 'black',opacity:1, justifyContent:'center', height:450, width:300,alignItems:'center', padding:10, borderWidth:2,borderRadius:25}}>
                      <View style = {{opacity:0, justifyContent:'center', height:450, width:300,alignItems:'center', padding:10, borderWidth:2,borderRadius:25}}>
                      </View>
                    </View>
                  </View>
                </View>

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
            </Camera>
            <View style={{zIndex:1,right: 0,bottom: 0,left: 0,position: 'absolute',opacity: 0.4,height:50, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
              <TouchableHighlight onPress={() => this.myalert('Result')} style={{justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>  
              <Text style={{justifyContent:'center', alignItems:'center',borderColor:'white',borderWidth:10, height:30, width:30, borderRadius:15}}>
              <Text style={{backgroundColor:'red',borderWidth:5, height:2, width:10, borderRadius:5}}></Text>
              </Text>
              </TouchableHighlight>
          </View> 
          </View>
    );
  }
}

GetImage.propTypes = {
  navigator: PropTypes.object,
  data: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems:'center',
  },
});

export default GetImage;


