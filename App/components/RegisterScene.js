import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TextInput, Button, Keyboard, Alert} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

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
    alignItems:'center',
    justifyContent:'center'
  },
  titleText: {
    fontSize: 24,
    margin:10,
    color:"#fff"
  },
  nameField:{
    height: 40,
    width:320,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin:10,
  },
  buttonStyle:{
    top:10
  }
});

class RegisterScene extends Component {

  constructor(props) {
    super(props);
    this.state={
      name: ""
    }
  }

  static navigationOptions = {
    header: null
  }
  onNextButtonPress(){
    Keyboard.dismiss();
    if (this.state.name.length>0) {
      // Register name is pending
      this.props.getUser(this.state.name);
      this.props.navigation.navigate('EventsScene')
    }else {
      Alert.alert('Oops', 'Please enter your name');
      return;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Enter your name</Text>
        <TextInput style={styles.nameField}
          onChangeText={(name) => this.setState({name})}
        />
        <Button
          title="Next"
          onPress={() => this.onNextButtonPress()}
        />
      </SafeAreaView>
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps) (RegisterScene)
