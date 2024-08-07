import { Link } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Hero from "../assets/aC6Swi78wZJuMLvra0z9W.png";
import useAuthStore from "../stores/store";
import useUserStore from "../stores/userStore";

export function Home() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const { initialize } = useUserStore();

  useEffect(() => {
    checkAuth();
    initialize();
  }, []);

  return (
    <View className="bg-black flex-1 items-center justify-center">
      <View className="px-4 gap-y-6">
        <View className="flex items-center">
          <Image source={Hero} className="w-72 h-72" />
        </View>

        <View>
          <Text className="text-white font-bold text-5xl">
            The only productivity app you need
          </Text>
        </View>

        {/* Cambiar el texto y la ruta según el estado de autenticación */}
        <View>
          <Link asChild href={isAuthenticated ? "/profile" : "/signup"}>
            <Pressable
              className={`bg-blue-400 py-3 rounded-2xl ${
                isAuthenticated ? "hidden" : ""
              }`}
            >
              <Text className="text-white font-bold text-center text-lg">
                Sign in with email
              </Text>
            </Pressable>
          </Link>
        </View>

        <View className="flex flex-row justify-between">
          {isAuthenticated ? (
            <Link href={"/(tabs)"} asChild>
              <Pressable className="py-2 rounded-2xl w-full bg-blue-400">
                <Text className="text-white font-bold text-center text-lg">
                  Home
                </Text>
              </Pressable>
            </Link>
          ) : (
            <View>
              <Link href={"/signup"} asChild>
                <Pressable className="py-2 rounded-2xl px-12 bg-blue-400">
                  <Text className="text-white font-bold text-center text-lg">
                    Sign up
                  </Text>
                </Pressable>
              </Link>
              <View>
                <Text className="text-gray-500 font-bold text-center text-md">
                  By Continuing, you agree to the terms and conditions
                </Text>
              </View>
            </View>
          )}

          {/* <Link href={"/(tabs)"} asChild>
            <Pressable className="py-2 rounded-2xl px-12 border border-gray-500">
              <Text className="text-white font-bold text-center text-lg">
                Google
              </Text>
            </Pressable>
          </Link>

          <Pressable className="py-2 rounded-2xl px-12 border border-gray-500">
            <Text className="text-white font-bold text-center text-lg">
              Apple Id
            </Text>
          </Pressable>
          */}
        </View>
      </View>
    </View>
  );
}
