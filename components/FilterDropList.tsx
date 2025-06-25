import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { primary } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store";
import { filterPriority } from "@/store/filterSlice";
const data = [
  { label: "All", value: "" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

const FilterDropList = () => {
  const [isFocus, setIsFocus] = useState(false);
  const filterdPriority = useAppSelector(
    (state) => state.searchAndFilter.filterdPriority
  );
  const dispatch = useAppDispatch();
  return (
    <View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: primary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={filterdPriority}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          dispatch(filterPriority(item.value));
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <MaterialCommunityIcons
            name="arrow-down-drop-circle"
            size={24}
            color="black"
          />
        )}
      />
    </View>
  );
};

export default FilterDropList;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 600,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
