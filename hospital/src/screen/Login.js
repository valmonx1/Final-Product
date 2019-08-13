import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Picker,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import stylesLogin from "../style/stylesLogin";
import HandleBack from "./backApp";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_id_number: "",
      type_id: "",
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
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  //get patient id
  getStorageItem = async () => {
    let item = await AsyncStorage.getItem("pmi_no");
    return item;
  };

  UserLoginFunction = async () => {
    const { type_id_number } = this.state;
    const { type_id } = this.state;

    if (type_id == "") {
      alert("Please choose your ID");
      // this.setState({ email: 'Please enter Email address' })
    } else if (type_id_number == "") {
      alert("Please enter your ID number");
      // this.setState({ email: 'Please enter password' })
    } else {
      console.log(this.state.patient_name);
      let response = await fetch("http://192.168.1.107:8082/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type_id: this.state.type_id,
          type_id_number: this.state.type_id_number
        })
      });
      //new ways to send data instead of using .then ..... .then
      let responseData = await response.json();
      if (responseData) {
        try {
          console.log(responseData);

          if (responseData.success === true) {
            try {
              //save item in storage
              await AsyncStorage.setItem("isLoggedIn", "1");
              await AsyncStorage.setItem(
                "pmi_no",
                JSON.stringify(responseData.data[0].pmi_no)
              );
              alert(responseData.message);
              this.props.navigation.navigate("App");
            } catch (error) {
              alert("Error!");
            }
          } else {
            console.log(responseData);
            alert(responseData.message);
          }
        } catch (error) {}
      }
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <HandleBack>
        <View style={stylesLogin.container1}>
          <View style={stylesLogin.containerLogo}>
            <Image
              source={require("../assets/logo.png")}
              style={stylesLogin.logo}
            />
            <Text style={stylesLogin.TextComponentStyle}>
              Hospital Queue Management System
            </Text>
          </View>

          <StatusBar backgroundColor="#102027" barStyle="light-content" />

          <View style={stylesLogin.MainContainer}>
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
            style={stylesLogin.TextInputStyleClass}
            placeholder="I/C Number"
            placeholderTextColor="#ffffff"
            onChangeText={type_id_number => this.setState({ type_id_number })}
            value={this.state.type_id_number}
          />
          <TouchableOpacity>
            <View style={stylesLogin.button}>
              <Text
                style={stylesLogin.buttonConatiner}
                onPress={this.UserLoginFunction}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>

          <View style={stylesLogin.signupTextCont}>
            <Text style={stylesLogin.signupText}>Click Here to</Text>
            <Text
              style={stylesLogin.signupTextButton}
              onPress={() => navigate("signup")}
            >
              {" "}
              Register
            </Text>
          </View>
        </View>
      </HandleBack>
    );
  }
}
