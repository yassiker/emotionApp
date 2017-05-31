import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Image,
  Button,
  Text,
  View

} from '@shoutem/ui';

let backimage = require('./assets/imgs/iPad3.png');

class Index extends Component {

  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate = (name) => {
    this.props.navigator.push({
      name
    });
  }

  render() {  
    return (
      <View style={styleTypes.selectedOption}>
        <Image
          styleName='large-portrait'
          source={backimage}
          style={styleTypes.backgroundImage}
        >    
        <View style={{justifyContent:'center', alignItems:'center', bottom:230}}><Text style={{fontSize: 40,fontWeight: '300', color:'white'}}>Emotion</Text>
          <Text style={{fontSize: 40,fontWeight: '300', color:'white'}}>recognition by</Text>
        </View>  
        <Button style={styleTypes.startButton} onPress = {() => this.navigate('Home')}>
         <Text style={{color:'white',fontSize: 30,fontWeight: '300'}}>Start</Text>
        </Button>  
        </Image>
      
      </View>
    );
  }
}

Index.propTypes = {
  navigator: PropTypes.object,
  data : PropTypes.string,
};

const styleTypes = {
  selectedOption: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent:'center',
    alignItems: 'center'
  },
  startButton : {
    width:250, 
    borderRadius:50,
    backgroundColor: '#D39924',
    height:50,
    bottom:60,
    borderColor: '#D39924',
  }

};

export default Index;
