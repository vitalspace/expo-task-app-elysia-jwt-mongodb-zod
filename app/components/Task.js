import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Switch, Text, TextInput, View } from "react-native";
import { z } from "zod";
import { updateTaskSchema } from "../schemas/task.schemas";
import { deleteTask, updateTask } from "../services/task.services";

export default function Task({ id, title, description, state, author, type }) {
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(state);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
    setIsChecked(state);
  }, [title, description, state]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    router.back();
  };

  const handleUpdate = async () => {
    try {
      updateTaskSchema.parse({
        title: newTitle,
        description: newDescription,
        completed: isChecked,
      });

      const { data } = await updateTask(id, {
        title: newTitle,
        description: newDescription,
        completed: isChecked,
      });

      setIsEditing(false);
      setNewTitle(data.newData.title);
      setNewDescription(data.newData.description);
      setIsChecked(data.newData.completed);

      Alert.alert("Success", data.message);
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
    <View className="bg-[#1A1A1A] h-screen flex-1 justify-center items-center">
      <View className="w-full space-y-4 px-4">
        <View className="flex items-center">
          <FontAwesome6 name="book-open" size={100} color="white" />
        </View>

        {isEditing ? (
          <TextInput
            className="bg-[#333333] px-2 py-2 rounded-lg text-white"
            placeholder="Title"
            value={newTitle}
            onChangeText={setNewTitle}
          />
        ) : (
          <View className="bg-[#333333] px-2 py-3 rounded-lg">
            <Text className="text-white font-bold">{newTitle}</Text>
          </View>
        )}

        {errors.title && <Text className="text-red-500">{errors.title}</Text>}

        {isEditing ? (
          <TextInput
            className="bg-[#333333] px-2 py-2 rounded-lg text-white"
            placeholder="Description"
            value={newDescription}
            onChangeText={setNewDescription}
          />
        ) : (
          <View className="bg-[#333333] px-2 py-3 rounded-lg">
            <Text className="text-white font-bold">{newDescription}</Text>
          </View>
        )}

        {errors.description && (
          <Text className="text-red-500">{errors.description}</Text>
        )}

        <View className="flex items-start">
          <View className="flex flex-row items-center">
            <Text className="text-white">Completed:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              value={isChecked}
              onValueChange={() => setIsChecked(!isChecked)}
            />
          </View>
        </View>

        {isEditing ? (
          <View className="flex flex-row justify-between">
            <Pressable
              className="bg-blue-500 px-2 py-2 rounded-lg basis-44"
              onPress={handleUpdate}
            >
              <Text className="text-white font-bold text-base text-center">
                Update
              </Text>
            </Pressable>
            <Pressable
              className="bg-red-500 px-2 py-2 rounded-lg basis-44"
              onPress={handleEdit}
            >
              <Text className="text-white font-bold text-base text-center">
                Cancel
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="flex flex-row justify-between">
            <Pressable
              className="bg-blue-500 px-2 py-2 rounded-lg basis-44"
              onPress={handleEdit}
            >
              <Text className="text-white font-bold text-base text-center">
                Edit
              </Text>
            </Pressable>
            <Pressable
              className="bg-red-500 px-2 py-2 rounded-lg basis-44"
              onPress={handleDelete.bind(this, id)}
            >
              <Text className="text-white font-bold text-base text-center">
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
