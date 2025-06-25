import { View, TextInput, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CheckBox } from "@rneui/themed";
import { primary } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store";
import { filterStatus, search } from "@/store/filterSlice";
import FilterDropList from "./FilterDropList";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { setFilterOpen } from "@/store/appSlice";

interface CheckBoxProps {
  index: number;
  title: string;
}

function CheckBoxComponent({ index, title }: CheckBoxProps) {
  const selectedIndex = useAppSelector(
    (state) => state.searchAndFilter.selectedIndex
  );
  const dispatch = useAppDispatch();
  return (
    <CheckBox
      checked={index === selectedIndex}
      onPress={() => dispatch(filterStatus(index))}
      containerStyle={{ backgroundColor: "none" }}
      checkedColor={primary}
      title={title}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
    />
  );
}

export default function SearchAndFilterSection() {
  const [onFocus, setOnFocus] = useState(false);
  const searchQuery = useAppSelector(
    (state) => state.searchAndFilter.searchQuery
  );
  const dispatch = useAppDispatch();

  return (
    <View style={onFocus ? { height: 357 } : {}}>
      <View style={styles.sectionWrapper}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>Search</Text>
          <Feather name="x" size={25} color="black" onPress={()=> dispatch(setFilterOpen())}/>
        </View>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            placeholder="Search a task"
            placeholderTextColor={"#595959"}
            value={searchQuery}
            onChangeText={(text) => dispatch(search(text))}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
          />
          <MaterialIcons name="search" size={30} color="black" />
        </View>
      </View>
      <View style={styles.sectionWrapper}>
        <Text style={styles.title}>Filter by status</Text>
        <View style={styles.radioGroup}>
          <CheckBoxComponent title="All" index={0} />
          <CheckBoxComponent title="Complete" index={1} />
          <CheckBoxComponent title="Todo" index={2} />
        </View>
      </View>
      <View style={styles.sectionWrapper}>
        <Text style={styles.title}>Filter by priority</Text>
        <FilterDropList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: primary,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  sectionWrapper: {
    display: "flex",
    gap: 10,
    marginBottom: 5,
  },
});
