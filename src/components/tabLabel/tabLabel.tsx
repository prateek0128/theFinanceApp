import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";
import { colors } from "../../assets/styles/colors";
import { ThemeContext } from "../../context/themeContext";
const TabLabel = ({ label, selected, onPress }: any) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.tabLabelContainer,
          {
            backgroundColor:
              theme === "light"
                ? selected
                  ? colors.sexdenaryText // active color
                  : colors.octodenaryBackground
                : selected
                ? colors.vigenaryText
                : colors.darkUndenaryBackground, // default color
            borderWidth: selected ? 1 : 0, // active border width
            borderColor:
              theme == "light"
                ? selected
                  ? colors.sexdenaryText
                  : "transparent"
                : "",
          },
        ]}
      >
        <Text
          style={[
            styles.labelText,
            {
              color:
                theme === "dark"
                  ? selected
                    ? colors.octodenaryText
                    : colors.white
                  : selected
                  ? colors.white // active text color
                  : colors.octodenaryText, // default text color
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default TabLabel;

const styles = StyleSheet.create({
  tabLabelContainer: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 10,
    //backgroundColor: colors.quattuordenaryBackground,
  },
  labelText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
    //color: colors.quattuordenaryText,
  },
});
