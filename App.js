import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
// custom imports
import Loading from "./Loading.js";
import Weather from "./Weather.js";

const API_KEY = "edf10d3fce66a3d9f5952f66e705b8a3";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [val, setVal] = useState(null);
  const getWeather = async (lat, lon) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    console.log("THE WEATHER", weather);

    setVal({ temp, condition: weather[0].main });
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const status = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          let location = await Location.getCurrentPositionAsync({});
          getWeather(location.coords.latitude, location.coords.longitude);

          return;
        }
      } catch (error) {
        Alert.alert("CANT FIND YOU.", "So Sad");
      }
    })();
  }, []);
  console.log("THE STATE", val, isLoading);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {console.log("THE WEATHER", val)}
          <Weather temp={Math.round(val.temp)} condition={val.condition} />
        </>
      )}
    </>
  );
}
