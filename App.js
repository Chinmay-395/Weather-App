import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
// custom imports
import Loading from "./Loading.js";

const API_KEY = "edf10d3fce66a3d9f5952f66e705b8a3";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getWeather = async (lat, lon) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    console.log("THE WEATHER", data);
  };

  useEffect(() => {
    (async () => {
      try {
        const status = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          let location = await Location.getCurrentPositionAsync({});
          getWeather(location.coords.latitude, location.coords.longitude);
          setLocation(location);

          setLoading(true);
          return;
        }
      } catch (error) {
        Alert.alert("CANT FIND YOU.", "So Sad");
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      {console.log("THE State 👉👉👉 ", location, text)}
      {/*<View style={styles.container}>
      <View style={styles.yellowView}>
        <Text>Lets 2 go!</Text>
      </View>
      <View style={styles.blueView}>
        <Text>Lets 2 go!</Text>
      </View>

     <Text>Lets 2 go!</Text>
      <Text>Lets 2 go!</Text>
      <StatusBar style="auto" /> 
    </View>*/}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  yellowView: {
    flex: 1,
    backgroundColor: "yellow",
  },
  blueView: {
    flex: 1,
    backgroundColor: "blue",
  },
});
