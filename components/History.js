import React, { Component } from 'react';

import { PropTypes } from 'prop-types';

import {
  Image,
  TouchableOpacity,
  View,
  Divider,
  Card,
  Icon,
  Caption,
  ListView,
  GridRow,
  NavigationBar,
  Button,
  Title,
  Text,
  Tile,
  Heading
} from '@shoutem/ui';

var Config = require('./Config');
let happy = require('./imgs/happy.jpg');
let angry = require('./imgs/angry.jpg');
let surprise = require('./imgs/surprise.jpg');
let sad = require('./imgs/sad.jpg');

class History extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
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
            styleName="large-banner"
            source={{uri:Config.picHistory[0].url}}
          >
           <Tile>
            <Heading>{Config.emotionArray[Config.historyCnt ]} BY</Heading>
            <Heading>{(Config.mydata[Config.historyCnt]*100).toFixed(2)}%</Heading>
            <Button styleName="md-gutter-top" onPress={this.onCamPress.bind(this)}>
            <Icon name="refresh"/>
            <Text>New Try</Text>
            </Button>
            <Button styleName="md-gutter-top" onPress={this.onHomePress.bind(this)}>
            <Icon name="sidebar"/>
            <Text>{'  '} Home</Text>
            </Button>
        </Tile>
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
              styleName="medium-wide"
              source= {{uri : myemotion.url  }}
              style={{marginLeft:15, marginTop:10}}
            />
            <View styleName="content" style={{left:30, width: 150}} >
              <View styleName="horizontal" >
                <Caption styleName="collapsible" numberOfLines={2} >{myemotion.emotion}</Caption>
                <Caption styleName="collapsible" numberOfLines={2} >{(myemotion.value*100).toFixed(2)}%</Caption>
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
    const groupedData = GridRow.groupByRows(Config.picHistory, 2, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }

      return 1;
    });
    return (

        <View>
          <NavigationBar
        leftComponent={<Button >
            <Icon name="back" />
            </Button>}
        centerComponent={<Title>RESULT</Title>}
        rightComponent={(
            <Button styleName='clear'>
            <Text>Home</Text>
            </Button>
        )}
        />
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
         
        />
      </View>
    );
  }

  onHomePress() {

    this.props.navigator.push({
      id: 'Home'
    });

  }

  onCamPress() {

    this.props.navigator.push({
      id: 'MotionApi'
    });

  }

}
History.propTypes = {
  navigator: PropTypes.object
};

module.exports = History;