import React, { Component } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import { auth } from "../config";
import { useNavigation } from "@react-navigation/core";

function Dashboard() {
  // const navigation = useNavigation();
  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate("Login");
  //     })
  //     .catch((error) => alert(error.message));
  // };
  return (
    <View style={styles.container}>
      <Text>Logged in !!</Text>
      {/* <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
