import React from "react";
import { View, Button, Alert } from "react-native";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

export default function PanicScreen() {
  const triggerAlert = async () => {
    // Request Camera permission
    let { status: camStatus } = await Camera.requestCameraPermissionsAsync();
    if (camStatus !== "granted") {
      Alert.alert("Camera permission not granted");
      return;
    }

    // Request Location
    let { status: locStatus } = await Location.requestForegroundPermissionsAsync();
    if (locStatus !== "granted") {
      Alert.alert("Location permission not granted");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    Alert.alert(
      "Panic Alert",
      `Recording started & location: ${location.coords.latitude}, ${location.coords.longitude}`
    );

    // TODO: Start video recording & send location to backend
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Trigger Panic Alert" color="red" onPress={triggerAlert} />
    </View>
  );
}
