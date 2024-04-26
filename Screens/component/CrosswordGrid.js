import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const CrosswordGrid = () => {
  const navigation = useNavigation();

  const dummyNotes = [
    {
      title: "Note 1",
      date: "2024-03-09",
      summary: "This is the summary of note 1.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Note 2",
      date: "2024-03-10",
      summary: "This is the summary of note 2.",
      image: null,
    },
    {
      title: "Note 3",
      date: "2024-03-11",
      summary: "This is the summary of note 3.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState([]);

  const addNote = async () => {
    if (title && date && source && summary) {
      console.log("pressed");
      try {
        const docRef = await addDoc(collection(db, "users"), {
          title,
          date,
          source,
          summary,
          image,
        });

        console.log("Document written with ID: ", docRef.id);
        setTitle("");
        setDate("");
        setSource("");
        setSummary("");
        setImage(null);
      } catch (e) {
        console.err;
        // Clear input fields

        // Provide feedback to the user
        console.log(e);
      }
    } else {
      Alert.alert("Error Adding Note", "Please fill out all required fields.");
    }
  };

  const handleAttachImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Permission to access photos is required."
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    setImage(pickerResult.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Current Affairs Notes</Text>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={(text) => setDate(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Source"
          value={source}
          onChangeText={(text) => setSource(text)}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]} // Update style for multiline input
          placeholder="Summary (at least 200 characters)"
          multiline
          value={summary}
          onChangeText={(text) => setSummary(text)}
        />
        <TouchableOpacity
          style={styles.attachButton}
          onPress={handleAttachImage}
        >
          <Text style={styles.buttonText}>Attach Image</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.attachedImage} />
        )}
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.viewNotesButton}
          onPress={() => navigation.navigate("Viewnotes")}
        >
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableOpacity>
        <ScrollView>
          {notes.map((note, index) => (
            <View key={index} style={styles.note}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              {note.image && (
                <Image
                  source={{ uri: note.image }}
                  style={styles.attachedImage}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewNotesButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  multilineInput: {
    height: 100, // Adjust height as needed
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  attachButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  note: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  attachedImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default CrosswordGrid;
