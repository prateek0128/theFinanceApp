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
                  ? colors.septendenaryBackground // active color
                  : colors.octodenaryBackground
                : selected
                ? colors.darkUndenaryBackground
                : colors.darkTridenaryBackground, // default color
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
                    ? colors.darkSeptanaryText
                    : colors.white
                  : selected
                  ? colors.sexdenaryText // active text color
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
