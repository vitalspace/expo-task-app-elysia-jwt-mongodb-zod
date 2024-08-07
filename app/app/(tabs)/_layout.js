import { Tabs, router } from "expo-router";
import { View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={18} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "Add Task",
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="plus-circle" size={18} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={18} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="[id]"
        options={{
          title: "Task",
          href: null,
          headerLeft: () => (
            <View className="ml-4">
              <FontAwesome5
                name="arrow-left"
                size={20}
                color="black"
                onPress={() => router.replace("/(tabs)")}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="editProfile"
        options={{
          title: "Edit Profile",
          href: null,
          headerLeft: () => (
            <View className="ml-4">
              <FontAwesome5
                name="arrow-left"
                size={20}
                color="black"
                onPress={() => router.replace("/profile")}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
