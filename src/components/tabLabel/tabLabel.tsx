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
                  ? colors.quindenaryBackground // active color
                  : colors.quattuordenaryBackground
                : selected
                ? colors.quindenaryBackground
                : colors.darkSenaryBackground, // default color
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
                    ? colors.darkPrimaryText
                    : colors.darkSecondaryText
                  : selected
                  ? colors.darkSecondaryText // active text color
                  : colors.quattuordenaryText, // default text color
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
    paddingHorizontal: 12,
    gap: 10,
    //backgroundColor: colors.quattuordenaryBackground,
  },
  labelText: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 12,
    //color: colors.quattuordenaryText,
  },
});
