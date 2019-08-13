import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  YellowBox,
  AsyncStorage
} from "react-native";

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    // remove yellow warning -----------------------------------------------------------------------------

    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated"
    ]);

    // end remove yellow warning -------------------------------------------------------------------------
  }

  // life cycle & make data refresh all time -------------------------------------------------------------

  componentDidMount() {
    this._interval = setInterval(() => {
      this.webCall();
    }, 1000);
    this.count();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  // end life cycle & make data refresh all time ---------------------------------------------------------

  // getting all id from other page ----------------------------------------------------------------------

  getHFC_cd = async () => {
    let hfc_cd = await AsyncStorage.getItem("hfc_cd");
    return hfc_cd;
  };

  getDisc_cd = async () => {
    let discipline_cd = await AsyncStorage.getItem("disc_cd");
    return discipline_cd;
  };

  // end getting all id from other page ------------------------------------------------------------------

  // save id ---------------------------------------------------------------------------------------------

  saveNotification = async notification => {
    await AsyncStorage.setItem("notification", JSON.stringify(notification));
  };

  // end save id -----------------------------------------------------------------------------------------

  // call data -------------------------------------------------------------------------------------------

  webCall = () => {
    this.getHFC_cd().then(hfc_cd => {
      this.state.hfc_cd = hfc_cd;
      this.getDisc_cd().then(discipline_cd => {
        this.state.discipline_cd = discipline_cd;
        return fetch(
          "http://192.168.1.107:8082/notification_new/" +
            hfc_cd +
            "/" +
            discipline_cd
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              isLoading: false,
              dataSource: responseJson
            });
          })
          .catch(error => {
            console.error(error);
          });
      });
    });
  };

  // end call data -----------------------------------------------------------------------------------------------

  // count call data ---------------------------------------------------------------------------------------------

  count = () => {
    this.getHFC_cd().then(hfc_cd => {
      this.state.hfc_cd = hfc_cd;
      this.getDisc_cd().then(discipline_cd => {
        this.state.discipline_cd = discipline_cd;
        return fetch(
          "http://192.168.1.107:8082/notification_count/" +
            hfc_cd +
            "/" +
            discipline_cd
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              isLoading: false,
              dataSource: responseJson
            });
          })
          .catch(error => {
            console.error(error);
          });
      });
    });
  };

  // end count call data ------------------------------------------------------------------------------------------

  // separate data ------------------------------------------------------------------------------------------------

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#000"
        }}
      />
    );
  };

  // end separate data --------------------------------------------------------------------------------------------

  render() {
    // for loading when there is no data from database ------------------------------------------------------------

    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
          <Text>Hye</Text>
        </View>
      );
    }

    // end for loading when there is no data from database --------------------------------------------------------

    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image
                source={require("../assets/bell.png")}
                style={{ height: 20, width: 20, marginTop: "2%" }}
              />

              <Text style={styles.textView}>{item.queue_no}</Text>
              <Text style={styles.textView2}>{item.status}</Text>
              {/* <Text style={styles.textView2}>{item.notification}</Text> */}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 5,
    marginTop: Platform.OS === "ios" ? 20 : 0
  },

  imageView: {
    width: "50%",
    height: 100,
    margin: 7,
    borderRadius: 7
  },

  textView: {
    width: "20%",
    paddingLeft: 20,
    textAlignVertical: "center",
    padding: 10,
    color: "#000"
  },
  textView2: {
    width: "20%",
    textAlignVertical: "center",
    padding: 10,
    color: "#000"
  }
});
