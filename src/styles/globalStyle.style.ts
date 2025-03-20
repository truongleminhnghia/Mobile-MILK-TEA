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
    },
    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColor.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 56,
        flexDirection: 'row'
    },
    section: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})