import React, { Component } from "react";
import { BackHandler, Alert } from "react-native";

import { withNavigation } from "react-navigation";

class HandleBack extends Component {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress() {
    Alert.alert(
      "Exit from App",
      "Do you want to exit from app?",
      [
        { text: "Yes", onPress: () => BackHandler.exitApp() },
        { text: "No", onPress: () => console.log("no pressed") }
      ],
      { cancelable: false }
    );
    return true;
  }

  render() {
    return this.props.children;
  }
}

export default withNavigation(HandleBack);
