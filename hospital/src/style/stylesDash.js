import { Text, View, StyleSheet } from "react-native";

const stylesDash = StyleSheet.create({
  statusBar: {
    marginBottom: "6%"
  },

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

  contena: {
    marginTop: 70,
    backgroundColor: "#F5FCFF"
  },
  card: {
    backgroundColor: "#0000",
    marginLeft: "3%",
    width: "94%",
    height: 450
  },
  card1: {
    backgroundColor: "blue",
    marginLeft: "3%",
    width: "94%",
    height: 40,
    borderColor: "black",
    shadowColor: "black",
    shadowOpacity: 1,
    borderRadius: 20,
    marginTop: 20,
    //kena tambah elevation untuk dapatkan shadow dalam android
    elevation: 3,

    shadowRadius: 1,
    shadowOffset: {
      width: 10,
      height: 20
    }
  },
  container1: {
    flex: 1,
    paddingHorizontal: 10
  },
  resit: {
    paddingTop: 20,
    fontSize: 80,
    textAlign: "center",
    paddingBottom: 35
  },
  nore: {
    paddingHorizontal: 100,
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10
  },
  nore1: {
    paddingTop: 1,
    fontSize: 20
  },
  nore2: {
    paddingTop: 15,
    fontSize: 20
  },
  nore3: {
    paddingTop: 1,
    fontSize: 20,
    paddingBottom: 20
  },

  border: {
    paddingTop: 10
  }
});

export default stylesDash;
