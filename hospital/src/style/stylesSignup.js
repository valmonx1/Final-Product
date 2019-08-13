import { Text, View, StyleSheet } from "react-native";

const stylesSignup = StyleSheet.create({
  container: {
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

  TextInputStyleClass: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10
  },
  buttonContainer: {
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
  text: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 80,
    marginBottom: 30
  },
  MainContainer: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    fontSize: 16,
    color: "#ffffff"
  }
});

export default stylesSignup;
