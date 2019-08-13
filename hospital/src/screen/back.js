import React, { Component } from "react";
import { BackHandler } from "react-native";

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
    this.props.navigation.navigate("Login");
    return true;
  }

  render() {
    return this.props.children;
  }
}

export default withNavigation(HandleBack);
