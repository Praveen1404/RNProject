// TrackScene
import React, { Component } from 'react';
import { SafeAreaView, FlatList, View, StyleSheet, Image, Text, Button, Dimensions, TouchableOpacity} from 'react-native';
import events from "../data"
const {height, width} = Dimensions.get('window');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import DraggableFlatList from 'react-native-draggable-flatlist'

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
});

class TrackScene extends Component {

  constructor(props) {
    super(props);
    this.state={
      editToggle:false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Track',
      headerRight: (
        <Button
          onPress={navigation.getParam('editMode')}
          title="Edit"
          color="#979797"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ editMode: this.editButtonPress });
  }

  editButtonPress = () => {
    this.setState({
      editToggle:!this.state.editToggle,
    })
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <TouchableOpacity
        underlayColor= "transparent"
        style={styles.item}
        onPress={()=>this.props.navigation.navigate('EventDetailScene',{item})}
        onLongPress={move}
      >
      <View>
      <Image
        style={styles.imageStyle}
        source={{uri: item.img_url}}
      />
        <Text numberOfLines={1} style={styles.itemTitle}>{item.event}</Text>
        <Text numberOfLines={1} style={styles.itemText}>{item.place}</Text>
        <Text numberOfLines={1} style={styles.itemText}>{"Entry: "}{item.entry}</Text>
      </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.props.track_event.length>0) {
      return(
        <SafeAreaView style={styles.container}>
        <DraggableFlatList
          data={this.props.track_event}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => toString(index)}
          scrollPercent={5}
        />
        </SafeAreaView>
      )
    }else {
      return(<SafeAreaView style={styles.container}/>)
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps) (TrackScene)
