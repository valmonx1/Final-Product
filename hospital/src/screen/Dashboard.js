import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  StatusBar,
  YellowBox,
  Button
} from "react-native";
import stylesDash from "../style/stylesDash";
import HandleBack from "./backApp";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated"
    ]);
    this.panggilDelayData = this.panggilDelayData.bind(this);

    this.state = {
      queue_no: [],
      queue_name: [],
      hfc_cd_name: [],
      notification: "",
      discipline_name: [],
      pmi_no: "",
      hfc_cd: "",
      discipline_cd: "",
      queue: ""
    };
  }

  // React method ---------------------------------------------------------------------------------------------------------------------------

  componentDidMount() {
    this._interval = setInterval(() => {
      console.log(this.state);
      this.panggilDelayData();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  // End of react method ---------------------------------------------------------------------------------------------------------------------

  // Tunjuk user punya nombor ----------------------------------------------------------------------------------------------------------------

  panggilDelayData = () => {
    this.getPatient_id().then(pmi_no => {
      this.state.pmi_no = pmi_no;
      fetch("http://192.168.1.107:8082/show_no/" + pmi_no)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            queue_no: JSON.stringify(responseJson.result[0]["queue_no"]),
            queue_name: JSON.stringify(responseJson.result[0]["queue_name"]),
            hfc_cd_name: JSON.stringify(responseJson.result[0]["hfc_cd_name"]),
            discipline_name: JSON.stringify(
              responseJson.result[0]["discipline_name"]
            )
          });
        });
      alert(responseJson.message).catch(error => {
        console.error(error);
      });
    });
  };

  // End tunjuk user punya nombor ------------------------------------------------------------------------------------------------------------

  // Tunjuk nombor consult -------------------------------------------------------------------------------------------------------------------

  show = () => {
    this.getHFC_cd().then(hfc_cd => {
      this.state.hfc_cd = hfc_cd;
      this.getDisc_cd().then(discipline_cd => {
        this.state.discipline_cd = discipline_cd;
        fetch(
          "http://192.168.1.107:8082/show_now/" + hfc_cd + "/" + discipline_cd
        )
          .then(response => response.json())
          .then(responseJson => {
            //ubah obj jadi string
            //alert terima string ja
            //JSON.parse == string to obj
            if (responseJson.message.length > 0) {
              Alert.alert(
                JSON.stringify(
                  "Currently serving number is : " +
                    responseJson.message[0].queue_no
                )
              );
            }
          });
      });
    });
  };

  // End tunjuk nombor consult ---------------------------------------------------------------------------------------------------------------

  // Get Id from async storage ---------------------------------------------------------------------------------------------------------------

  getPatient_id = async () => {
    let pmi_no = await AsyncStorage.getItem("pmi_no");
    return pmi_no;
  };

  getHFC_cd = async () => {
    let hfc_cd = await AsyncStorage.getItem("hfc_cd");
    return hfc_cd;
  };

  getDisc_cd = async () => {
    let discipline_cd = await AsyncStorage.getItem("disc_cd");
    return discipline_cd;
  };

  // End get Id from async storage -----------------------------------------------------------------------------------------------------------

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <HandleBack>
        <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
        {/* <View style={stylesDash.statusBar} /> */}
        <Text style={stylesDash.con}>Queue</Text>
        <View style={stylesDash.contena}>
          <TouchableOpacity style={stylesDash.card}>
            <View style={stylesDash.container1}>
              <Text style={stylesDash.nore}>Your queue number is:</Text>
              <Text style={stylesDash.resit}>{this.state.queue_no}</Text>
              <Text style={stylesDash.nore1}>
                Visit Hospital :{this.state.hfc_cd_name}
              </Text>
              <Text style={stylesDash.nore1}>
                Department :{this.state.discipline_name}
              </Text>
              <Text style={stylesDash.nore3}>
                Subdiscipline :{this.state.queue_name}
              </Text>

              <Button title="Request latest queue number" onPress={this.show} />
              <Text style={stylesDash.nore2}>
                Please be patient and wait while we serving others. We will be
                serving you soon. Thank you
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </HandleBack>
    );
  }
}
