// Profile.js
import React from "react";
import { View, Text, Image, Pressable, Switch } from "react-native";
import useUserStore from "../stores/userStore";

import ProfileImage from "../assets/aC6Swi78wZJuMLvra0z9W.png";
import { Link } from "expo-router";

export function Profile() {
  const { profile } = useUserStore();

  return (
    <View className="bg-[#1A1A1A] h-screen flex-1 justify-center items-center">
      <View className="px-4  gap-y-4  w-full">
        <View className="flex items-center justify-center">
          <View className="border border-white rounded-full flex items-center justify-center">
            <Image
              source={{
                uri: "https://images.playground.com/8a1fd83d77274e90ba5c72e6378afbb5.jpeg",
              }}
              className="w-40 h-40 rounded-full"
            />
          </View>
        </View>

        <View className="flex flex-col items-center gap-y-1 ">
          <Text className="text-white font-bold text-3xl">{profile?.name}</Text>
          <Text className="text-gray-500 font-bold text-base">
            @{profile?.username}
          </Text>
          <Link href={"/editProfile"} asChild>
            <Pressable className="py-1 bg-blue-500 rounded-lg px-4">
              <Text className="text-white font-bold text-sms">
                Edit profile
              </Text>
            </Pressable>
          </Link>
        </View>

        <View>
          <View className="flex space-y-1 py-2">
            <Text className="text-gray-500 text-xs">Notifications</Text>
            <View className="flex flex-row items-center justify-between bg-[#333333] px-2 py-1 rounded-lg">
              <Text className="text-white font-bold ">
                Turn on notifications
              </Text>

              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                // ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
              ></Switch>
            </View>
          </View>

          <View className="flex space-y-1">
            <Text className="text-gray-500 text-xs">Inviteb link</Text>
            <View className="flex flex-row items-center justify-between bg-[#333333] px-2 py-4 rounded-lg">
              <Text className="text-white font-bold ">Invite friends</Text>

              <Pressable className="bg-blue-500 mr-2 px-2 py-1 rounded-lg">
                <Text className="text-white font-bold text-center">Invite</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
