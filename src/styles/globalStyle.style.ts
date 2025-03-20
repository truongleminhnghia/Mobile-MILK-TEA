import { StyleSheet } from "react-native";
import { appColor } from "../constants/appColor.contant";
import { fontFamilies } from "../constants/fontFamilies.constant";

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor.white,
    },
    text: {
        fontSize: 14,
        fontFamily: fontFamilies.regular,
        color: appColor.text,
    }
})