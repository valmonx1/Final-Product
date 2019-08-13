import { Text, View, StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

const stylesLocation = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: 14
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange"
  },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFF"
  },
  hospitalMarker: {
    // backgroundColor: "red"
  },
  clinicMarker: {
    // backgroundColor: "red"
  },
  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  tabs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: height * 0.05
  },
  tab: {
    paddingHorizontal: 20,
    marginHorizontal: 10
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 16
  },
  activeTab: {
    borderBottomColor: "orange",
    borderBottomWidth: 3
  },
  activeTabTitle: {
    color: "orange"
  },
  map: {
    flex: 1
  },
  health: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 0.5,
    padding: 15
  },
  healthDetails: {
    flex: 2,
    paddingLeft: 14,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  healthImage: {
    width: width * 0.3,
    height: width * 0.15,
    borderRadius: 6
  },
  section: {
    flexDirection: "column",
    paddingHorizontal: 14,
    paddingVertical: 24
  },
  filter: {
    fontSize: 15
  },
  distance: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FF7657",
    justifyContent: "space-between"
  },
  jarak: {
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    flex: 1,
    padding: 7,
    alignContent: "center"
    // fontWeight: "bold"
  },
  first: {
    borderBottomLeftRadius: 14,
    borderTopLeftRadius: 14
  },
  last: {
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14
  },
  active: {
    backgroundColor: "#FF7657",
    color: "#FFF"
  }
});

export default stylesLocation;
