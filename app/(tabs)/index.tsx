import DeleteModal from "@/components/DeleteModal";
import DropList from "@/components/DropList";
import SearchAndFilterSection from "@/components/SearchAndFilter";
import TaskItem from "@/components/TaskItem";
import { useDebouce } from "@/hooks/useDebouce";
import { useAppDispatch, useAppSelector } from "@/store";
import { setFilterOpen, setLoading, setTasks, update } from "@/store/appSlice";
import { setName } from "@/store/createTaskSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoadingDots from "react-native-loading-dots";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/constants/ToastConfig";
import { apiDomain, apiPort } from "@/constants/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
  const { tasks, isLoading, isUpdate, filterOpen } = useAppSelector(
    (state) => state.app
  );
  const deboucedSearch = useDebouce(searchQuery, 500);
  useEffect(() => {
    dispatch(setLoading(true));
    const params = new URLSearchParams();
    if (searchQuery != null && searchQuery !== "")
      params.append("name", searchQuery);
    if (filterdPriority != null && filterdPriority !== "")
      params.append("priority", filterdPriority);
    if (selectedIndex !== 0) {
      params.append("isCompleted", indexMapping[selectedIndex]);
    }
    fetch(`http://${apiDomain}:${apiPort}/api/tasks?${params.toString()}`)
      .then(async (response) => {
        const json = await response.json();
        if (response.ok) return json;
      })
      .then((json) => {
        dispatch(setTasks(json.tasks));
        dispatch(setLoading(false));
      })
      .catch((e) => console.log(e));
  }, [deboucedSearch, filterdPriority, selectedIndex, isUpdate]);

  const handleCreateTask = () => {
    dispatch(setLoading(true));
    fetch(`http://${apiDomain}:${apiPort}/api/tasks`, {
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
        else
          Toast.show({
            type: "error",
            text1: "Error",
            text2: json.message,
          });
      })
      .then((json) => {
        setIsFocus(false);
        dispatch(setLoading(false));
        dispatch(setName(""));
        dispatch(update());
        Toast.show({
          type: "success",
          text1: "Success",
          text2: json.message,
        });
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(setName("")));
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <View style={[isLoading ? styles.loadingView : { display: "none" }]}>
          <LoadingDots dots={3} colors={["#4d4d4d", "#4d4d4d", "#4d4d4d"]} />
        </View>
        <DeleteModal />
        <SafeAreaView style={styles.container}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Your to do</Text>
            <Text style={styles.remindMessage}>
              Task todo:{" "}
              {tasks.filter((task) => task.isCompleted === false).length}
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Add new task"
              placeholderTextColor={"#595959"}
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
                id={task.id}
                key={task.id}
                name={task.name}
                priority={task.priority}
                isCompleted={task.isCompleted}
              />
            ))}
          </ScrollView>
          <SearchAndFilterSection />
          {/* {!filterOpen && (
            <View
              style={{
                position: "absolute",
                zIndex: 60,
                right: 30,
                bottom: 50,
                backgroundColor: "#0066ff",
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <MaterialIcons
                name="filter-alt"
                size={30}
                color="white"
                onPress={() => dispatch(setFilterOpen())}
              />
            </View>
          )} */}
          <Toast topOffset={65} config={toastConfig} />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 30,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "relative",
    zIndex: 50,
    gap: 20,
    backgroundColor: "white",
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
  loadingView: {
    position: "absolute",
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  remindMessage: {
    fontSize: 16,
    fontWeight: 600,
  },
});
