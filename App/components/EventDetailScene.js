import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button, Dimensions, Image} from 'react-native';
import initialState from "../store/initialState"
const {height, width} = Dimensions.get('window');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

mapStateToProps = state => ({
  track_event: state.track_event,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#979797',
  },
  itemTitle:{
    margin:3,
    color: '#fff',
    fontSize: 20
  },
  itemText:{
    margin:3,
    color: '#fff',
    fontSize: 16
  },
  detailView: {
    flex:1,
    backgroundColor: '#efe9cc',
  },
  imageStyle: {
    margin:5,
    height:width/2,
    width: width-10
  }
});

class EventDetailScene extends Component {
  static navigationOptions = {
    title: 'Event Details',
  };

  onTrackbuttonPress(event_detail) {
    var trackedEvents = this.props.track_event;
    trackedEvents.push(Object.assign({},event_detail));
    this.props.trackEvent(trackedEvents);
    console.log("Details "+ JSON.stringify(this.props.track_event));
  }

  render() {
    const { navigation } = this.props;
    var detail,title,location,entry,url;
    detail=navigation.getParam('item')
    title=detail.event;
    location=detail.place;
    entry=detail.entry;
    url=detail.img_url;


    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={{uri: url}}
        />
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemText}>Location: {location}</Text>
        <Text style={styles.itemText}>Entry: {entry}</Text>
        <Button
          onPress={()=>this.onTrackbuttonPress(detail)}
          style={{padding:10}}
          title="Track">
          </Button>
      </SafeAreaView>
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps) (EventDetailScene)
