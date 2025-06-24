import DeleteModal from "@/components/DeleteModal";
import DropList from "@/components/DropList";
import SearchAndFilterSection from "@/components/SearchAndFilter";
import TaskItem from "@/components/TaskItem";
import { useAppDispatch, useAppSelector } from "@/store";
import { setName } from "@/store/createTaskSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
  priority: string;
}

const indexMapping = ["", "true", "false"];

export default function HomeScreen() {
  const { name, priority } = useAppSelector((state) => state.createTask);
  const { searchQuery, filterdPriority, selectedIndex } = useAppSelector(
    (state) => state.searchAndFilter
  );
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery != null && searchQuery !== "")
      params.append("name", searchQuery);
    if (filterdPriority != null && filterdPriority !== "")
      params.append("priority", filterdPriority);
    if (selectedIndex !== 0) {
      params.append("isCompleted", indexMapping[selectedIndex]);
    }
    fetch(`http://192.168.50.234:8080/api/tasks?${params.toString()}`)
      .then(async (response) => {
        const json = await response.json();
        if (response.ok) return json;
      })
      .then((json) => setTasks(json.tasks));
  }, [searchQuery, filterdPriority, selectedIndex]);

  const handleCreateTask = () => {
    fetch("http://192.168.50.234:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        isCompleted: false,
        priority,
      }),
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 201) return json;
      })
      .then((json) => {
        setIsFocus(false);
        dispatch(setName(""));
        setTasks([...tasks, json.task]);
      });
    dispatch(setName(""));
  };

  return (
    <SafeAreaProvider>
      <DeleteModal />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your to do</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Add new task"
            style={[styles.input, isFocus && { borderBottomWidth: 1 }]}
            onChangeText={(text) => dispatch(setName(text))}
            value={name}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          <AntDesign
            name="plussquare"
            size={45}
            color="black"
            onPress={() => handleCreateTask()}
          />
        </View>
        <DropList />
        <ScrollView showsVerticalScrollIndicator={false}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              name={task.name}
              isCompleted={task.isCompleted}
            />
          ))}
        </ScrollView>
        <SearchAndFilterSection />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: 10,
    paddingHorizontal: 30,
    gap: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
});
