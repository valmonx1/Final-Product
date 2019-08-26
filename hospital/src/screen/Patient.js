import React, { Component } from "react";
import {
  Text,
  View,
  Picker,
  ActivityIndicator,
  Button,
  StatusBar,
  Alert,
  AsyncStorage
} from "react-native";
import styles from "../style/styles";
import HandleBack from "./backApp";

console.disableYellowBox = true;
export default class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      hfc_cd: "",
      discipline_cd: "",
      queue_name: "",
      dataSourceDiscipline: [],
      dataSourceSubDiscipline: [],
      //patient id : 0 is default not from database
      pmi_no: 0
    };
  }

  componentDidMount() {
    fetch("http://192.168.43.114:8082/hospital")
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

    // set patient id from asynchronous storage
    this.getPatient_id().then(pmi_no => {
      this.state.pmi_no = pmi_no;
    });
  }

  getStorageItem = async () => {
    let item = await AsyncStorage.getItem("discipline_cd");

    return item;
  };

  GetPickerSelectedItemValue = async () => {
    const { pmi_no, hfc_cd, discipline_cd } = this.state;
    if (pmi_no == "") {
      alert("patient id not found");
    } else if (hfc_cd == "") {
      alert("Please select Hospital");
    } else if (discipline_cd == "") {
      alert("Please select Discipline");
    } else {
      fetch("http://192.168.43.114:8082/select_pms_last_queue", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pmi_no: this.state.pmi_no,
          hfc_cd: this.state.hfc_cd,
          discipline_cd: this.state.discipline_cd,
          queue_name: this.state.queue_name
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.success === true) {
            alert(responseJson.message);
          } else {
            alert(responseJson.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  // get patient id from asynchronous storage
  getPatient_id = async () => {
    let pmi_no = await AsyncStorage.getItem("pmi_no");
    return pmi_no;
  };

  // Save hfc_cd to asynchronous storage
  // Jadi kita panggil function ni selepas user tu click hospital yang mana
  saveHFC_cd = async hfc_cd => {
    await AsyncStorage.setItem("hfc_cd", JSON.stringify(hfc_cd));
  };

  // Save disc_cd to asynchronous storage
  // Jadi kita panggil function ni selepas user tu click displine yang mana
  saveDiscipline_cd = async disc_cd => {
    await AsyncStorage.setItem("disc_cd", JSON.stringify(disc_cd));
    // localStorage.setItem("disc_cd", JSON.stringify(disc_cd));
  };

  // Function to get all the discipline using selected hospital ID
  getDiscplineValue = selectedHospId => {
    // Set the current Hospital picker value to the selected hospital ID
    this.state.hfc_cd = selectedHospId;
    // alert(this.state.hfc_cd);
    this.state.isLoading = true;
    //pegang id
    fetch("http://192.168.43.114:8082/discipline/" + selectedHospId)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSourceDiscipline: responseJson,
          isLoading: false
        });
      });
    // Kita nak save hospital_id, jadi panggil function ni, lalu kirim selectedHospId nya
    this.saveHFC_cd(selectedHospId);
  };

  getQueueValues = selectedDiscpId => {
    this.state.discipline_cd = selectedDiscpId;
    this.setState({ discipline_cd: selectedDiscpId });
    // alert(this.state.discipline_cd);
    //this.state.hfc_cd bawa balik dari selectedhospid
    fetch(
      "http://192.168.43.114:8082/queue_name/" +
        this.state.hfc_cd +
        "/" +
        this.state.discipline_cd
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSourceSubDiscipline: responseJson
        });
      });
    // Kita nak save discpline_cd, jadi panggil function ni, lalu kirim selectedDiscpId nya
    this.saveDiscipline_cd(selectedDiscpId);
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
        <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
        <Text style={styles.con}>Home</Text>
        <View style={styles.container1}>
          <View style={styles.jarak}>
            <View style={styles.MainContainer}>
              <Picker
                selectedValue={this.state.hfc_cd}
                onValueChange={(itemValue, itemIndex) =>
                  // send hosp Id to disp
                  this.getDiscplineValue(itemValue)
                }
              >
                <Picker.Item label={"Please select Hospital"} />
                {this.state.dataSource.map((item, key) => (
                  <Picker.Item
                    label={item.hfc_cd_name}
                    value={item.hfc_cd}
                    key={key}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.jarak}>
            <View style={styles.MainContainer}>
              <Picker
                selectedValue={this.state.discipline_cd}
                onValueChange={
                  (itemValue, itemIndex) =>
                    // send disp id to sub
                    this.getQueueValues(itemValue)
                  // this.setState({ discipline_cd: itemValue })
                }
              >
                <Picker.Item label={"Please select discipline"} />
                {this.state.dataSourceDiscipline.map((item, key) => (
                  <Picker.Item
                    label={item.discipline_name}
                    value={item.discipline_cd}
                    key={key}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.jarak}>
            <View style={styles.MainContainer}>
              <Picker
                selectedValue={this.state.queue_name}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ queue_name: itemValue })
                }
              >
                <Picker.Item label={"Please select Queue"} />
                {this.state.dataSourceSubDiscipline.map((item, key) => (
                  <Picker.Item
                    label={item.queue_name}
                    value={item.queue_name}
                    key={key}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.button}>
            <Button
              title="Get Queue Number"
              onPress={this.GetPickerSelectedItemValue}
            />
          </View>
          <View />
        </View>
      </HandleBack>
    );
  }
}
