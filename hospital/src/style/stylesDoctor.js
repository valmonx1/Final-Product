import { Text, View, StyleSheet } from "react-native";

const stylesDoctor = StyleSheet.create({
  con: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignSelf: "center",
    fontSize: 20,
    paddingVertical: 13,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#6200EE"
  },
  search: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    paddingLeft: 10,

    height: 40,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 25,
    backgroundColor: "#FFFFFF"
  },
  TextInputStyleClass: {
    paddingLeft: 5,
    textAlign: "left",
    height: 40
  },
  contena: {
    marginTop: 54,
    backgroundColor: "#ffffff",
    height: 555,
    paddingTop: 2
  },
  text1: {
    paddingTop: 3
  },
  imageView: {
    width: "20%",
    height: 90,
    margin: 7,
    borderRadius: 7
  },

  textView: {
    width: "50%",
    textAlignVertical: "center",
    padding: 10,
    color: "#000"
  },
  MainContainer: {
    width: 350,
    backgroundColor: "rgba(192,192,192,0.3)",
    borderRadius: 20
  },
  jarak: {
    paddingBottom: 20,
    borderColor: "#ffffff"
  }
});

export default stylesDoctor;
