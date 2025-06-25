import { BaseToast, ErrorToast } from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
    style={{borderLeftColor:"green", borderLeftWidth:8 ,borderRadius:10}}
      {...props}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: "#d6f5d6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTopEndRadius:10,
        borderEndEndRadius:10
      }}
      text1Style={{
        fontSize: 18,
        color: "black",
        fontWeight: 700,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: 500,
        color: "#737373",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
    style={{ borderLeftColor:'red',borderLeftWidth:8 ,borderRadius:10}}
      {...props}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: "#ffcccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTopEndRadius:10,
        borderEndEndRadius:10
      }}
      text1Style={{
        fontSize: 18,
        color: "black",
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: 500,
        color: "#737373",
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
};
