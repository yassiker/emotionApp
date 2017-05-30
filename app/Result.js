import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text 
} from 'react-native';
import Camera from 'react-native-camera';

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
          <Text style={{color:'white'}}>Emotion Recognition</Text>
        </View>
        <View style = {{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'skyblue'}}>
        
        
        <View style = {{width:250,height:100,justifyContent:'center', alignItems:'center', opacity:0.5}}>
          <View style = {{opacity:0.5,borderRadius:4,backgroundColor:'white',height:100, justifyContent:'center', alignItems:'center', padding:10}}>
            <Text style={{marginBottom:5}}>Percentage of "Happy" face</Text>
            <Text style={{marginBottom:5, fontSize: 30,fontWeight: 'bold'}}>1,87%</Text>
          </View>
        </View> 

        <View style = {{width:200,justifyContent:'center', alignItems:'center', opacity:0.5,marginTop:5}}>
          <View style = {{
            flexDirection:'row',
            alignItems:'center',
            opacity:0.5,
            borderRadius:4,
            backgroundColor:'white',
            width:200,
            height:30,
            justifyContent:'space-between'}}>
                  <TouchableHighlight  onPress = {() => this.navigate('Index2')} style={{height:30,width:100, justifyContent:'center', alignItems:'center', borderRightWidth:1,borderRightColor:'black'}}>
                  <Text style={{color:'red'}} >Close</Text>
                   </TouchableHighlight> 
                   <TouchableHighlight onPress = {() => this.navigate('Home')} style={{height:30,width:100, justifyContent:'center', alignItems:'center'}}>
                  <Text >Start Over</Text>
                   </TouchableHighlight> 
          </View>
        </View> 
        
        <View style={{position:'absolute', left:0, right:0,bottom:0,opacity: 0.4,height:50, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
          <TouchableHighlight style={{justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>  
          <Text style={{justifyContent:'center', alignItems:'center',borderColor:'white',borderWidth:10, height:30, width:30, borderRadius:15}}>
          <Text style={{backgroundColor:'red',borderWidth:5, height:2, width:10, borderRadius:5}}></Text>
          </Text>
          </TouchableHighlight>
        </View> 
        </View>    
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


