import { AxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";
import Hero from "../assets/VDJVc4bg7k0YnP9Vu8PoR.png";
import { updateSchema } from "../schemas/user.schemas";
import { update } from "../services/user.services";
import useUserStore from "../stores/userStore";

export function EditProfile() {
  const { profile, updateProfile } = useUserStore();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(profile.name);
    setUsername(profile.username);
    setEmail(profile.email);
  }, [profile]);

  const handleForSubmit = async () => {
    try {
      updateSchema.parse({ name, username, email });
      const response = await update({ avatar: "", name, username, email });
      Alert.alert("Success", "Profile updated successfully");
      await updateProfile(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert("Error", error.response?.data?.message || "Unknown error");
      } else if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
        setTimeout(() => setErrors({}), 3000);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  return (
    <View className="bg-[#1A1A1A] h-screen flex-1 justify-center items-center px-4">
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center gap-y-4 w-full">
        <View className="flex items-center">
          <Image source={Hero} className="w-40 h-40 " />
        </View>

        <View className="flex gap-y-4 w-full">
          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            placeholderTextColor={"white"}
          />

          {errors.name && <Text className="text-red-500">{errors.name}</Text>}

          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            placeholderTextColor={"white"}
          />

          {errors.username && (
            <Text className="text-red-500">{errors.username}</Text>
          )}

          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={"white"}
          />

          {errors.email && <Text className="text-red-500">{errors.email}</Text>}

          <Pressable
            className="bg-[#1E90FF] py-1 rounded-lg"
            onPress={handleForSubmit}
          >
            <Text className="text-white font-bold text-center text-lg">
              Update
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
