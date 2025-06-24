import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from "@/store/appSlice";
import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
export default function DeleteModal() {
  const isOpen = useAppSelector((state) => state.app.isOpen);
  const dispatch = useAppDispatch();

  const handleDelete = (id : number) => {
    // fetch("http://192.168.50.234:8080/api/tasks", {
    //   method: "DELETE",
    // })
    //   .then(async (response) => {
    //     const json = await response.json();
    //     if (response.status === 201) return json;
    //   })
    //   .then((json) => {
    //     setTasks([...tasks, json.task]);
    //   });
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        dispatch(setIsOpen(!isOpen));
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Feather name="x-circle" size={60} color="red" />
          <Text style={styles.modalText}>Are you sure?</Text>
          <Text style={styles.confirmText}>Do you really want to delete this task ?</Text>
          <View style={styles.btnWrapper}>
            <Pressable
              style={[styles.button, styles.buttonDelete,]}
              onPress={() => handleDelete}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => dispatch(setIsOpen(!isOpen))}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display:'flex',
    justifyContent:'center',
    gap:10
  },
  button: {
    borderRadius: 8,
    padding: 10,
    flex:1,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: "gray",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
  },
  confirmText:{
    textAlign:'center',
    fontSize:17,
    fontWeight:500
  },
  btnWrapper:{
    display:'flex',
    flexDirection:'row',
    gap:20,
    paddingHorizontal:20,
    paddingVertical:10
  }
});
