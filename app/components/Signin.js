import { AxiosError } from "axios";
import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";
import Hero from "../assets/VDJVc4bg7k0YnP9Vu8PoR.png";
import { signinSchema } from "../schemas/user.schemas";
import { signIn } from "../services/user.services";
import useAuthStore from "../stores/store";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);

  const handleSignUp = async () => {
    try {
      signinSchema.parse({ email, password });

      const response = await signIn({ email, password });
      Alert.alert("Success", response.data.message);

      try {
        await login(response.data.token);
      } catch (error) {
        console.log(error);
      }
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

  if (isAuthenticated) {
    return <Redirect href="/protected" />;
  }

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
              Sign In
            </Text>
          </Pressable>
        </View>
        <Link asChild href="/signup">
          <Text className="text-white font-bold text-center text-sm">
            Don't have an account yet?{" "}
            <Text className="text-[#1E90FF] font-bold">Sign Up</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}
