import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { Provider } from 'react-redux'
import AppRouteContainer from "./App/AppRouteContainer";
import store from './App/store/store'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { rehydrated: false }
  }

  componentWillMount(){

  }
  render() {
      return (
        <Provider store={store}>
          <AppRouteContainer nativeSettings={this.props.nativeSettings}/>
        </Provider>
      )
  }

}
