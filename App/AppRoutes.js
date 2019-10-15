import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import RegisterScene from "./components/RegisterScene"
import EventsScene from "./components/EventsScene"
import EventDetailScene from "./components/EventDetailScene"
import TrackScene from "./components/TrackScene"

const routeScenes = {
  RegisterScene: RegisterScene,
  EventsScene: EventsScene,
  EventDetailScene: EventDetailScene,
  TrackScene: TrackScene,
}
export const AppRoutesInitial = createStackNavigator(
  {
    ...routeScenes
  },
  {
    initialRouteName: "RegisterScene",
  }
)
