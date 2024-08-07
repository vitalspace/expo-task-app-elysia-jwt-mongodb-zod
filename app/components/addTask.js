import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import { AxiosError } from "axios";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";
import { createTaskSchema } from "../schemas/task.schemas";
import { createTask } from "../services/task.services";

const StyledPicker = styled(Picker);

export function AddTask() {
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Daily");

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setType("Daily");
  };

  const handeForSubmit = async () => {
    try {
      createTaskSchema.parse({ title, description, type });
      const response = await createTask({
        title,
        description,
        type,
      });
      Alert.alert("Success", response.data.message);
      clearFields();
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert("Error", error.response?.data?.message || "Unknown error");
      } else if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
        clearFields();
        setTimeout(() => setErrors({}), 3000);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  return (
    <View className="bg-[#1A1A1A] h-screen flex-1 justify-center  items-center">
      <View className=" w-full px-4 space-y-4">
        <View className="flex items-center">
          <FontAwesome5 name="file" size={100} color="white" />
        </View>

        <View className="flex space-y-4">
          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={"white"}
          />

          {errors.title && <Text className="text-red-500">{errors.title}</Text>}

          <TextInput
            className="bg-[#333333] text-white px-2 py-1 rounded-lg"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={"white"}
          />

          {errors.description && (
            <Text className="text-red-500">{errors.description}</Text>
          )}

          <View className="bg-[#333333] rounded-lg">
            <StyledPicker
              type={type}
              onValueChange={(itemValue, itemIndex) =>
                setType(itemValue)
              }
              mode="dropdown"
              placeholder="Priority"
              className="-my-2 text-white -ml-2"
            >
              <Picker.Item label="Daily" value="Daily" />
              <Picker.Item label="Work" value="Work" />
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Leisure" value="Leisure" />
              <Picker.Item label="Health" value="Health" />
              <Picker.Item label="Relationship" value="Relationship" />
              <Picker.Item label="Finance" value="Finance" />
            </StyledPicker>
          </View>

          <Pressable
            className="bg-[#1E90FF] py-1 rounded-lg"
            onPress={handeForSubmit}
          >
            <Text className="text-white font-bold text-center text-lg">
              Add
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
