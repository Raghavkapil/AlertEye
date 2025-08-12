import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "black", height: 70 },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="MapScreen"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="PanicScreen"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View style={styles.panicButton}>
              <Ionicons name="alert" size={28} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="FriendsScreen"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  panicButton: {
    backgroundColor: "red",
    borderRadius: 35,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
