import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Image,
  Button,
  Text,
  View

} from '@shoutem/ui';

let backimage = require('./assets/imgs/iPad.png');

class Index2 extends Component {

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
        <Button style={styleTypes.startButton} onPress = {() => this.navigate('Home')}>
         <Text>Start</Text>
        </Button>  
        </Image>
      
      </View>
    );
  }
}

Index2.propTypes = {
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
    width:150, 
    borderRadius:25,bottom:20
  }

};

export default Index2;
