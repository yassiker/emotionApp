import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image
} from 'react-native';

import {

} from '@shoutem/ui';
import Camera from 'react-native-camera';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
var Config = require('./Config');
import Load from 'react-native-loading-gif';

import { getIcon } from '../config/emoticon';

class GetImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temp: 5,
      showCounter: true,
    };
    this.pic = getIcon(this.props.data.emotionKey);
  }

  componentWillMount() {
    this._counter();
  }

  componentDidUpdate() {
    if (this.state.temp === 0) {
      this.refs.Load.setTimeClose(4000);
    }
  }
  _counter = () => {
    this.takePictureInterval = setInterval(() => this._counting(), 1000);
  }

  _createimage = (data) => {
    var myimg = data.path;
    var img = myimg.replace('file:', '');
    Config.myurl = img;
    return RNFS.readFile(img, 'base64');
  }

  _transformimage = (file) => {
    file = new Buffer(file);
    if (!global.atob) {
      global.atob = require('base-64').decode;
    }
    let buffer = atob(file);
    var array = new Uint8Array(new ArrayBuffer(buffer.length))
      .map((x, i) => buffer.charCodeAt(i));
    return this._sendimagetoApi(array);
  }

  _sendimagetoApi = (array) => {
    return fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?*', {
      method: 'POST',
      body: array,
      headers: {
        'Ocp-Apim-Subscription-Key': '7bea3b94b4434e118e3715da57d8c17f',
        'Content-Type': 'application/octet-stream'
      },
      credentials: 'same-origin',
    });
  }

  _navigatetoResult = (data) =>{
    console.log(data);
    this.setState({
      showCounter: false,
      temp: 5
    }, this.props.navigator.push({
      name : 'Result',
      data: { name: this.props.data.emotionName , value: data[0].scores[this.props.data.emotionKey] }
    })
    );
  }

  _takephoto = () => {
    this.setState({
      showCounter: false,
      temp: 5
    });
    const options = {};
    this.camera.capture([options])
      .then(this._createimage)
      .then(this._transformimage)
      .then(function (response) {
        console.log(response.json);
        return response.json();
      })    
      .then((data) => {
        this._navigatetoResult(data);
      })
      .catch(function (err) {
        console.log(err);
      });         
  }

  _counting = () => {
    if (this.state.temp === 0) {
      this._takephoto();
      clearInterval(this.takePictureInterval);
    } else {
      this.setState({
        temp: --this.state.temp
      });
    }
  }

  _onPressButton = (name) => {
    this.props.navigator.push({
      name,
      data: { name: this.props.data.emotionName , value: data[0].scores[this.props.data.emotionKey] }
    });
  }

  render() {
    return (<View style = {styles.container}>
                <View style={{flexDirection: 'row',backgroundColor: 'black', alignItems:'center', justifyContent:'center', height:80}}>
                  <Image
                    source={this.pic}
                    style = {{width:48, height:48, marginRight:15}}
                  />
                  <Text style={{color:'white',fontSize: 30,fontWeight: '300'}}>{this.props.data.emotionName}</Text>
                </View> 
                <Image
                  source={require('./assets/imgs/frame1.png')}
                  style = {{position:'absolute',flex:1,left:100, right:0, bottom:0, zIndex:1, top:180,width:601, height:679}}
                />     
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
            <Text style={{color:'white',fontSize: 30,fontWeight: 'bold'}}> </Text>
            </Camera>
           
            {
              this.state.showCounter ? (
                <View style={styles.counterstyle}>
                  <Text style={styles.counter} >{this.state.temp}</Text>
                </View>
              ) : null
            }
            <View style={{zIndex:1,right: 0,bottom: 0,left: 0,position: 'absolute',opacity: 0.3,height:95, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
            <TouchableHighlight style={{zIndex:1,justifyContent:'center', alignItems:'center',opacity:1}} onPress={() => this._onPressButton('Index')}>  
            <View style={{zIndex:1,top:13}}>
            <Text style={{zIndex:1,opacity:1,justifyContent:'center', alignItems:'center',borderColor:'white',borderWidth:25, height:70, width:70, borderRadius:35}}>
            </Text>
            <Text style={{zIndex:1,opacity:1,bottom:46,borderColor:'red',borderWidth:11, height:22, width:22, borderRadius:11,left:24}}></Text>
            </View>
            </TouchableHighlight>
          </View> 
          <Load opacity={0.8} ref="Load"></Load>
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
    flexDirection:'column'
  },
  preview: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  counterstyle : {
    position:'absolute',
    alignItems: 'center', 
    height: 100,
    zIndex: 1,
    top:400,
    bottom:0,
    left:0,
    right:0, 
    justifyContent: 'center'
  },
  loading: {
    position:'absolute',
    top:400,
    bottom:0,
    left:80,
    right:0,
    alignItems: 'center', 
    height: 100, 
    justifyContent: 'center'
  },
  counter: {
    fontSize: 100,
    textAlign: 'center',
    zIndex: 1,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default GetImage;


