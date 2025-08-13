import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Button title="➕ Add Friend" onPress={() => alert("Add Friend feature coming soon")} />
      <Text style={styles.title}>My Friends</Text>
      {/* TODO: Fetch friends list from backend */}
      <Text>No friends yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingTop: 40, flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
});
