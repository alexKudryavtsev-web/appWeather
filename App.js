import React from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

import Loading from "./Loading";
import Weather from "./Weather";

const API_KEY = "293d8140d610ded0427f1a69d23964ce";

export default class extends React.Component {
  state = {
    isLoading: true,
    latitude: null,
    longitude: null,
    temp: null,
    condition: null
  };

  async getLocation() {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      const { temp, condition } = await this.getWeather(latitude, longitude);
      
      this.setState({
        isLoading: false,
        latitude,
        longitude,
        temp,
        condition
      });
    } catch (error) {
      Alert.alert("Не могу определить локацию", "Очень грустно :(");
    }
  }

  async getWeather(latitude, longitude) {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appId=${API_KEY}&units=metric`
    );

    return {
      temp: data.main.temp,
      condition: data.weather[0].main
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return this.state.isLoading ? <Loading /> : <Weather temp={this.state.temp} condition={this.state.condition} />;
  }
}
