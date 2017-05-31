import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text 
} from 'react-native';
import {
  Image,
} from '@shoutem/ui';
var Config = require('./Config');

class Result extends Component  {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigate = (name) => {
    this.props.navigator.replace({
      name
    });
  }
  render() {
    return (
    <View style = {styles.container}>
        <View style={{borderBottomColor:'white',backgroundColor: 'black', alignItems:'center', justifyContent:'center', height:50, borderWidth:3}}>
          <Text style={{color:'white',fontSize: 30,fontWeight: 'bold'}}>Emotion Recognition</Text>
        </View>
        <Image
          styleName="large-portrait"
          source={{uri: Config.myurl}}
        >
            
        <View style = {{width:450,height:100,justifyContent:'center', alignItems:'center', opacity:0.5}}>
          <View style = {{opacity:0.5,borderRadius:4,backgroundColor:'white',height:100, justifyContent:'center', alignItems:'center', padding:10}}>
            <Text style={{marginBottom:5,fontSize: 30}}>Percentage of "{this.props.data.name}" face</Text>
            <Text style={{marginBottom:5, fontSize: 30,fontWeight: 'bold'}}>{(this.props.data.value*100).toFixed(2)}%</Text>
          </View>
        </View> 

        
          <View style = {{
            flexDirection:'row',
            alignItems:'center',
            opacity:0.5,
            borderRadius:4,
            backgroundColor:'white',
            width:390,
            height:40,
            marginTop:10,
            justifyContent:'space-between'}}>
                  <TouchableHighlight  onPress = {() => this.navigate('Index2')} style={{height:30,width:200, justifyContent:'center', alignItems:'center', borderRightWidth:1,borderRightColor:'black'}}>
                  <Text style={{color:'red', fontSize: 20,fontWeight: 'bold'}} >Close</Text>
                   </TouchableHighlight> 
                   <TouchableHighlight onPress = {() => this.navigate('Home')} style={{height:30,width:200, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize: 20,fontWeight: 'bold'}}>Start Over</Text>
                   </TouchableHighlight> 
          </View>
     
        
         <View style={{zIndex:1,right: 0,bottom: 0,left: 0,position: 'absolute',opacity: 0.4,height:100, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
            <TouchableHighlight onPress={() => this.myalert('Result')} style={{justifyContent:'center', alignItems:'center'}}>  
            <View>
            <Text style={{justifyContent:'center', alignItems:'center',borderColor:'white',borderWidth:25, height:70, width:70, borderRadius:35}}>
            </Text>
            <Text style={{bottom:46,borderColor:'red',borderWidth:11, height:22, width:22, borderRadius:11, zIndex:1,left:24}}></Text>
            </View>
            </TouchableHighlight>
          </View> 
        </Image>   
    </View>
    );
  }
}

Result.propTypes = {
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
  },

});
export default Result;


