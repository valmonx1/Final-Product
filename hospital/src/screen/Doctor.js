import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  Text,
  ListView,
  StatusBar,
  TextInput,
  YellowBox
} from "react-native";
import HandleBack from "./backApp";
import stylesDoctor from "../style/stylesDoctor";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: ""
    };
    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated"
    ]);
    this.arrayholder = [];
  }

  componentDidMount() {
    return fetch("http://192.168.1.107:8082/doctor")
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson)
          },
          function() {
            // In this block you can do something with new state.
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.hfc_cd_name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    });
  }

  ListViewItemSeparator = () => {
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

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <HandleBack>
        <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
        <Text style={stylesDoctor.con}>Doctor</Text>
        <View style={stylesDoctor.contena}>
          <View style={stylesDoctor.search}>
            <Icon name="database-search" style={{ fontSize: 25 }} />
            <TextInput
              style={stylesDoctor.TextInputStyleClass}
              onChangeText={text => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid="transparent"
              placeholder="Search Here"
            />
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator={this.ListViewItemSeparator}
            renderRow={rowData => (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  source={{ uri: rowData.image }}
                  style={stylesDoctor.imageView}
                />
                <View>
                  <Text style={stylesDoctor.text1}>{rowData.hfc_cd_name}</Text>
                  <Text style={stylesDoctor.text1}>{rowData.name}</Text>
                  <Text style={stylesDoctor.text1}>
                    {rowData.discipline_name}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </HandleBack>
    );
  }
}
