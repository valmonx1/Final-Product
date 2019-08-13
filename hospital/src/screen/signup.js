import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Picker,
  ActivityIndicator
} from "react-native";

import HandleBack from "./back";
import stylesSignup from "../style/stylesSignup";

export default class signup extends Component {
  constructor(props) {
    super(props);
    // this.onBackPress = this.onBackPress.bind(this);

    this.state = {
      patient_name: "",
      patient_phone: "",
      type_id: "",
      type_id_number: "",
      patient_address: "",
      patient_nationality: "",
      isLoading: true,
      PickerValueHolder: ""
    };
  }

  componentDidMount() {
    return fetch("http://192.168.1.107:8082/type_id")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {
            // In this block you can do something with new state.
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  saveButton = () => {
    const {
      patient_name,
      patient_phone,
      type_id_number,
      patient_address,
      patient_nationality
    } = this.state;

    if (patient_name == "") {
      alert("Please enter name");
    } else if (patient_phone == "") {
      alert("Please enter phone number");
    } else if (type_id_number == "") {
      alert("Please enter ID number");
    } else if (patient_address == "") {
      alert("Please enter Address number");
    } else if (patient_nationality == "") {
      alert("Please enter nationality");
    } else {
      // alert(JSON.stringify(this.state));
      // return;
      fetch("http://192.168.1.107:8082/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patient_name: this.state.patient_name,
          type_id: this.state.type_id,
          type_id_number: this.state.type_id_number,
          patient_phone: this.state.patient_phone,
          patient_address: this.state.patient_address,
          patient_nationality: this.state.patient_nationality
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.success === true) {
            alert("Successfully register");
            this.props.navigation.navigate("Login");
          } else {
            console.log(responseJson);
            alert(responseJson.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <HandleBack>
        <View style={stylesSignup.container}>
          <StatusBar backgroundColor="#102027" barStyle="light-content" />
          <ScrollView>
            <View>
              <Text style={stylesSignup.text}>Sign Up Page</Text>
              <View style={stylesSignup.containerText}>
                <TextInput
                  style={stylesSignup.TextInputStyleClass}
                  placeholder="Name"
                  placeholderTextColor="#ffffff"
                  onChangeText={patient_name => this.setState({ patient_name })}
                />
                <View style={stylesSignup.MainContainer}>
                  <Picker
                    selectedValue={this.state.type_id}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ type_id: itemValue })
                    }
                  >
                    <Picker.Item label="Please select your ID Type" />
                    {this.state.dataSource.map((item, key) => (
                      <Picker.Item
                        label={item.patient_id_type}
                        value={item.type_id}
                        key={key}
                      />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  style={stylesSignup.TextInputStyleClass}
                  placeholder="I/D number"
                  placeholderTextColor="#ffffff"
                  onChangeText={type_id_number =>
                    this.setState({ type_id_number })
                  }
                />
                <TextInput
                  style={stylesSignup.TextInputStyleClass}
                  placeholder="Phone number"
                  placeholderTextColor="#ffffff"
                  onChangeText={patient_phone =>
                    this.setState({ patient_phone })
                  }
                />
                <TextInput
                  style={stylesSignup.TextInputStyleClass}
                  placeholder="Address"
                  placeholderTextColor="#ffffff"
                  onChangeText={patient_address =>
                    this.setState({ patient_address })
                  }
                />
                <TextInput
                  style={stylesSignup.TextInputStyleClass}
                  placeholder="Nationality"
                  placeholderTextColor="#ffffff"
                  onChangeText={patient_nationality =>
                    this.setState({ patient_nationality })
                  }
                />

                <TouchableOpacity>
                  <Text
                    style={stylesSignup.buttonContainer}
                    onPress={this.saveButton}
                  >
                    signUp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </HandleBack>
    );
  }
}
