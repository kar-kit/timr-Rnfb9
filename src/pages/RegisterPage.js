import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore, auth } from "../../config";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding ">
      <View style={styles.imagecontainer}>
        <Image
          source={require("../assets/images/big-timr-logo.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
          autoCapitalize="none"
        ></TextInput>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
        ></TextInput>

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
        ></TextInput>

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onRegisterPress} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onFooterLinkPress}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Already a User?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagecontainer: {
    marginTop: -15,
    paddingBottom: 50,
  },
  image: {
    height: 205,
    width: 290,
    resizeMode: "contain",
  },
  inputContainer: {
    width: "60%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
