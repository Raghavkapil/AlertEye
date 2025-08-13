import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";

export default function PanicScreen() {
  const [loading, setLoading] = useState(false);
  const API_URL = Constants.expoConfig.extra.API_URL; // From app.json

  const handlePanic = async () => {
    setLoading(true);

    try {
      // Ask for location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        setLoading(false);
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Send panic alert to backend
      const response = await fetch(`${API_URL}/api/incidents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "testUser", // Replace with real logged-in user ID
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Alert.alert("Panic Sent", "Your location has been shared successfully.");
    } catch (error) {
      console.error("Error sending panic alert:", error);
      Alert.alert("Error", "Could not send panic alert.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="red" />
          <Text>Sending panic alert...</Text>
        </>
      ) : (
        <Button title="🚨 Panic Button" color="red" onPress={handlePanic} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
