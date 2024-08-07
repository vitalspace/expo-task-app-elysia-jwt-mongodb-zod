import { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import Task from "../../components/Task";
import { getTask } from "../../services/task.services";

export default function TaskPage() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    getTask(id).then((response) => {
      setTask(response.data.task);
    });
  }, [id]);

  // useFocusEffect(
  //   useCallback(() => {
  //     getTask(id).then((response) => {
  //       setTask(response.data.task);
  //     });
  //   }, [id])
  // );

  if (!task) {
    return <Text>Loading...</Text>;
  }

  const { _id, title, description, completed, author, type } = task;

  return (
    <Task
      id={_id}
      title={title}
      description={description}
      state={completed}
      author={author}
      type={type}
    />
  );
}
