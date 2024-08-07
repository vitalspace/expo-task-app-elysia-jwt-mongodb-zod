import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useFocusEffect, router } from "expo-router";
import userStore from "../stores/userStore";
import { getTasks } from "../services/task.services";

export default function Tasks() {
  const { profile } = userStore();

  const [tasks, setTasks] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  const fetchTasks = useCallback(() => {
    getTasks().then((response) => {
      setTasks(response.data.tasks);
      setShowEmptyMessage(response.data.tasks.length === 0);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  return (
    <View className="bg-[#1A1A1A] h-screen">
      <View className="px-4 gap-y-4 w-full">
        <View className="flex pt-2">
          <Text className="text-white font-bold text-3xl">Hello</Text>
          <Text className="text-white font-bold text-3xl">{profile?.name}</Text>
        </View>

        <View className="flex gap-y-4 ">
          <Text className="text-white">Categories</Text>

          {showEmptyMessage ? (
            <Text className="text-white">No tasks yet</Text>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ gap: 10, width: "100%" }}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => router.replace(`/${item._id}`)}
                  index={index}
                >
                  {item.completed ? (
                    <View className="bg-[#333333] p-4 rounded-lg border border-green-500">
                      <Text className="text-white">Id: {item._id.slice(0, 5)}</Text>
                      <Text className="text-white">{item.title}</Text>
                    </View>
                  ) : (
                    <View className="bg-[#333333] p-4 rounded-lg">
                      <Text className="text-white">Id: {item._id.slice(0, 5)}</Text>
                      <Text className="text-white">{item.title}</Text>
                    </View>
                  )}
                </Pressable>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}
