import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { submitReport } from "../services/api";

export default function ReportForm() {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const newReport = {
      category: "Garbage",
      description: description,
      location: "Sample Location"
    };
    const response = await submitReport(newReport);
    console.log("Backend Response:", response);
  };

  return (
    <View>
      <TextInput
        placeholder="Describe the issue"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit Report" onPress={handleSubmit} />
    </View>
  );
}
