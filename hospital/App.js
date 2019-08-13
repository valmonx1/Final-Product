import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text
} from "react-native";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
  TabBarBottom
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "./src/screen/Login";
import signup from "./src/screen/signup";
import Dashboard from "./src/screen/Dashboard";
import Patient from "./src/screen/Patient";
import Doctor from "./src/screen/Doctor";
import Notification from "./src/screen/Notification";
import Locations from "./src/screen/Locations";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = MaterialCommunityIcons;
  let iconName;
  if (routeName === "Map") {
    iconName = "map-marker";
  } else if (routeName === "Home") {
    iconName = "hospital-building";
  } else if (routeName === "Queue") {
    iconName = "format-list-numbered";
  } else if (routeName === "Notification") {
    iconName = "lightbulb-on-outline";
    IconComponent = HomeIconWithBadge;
  } else if (routeName === "Doctor") {
    iconName = "doctor";
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount="1" />;
};

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <MaterialCommunityIcons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: "absolute",
              right: -6,
              top: -3,
              backgroundColor: "red",
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Map: { screen: Locations },
    Home: { screen: Patient },
    Queue: { screen: Dashboard },
    Notification: { screen: Notification },
    Doctor: { screen: Doctor }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),

    tabBarOptions: {
      showIcon: true,
      activeTintColor: "white",
      inactiveTintColor: "#b794f6",
      style: {
        backgroundColor: "#6200EE"
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false
  }
);

const AuthStack = createSwitchNavigator({ Login: Login });

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  render() {
    return (
      <View style={stylesa.container}>
        <ActivityIndicator />
      </View>
    );
  }

  _loadData = () => {
    const isLoggedIn = AsyncStorage.getItem("isLoggedIn");
    this.props.navigation.navigate(isLoggedIn !== "1" ? "Auth" : "App");
  };
}

const stylesa = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
      signup: signup
      // Locations: Locations
    },
    {
      initialRouteName: "AuthLoading"
      // initialRouteName: "Locations"
    }
  )
);
