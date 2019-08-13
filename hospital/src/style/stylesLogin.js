import { Text, View, StyleSheet } from "react-native";

const stylesLogin = StyleSheet.create({
  container1: {
    backgroundColor: "#37474f",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },

  containerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  TextInputStyleClass: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10
  },
  TextComponentStyle: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15
  },
  buttonConatiner: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },
  button: {
    paddingBottom: 1
  },
  logo: {
    width: 100,
    height: 100
  },
  signupTextCont: {
    // flexGrow: 1,
    // alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row"
  },
  signupText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16
  },
  signupTextButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  },
  MainContainer: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    fontSize: 16,
    color: "#ffffff"
  }
});

export default stylesLogin;
