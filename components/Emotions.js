import React, { Component } from 'react';
import {
  Alert
} from 'react-native';
import { PropTypes } from 'prop-types';

import {
  Image,
  TouchableOpacity,
  View,
  Divider,
  Card,
  Icon,
  Subtitle,
  Caption,
  Screen,
  ListView,
  GridRow
} from '@shoutem/ui';
//import Popup from 'react-native-popup';
let img = require('./imgs/myimg2.png');
let happy = require('./imgs/happy.jpg');
let angry = require('./imgs/angry.jpg');
let surprise = require('./imgs/surprise.jpg');
let sad = require('./imgs/sad.jpg');

class Emotions extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.myvalue = 5;
    this.state = {
      emotions: [{
        'emotion': 'Happy',
        'description': 'Try to look Happy',
        'image': angry,
      }, {
        'emotion': 'Happy',
        'description': 'Try to look Happy',
        'image': happy,
      }, {
        'emotion': 'Angry',
        'description': 'Have an Angry face',
        'image': angry,
      }, {
        'emotion': 'Surprise',
        'description': 'You may want to look Surprise!',
        'image': surprise,
      }, {
        'emotion': 'Sad',
        'description': 'Get how Sad you are!',
        'image': sad,
      }
      ],
    };
  }

  renderRow(rowData, sectionId, index) {

    if (index === '0') {
      return (
        <TouchableOpacity key={index}>
          <Image
            styleName="large"
            source={img}
          >
           
          </Image>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }

    const cellViews = rowData.map((myemotion, id) => {
      return (
        <TouchableOpacity key={id} styleName="flexible">
          <Card styleName="flexible" >
            <Image
              styleName="medium-avatar"
              source= { myemotion.image  }
              style={{marginLeft:15, marginTop:10}}
            />
            <View styleName="content" style={{left:30, width: 150}} >
              <View styleName="horizontal" >
                <Caption styleName="collapsible" numberOfLines={2} >{myemotion.description}</Caption>
                <Icon name="right-arrow" style={{top:5}} onPress={this.onButtonPress.bind(this)} />
              </View>
              
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
 
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(this.state.emotions, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }

      return 1;
    });
    return (
      <Screen>
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }

  onButtonPress() {

    //Alert.alert('heeey you ');
    /*this.popup.tip({
      title: 'Emotion',
      content: [ '  height is ' + Sheight + '  width is ' , Swidth]
    });*/

    this.props.navigator.push({
      id: 'MotionApi'
    });

  }

}
Emotions.propTypes = {
  navigator: PropTypes.object
};

module.exports = Emotions;