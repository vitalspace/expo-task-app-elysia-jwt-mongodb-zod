import { AxiosError } from "axios";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";
import Hero from "../assets/VDJVc4bg7k0YnP9Vu8PoR.png";
import { singupSchema } from "../schemas/user.schemas";
import { signUp } from "../services/user.services";

export function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignUp = async () => {
    try {
      singupSchema.parse({ name, username, email, password });

      const response = await signUp({ name, username, email, password });
      Alert.alert("Success", response.data.message);
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
    <View className="bg-[#1A1A1A] h-screen">
      <StatusBar style="dark" />

      <View className="px-4 flex-1 items-center justify-center gap-y-4">
        <View className="flex items-center">
          <Image source={Hero} className="w-40 h-40 " />
        </View>
        <View className="flex gap-y-4 w-full">
          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={"white"}
          />

          {errors.name && <Text className="text-red-500">{errors.name}</Text>}

          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
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

          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor={"white"}
          />

          {errors.password && (
            <Text className="text-red-500">{errors.password}</Text>
          )}

          <Pressable
            className="bg-[#1E90FF] py-1 rounded-lg"
            onPress={handleSignUp}
          >
            <Text className="text-white font-bold text-center text-lg">
              Sign Up
            </Text>
          </Pressable>
        </View>
        <Link asChild href="/signin">
          <Text className="text-white font-bold text-center text-sm">
            Already have an account?{" "}
            <Text className="text-[#1E90FF] font-bold">Sign In</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}
