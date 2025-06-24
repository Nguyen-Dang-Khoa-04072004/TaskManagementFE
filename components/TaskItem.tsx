import { StyleSheet, View, Text } from "react-native";
import { Checkbox } from "@futurejj/react-native-checkbox";
import { useState } from "react";
import { primary } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { Task } from "@/app/(tabs)";


export default function TaskItem({ name, isCompleted }: Task) {
  const [taskStatus, setTaskStatus] = useState(isCompleted);

  const toggleCheckbox = () => {
    setTaskStatus(!taskStatus);
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Checkbox
          status={taskStatus ? "checked" : "unchecked"}
          onPress={toggleCheckbox}
          color={primary}
          uncheckedColor={primary}
          size={25}
        />
        <Text
          style={[
            styles.title,
            taskStatus ? { textDecorationLine: "line-through" } : {},
          ]}
          numberOfLines={3}
        >
          {name}
        </Text>
      </View>
      <View style={styles.btnWrapper}>
        <View style={styles.banner}>
          <Text style={styles.priority}>High</Text>
        </View>
        <Feather name="x" size={20} color="black" />
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
    width:170,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  btnWrapper:{
    flex:1,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    gap:10
  },
  banner: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  priority: {
    fontWeight: 600,
    color: "white",
  },
  title: {
    fontSize: 18,
    width:'100%',
  },
});
