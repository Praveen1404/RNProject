import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import * as AppRoutes from './AppRoutes';

var AppContainer = createAppContainer(AppRoutes.AppRoutesInitial);

class AppRouteContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render(){
    return(<AppContainer/>)
  }
}


export default (AppRouteContainer);
