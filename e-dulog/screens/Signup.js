import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { signup } from "../services/api";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");

const handleSignup = async () => {
  try {
    console.log("Submitting signup...");
    const result = await signup(
      username,
      email,
      password,
      houseNumber,
      municipality,
      barangay
    );
    Alert.alert("Success", "Account created successfully!");
    navigation.navigate("Login");
  } catch (err) {
    Alert.alert("Signup Failed", err.message);
  }
};


  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Sign Up</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="House Number"
        value={houseNumber}
        onChangeText={setHouseNumber}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Municipality"
        value={municipality}
        onChangeText={setMunicipality}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Barangay"
        value={barangay}
        onChangeText={setBarangay}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Button title="Sign Up" onPress={handleSignup} />
    </ScrollView>
  );
}