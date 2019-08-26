import React, { Component } from "react";
import {
  Text,
  ImageBackground,
  View,
  SafeAreaView,
  ScrollView,
  Linking,
  Image,
  Alert,
  TouchableOpacity,
  Platform
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import stylesLocation from "../style/stylesLocation";

const LATITUDE_DELTA = 0.922;
const LONGITUDE_DELTA = 0.1;

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "all",
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      error: null,
      healthCare: healthCare
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };

        this.setState({ initialPosition: initialRegion });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 }
    );

    this.panggilDB();
  }

  // method from programmer need to bind ---------------------------------------------------------------------

  panggilDB = () => {
    fetch("http://192.168.43.114:8082/hospital")
      .then(response => response.json())
      .then(responseJson => {
        const originalHC = responseJson.map(h => {
          return {
            id: h.hfc_id,
            type: h.type,
            name: h.hfc_cd_name,
            description: h.description,
            image: h.image,
            latlng: {
              latitude: parseFloat(h.latitude),
              longitude: parseFloat(h.longitude)
            },
            distance: h.distance
          };
        });
        this.setState({
          ...this.state,
          healthCare: originalHC,
          originalHC: originalHC
        });
      });
  };

  // panggilDB = () => {
  //   fetch("http://192.168.43.114:8082/hospital")
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       this.setState({
  //         dataSource: responseJson
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // ask for location permission -----------------------------------------------------------------------------

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        alert("You can use the location");
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  // end for location permission -----------------------------------------------------------------------------

  async componentWillMount() {
    await requestLocationPermission();
  }

  handleTab = tabKey => {
    let newhealthCare = this.state.originalHC;

    if (tabKey !== "all") {
      newhealthCare = newhealthCare.filter(health => health.type === tabKey);
    }

    this.setState({ active: tabKey, healthCare: newhealthCare });
  };

  renderHeader() {
    const { distance } = this.state;
    return (
      <View style={stylesLocation.headerContainer}>
        <View style={stylesLocation.header}>
          <View style={stylesLocation.distance}>
            <TouchableOpacity
              style={[
                stylesLocation.button,
                stylesLocation.first,
                distance === "AllD" ? stylesLocation.active : null
              ]}
              onPress={() =>
                this.setState({
                  healthCare: this.state.originalHC
                })
              }
            >
              <Text style={stylesLocation.jarak}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                stylesLocation.button,
                distance === "1Km" ? stylesLocation.active : null
              ]}
              onPress={() =>
                this.setState({
                  healthCare: this.state.originalHC.filter(h => {
                    return parseInt(h.distance) <= 1;
                  })
                })
              }
            >
              <Text style={stylesLocation.jarak}>1Km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                stylesLocation.button,
                distance === "5Km" ? stylesLocation.active : null
              ]}
              onPress={() =>
                this.setState({
                  healthCare: this.state.originalHC.filter(h => {
                    return parseInt(h.distance) <= 5;
                  })
                })
              }
            >
              <Text style={stylesLocation.jarak}>5Km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                stylesLocation.button,
                stylesLocation.last,
                distance === "10Km" ? stylesLocation.active : null
              ]}
              onPress={() =>
                this.setState({
                  healthCare: this.state.originalHC.filter(h => {
                    return parseInt(h.distance) <= 10;
                  })
                })
              }
            >
              <Text style={stylesLocation.jarak}>10Km</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.renderTabs()}
      </View>
    );
  }

  // method link to google map --------------------------------------------------------------------------------

  openGps = (lat, lon) => {
    var scheme = Platform.OS === "android" ? "geo:" : "maps:";
    var url = scheme + "" + lat + "," + lon;
    this.openExternalApp(url);
  };

  openExternalApp = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("ERROR", "Unable to open: " + url, [{ text: "OK" }]);
      }
    });
  };

  // method end link to google map ----------------------------------------------------------------------------

  // map rendering --------------------------------------------------------------------------------------------

  renderMap() {
    const healthMarker = ({ type }) => (
      // <View style={[stylesLocation[`${type}Marker`]]}>
      <View>
        {type === "hospital" ? (
          <Image
            source={require("../assets/hosp.png")}
            style={{ height: 20, width: 20 }}
          />
        ) : (
          <Image
            source={require("../assets/clinic.png")}
            style={{ height: 20, width: 20 }}
          />
        )}
      </View>
    );

    let myLocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    const { latitude, longitude } = this.state.initialPosition;

    if (latitude) {
      return (
        <MapView
          showsUserLocation={true}
          style={stylesLocation.map}
          // initialRegion={initialRegion}
          initialRegion={this.state.initialPosition}
          toolbarEnabled={true}
          coordinate={myLocation}
        >
          {this.state.healthCare.map(marker => (
            <Marker
              key={marker.id}
              // key={`marker-${marker.id}`}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              onPress={() =>
                this.openGps(marker.latlng.latitude, marker.latlng.longitude)
              }
            >
              {healthMarker(marker)}
            </Marker>
          ))}
        </MapView>
      );
    }
    return (
      <MapView
        initialRegion={{
          latitude: 4.5693754,
          longitude: 102.2656823,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }

  // end map rendering ----------------------------------------------------------------------------------------

  // tab rendering --------------------------------------------------------------------------------------------

  renderTabs() {
    const { active } = this.state;
    return (
      <View style={stylesLocation.tabs}>
        <View
          style={[
            stylesLocation.tab,
            active === "all" ? stylesLocation.activeTab : null
          ]}
        >
          <Text
            style={[
              stylesLocation.tabTitle,
              active === "all" ? stylesLocation.activeTabTitle : null
            ]}
            onPress={() => this.handleTab("all")}
          >
            All
          </Text>
        </View>
        <View
          style={[
            stylesLocation.tab,
            active === "hospital" ? stylesLocation.activeTab : null
          ]}
        >
          <Text
            style={[
              stylesLocation.tabTitle,
              active === "hospital" ? stylesLocation.activeTabTitle : null
            ]}
            onPress={() => this.handleTab("hospital")}
          >
            Hospital
          </Text>
        </View>
        <View
          style={[
            stylesLocation.tab,
            active === "clinic" ? stylesLocation.activeTab : null
          ]}
        >
          <Text
            style={[
              stylesLocation.tabTitle,
              active === "clinic" ? stylesLocation.activeTabTitle : null
            ]}
            onPress={() => this.handleTab("clinic")}
          >
            Clinic
          </Text>
        </View>
      </View>
    );
  }

  // end tab rendering ----------------------------------------------------------------------------------------

  // hospital list rendering ----------------------------------------------------------------------------------

  renderList() {
    return this.state.healthCare.map(health => {
      return (
        <View key={`health -${health.id}`} style={stylesLocation.health}>
          <View style={{ flex: 1, borderRadius: 14 }}>
            <ImageBackground
              style={stylesLocation.healthImage}
              imageStyle={stylesLocation.healthImage}
              source={{ uri: health.image }}
            />
          </View>

          <View style={stylesLocation.healthDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {health.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#A5A5A5",
                  paddingVertical: 5
                }}
              >
                {health.description}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }} />
          </View>
        </View>
      );
    });
  }

  // hospital end list rendering ------------------------------------------------------------------------------

  // main rendering -------------------------------------------------------------------------------------------

  render() {
    return (
      <SafeAreaView style={stylesLocation.container}>
        {this.renderHeader()}
        {this.renderMap()}
        <ScrollView style={stylesLocation.container}>
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // end of main rendering -------------------------------------------------------------------------------------
}

const healthCare = [
  {
    id: 1,
    type: "hospital",
    name: "Hospital Alor Gajah",
    description: "Jalan Paya Datok / Simpang, 78000 Alor Gajah, Melaka",
    image:
      "https://images.unsplash.com/photo-1525811902-f2342640856e?fit=crop&w=900&h=600&q=130",
    latlng: {
      latitude: 2.3955491,
      longitude: 102.20065
    }
  }
];
