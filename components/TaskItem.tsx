import { StyleSheet, View, Text } from "react-native";
import { Checkbox } from "@futurejj/react-native-checkbox";
import { primary } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { Task } from "@/app/(tabs)";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDeleteTaskId, setIsOpen, setTasks } from "@/store/appSlice";
import { apiDomain, apiPort } from "@/constants/api";

export default function TaskItem({ id, name, isCompleted, priority }: Task) {
  const { isOpen, tasks } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleUpdateStatus = () => {
    fetch(`http://${apiDomain}:${apiPort}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !isCompleted,
      }),
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) return json;
      })
      .then((json) => {
        dispatch(
          setTasks(tasks.map((task) => (task.id === id ? json.task : task)))
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Checkbox
          status={isCompleted ? "checked" : "unchecked"}
          onPress={() => handleUpdateStatus()}
          color={primary}
          uncheckedColor={primary}
          size={25}
        />
        <Text
          style={[
            styles.title,
            isCompleted ? { textDecorationLine: "line-through" } : {},
          ]}
          numberOfLines={3}
        >
          {name}
        </Text>
      </View>
      <View style={styles.btnWrapper}>
        {priority && (
          <View
            style={[
              styles.banner,
              priority === "HIGH" && styles.HighPriority,
              priority === "MEDIUM" && styles.MediumPriority,
              priority === "LOW" && styles.LowPriority,
            ]}
          >
            <Text
              style={[
                styles.priority,
                priority === "HIGH" && { color: "red" },
                priority === "MEDIUM" && { color: "blue" },
                priority === "LOW" && { color: "green" },
              ]}
            >
              {priority === "HIGH"
                ? "High"
                : priority === "MEDIUM"
                ? "Medium"
                : "Low"}
            </Text>
          </View>
        )}
        <Feather
          name="x"
          size={20}
          color="black"
          onPress={() => {
            dispatch(setIsOpen(!isOpen));
            dispatch(setDeleteTaskId(id));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 10,
    marginBottom: 10,
  },
  contentWrapper: {
    width: 170,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  btnWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },
  banner: {
    borderRadius: 10,
  },
  priority: {
    fontWeight: 600,
  },
  title: {
    fontSize: 18,
    width: "100%",
  },
  HighPriority: {
    backgroundColor: "#ffcccc",
    borderWidth: 2,
    borderColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  MediumPriority: {
    backgroundColor: "#80b3ff",
    borderWidth: 2,
    borderColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  LowPriority: {
    backgroundColor: "#99e699",
    borderWidth: 2,
    borderColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 22,
  },
});
