import React, { Component } from 'react';
import { SafeAreaView, Alert, FlatList, View, StyleSheet, Image, Text, Button, Dimensions, TouchableHighlight} from 'react-native';
import events from "../data"
const {height, width} = Dimensions.get('window');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

mapStateToProps = state => ({
  user_name: state.user_name,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#979797',
  },
  item: {
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width/2.8, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#000',
    margin:2
  },
  itemTitle:{
    color: '#000',
    fontWeight:'bold',
    margin:2
  },
  imageStyle:{
    height:100,
    flex: 1,
    width:width-20,
  },
  imageGrid:{
    height:100,
    flex: 1,
  }
});

const data = events.events;
var numColumns = 1;

class EventsScene extends Component {

  constructor(props) {
    super(props);
    this.state={
      toggle:false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Events',
      headerLeft: null,
      headerRight: (
        <Button
          onPress={navigation.getParam('togglelist')}
          title="List"
          color="#979797"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ togglelist: this.togglebuttonPress });
  }

  togglebuttonPress = () => {
    this.setState({
      toggle:!this.state.toggle,
    })
  }
  onSwipeLeft=(gestureState)=> {
    this.props.navigation.navigate('TrackScene')
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        underlayColor= "transparent"
        style={styles.item}
        onPress={()=>this.props.navigation.navigate('EventDetailScene',{item})}
      >
      <View>
      <Image
        style={this.state.toggle? styles.imageGrid:styles.imageStyle}
        source={{uri: item.img_url}}
      />
        <Text numberOfLines={1} style={styles.itemTitle}>{this.props.user_name}</Text>
        <Text numberOfLines={1} style={styles.itemText}>{item.place}</Text>
        <Text numberOfLines={1} style={styles.itemText}>{"Entry: "}{item.entry}</Text>
      </View>
      </TouchableHighlight>
    );
  };

  render() {
    return(
      <SafeAreaView style={styles.container}>
      <GestureRecognizer style={styles.container}
        onSwipeLeft={this.onSwipeLeft}
      >
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        key={(this.state.toggle)? 1:0}
        numColumns={this.state.toggle? 3:1}
      />
      </GestureRecognizer>
      </SafeAreaView>
    )
  }
};
export default connect(mapStateToProps, mapDispatchToProps) (EventsScene)
