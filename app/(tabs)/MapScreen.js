import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "web") return;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      console.log("📍 Current Location:", loc.coords);
      setLocation(loc.coords);
    })();
  }, []);

  if (Platform.OS === "web") {
    return (
      <View style={styles.center}>
        <Text>Map is only available on mobile</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      mapType="standard"
      showsUserLocation={true}
      followsUserLocation={true}
      initialRegion={{
        latitude: location?.latitude, // fallback to SF
        longitude: location?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={location} title="You are here" />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1, marginTop: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
