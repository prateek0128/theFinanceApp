import { StyleSheet } from "react-native";
import { colors } from "./colors";
import spacing from "./spacing";
import typography from "./fontFamily";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    //@ts-ignore
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  input: {
    height: 48,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    //@ts-ignore
    fontWeight: typography.fontWeight.bold,
  },
  linkText: {
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.md,
  },
});

export default globalStyles;
