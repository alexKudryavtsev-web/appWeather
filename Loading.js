import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.text}>Получение данных</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#FDF6AA",
  },
  text: {
    fontSize: 30,
    color: "#2C2C2C",
  },
});
