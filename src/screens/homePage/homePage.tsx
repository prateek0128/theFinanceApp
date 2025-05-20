import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const HomeScreen = () => {
  // TODO: Replace with real user data and finance info
  const userName = "John Doe";
  const balance = 2540.75;
  const expenses = 540.32;
  const income = 3100.0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Welcome back, {userName}!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Balance</Text>
            <Text style={styles.summaryValue}>${balance.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryValue, styles.income]}>
              ${income.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, styles.expenses]}>
              ${expenses.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Text style={styles.buttonSecondaryText}>View Reports</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f7f9fc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBox: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  income: {
    color: "#2ecc71",
  },
  expenses: {
    color: "#e74c3c",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonSecondary: {
    borderColor: "#007AFF",
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#007AFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
