import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase";
import { AntDesign } from "@expo/vector-icons";

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);
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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedNotes = [];
        querySnapshot.forEach((doc) => {
          fetchedNotes.push({ id: doc.id, ...doc.data() });
        });
        console.log(fetchedNotes);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (docId) => {
    console.log("Deleting document with ID:", docId);
    try {
      await deleteDoc(doc(db, "users", docId));
      console.log("Document successfully deleted!");
      // Update state after deletion
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== docId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Affairs Notes</Text>
      <ScrollView>
        {notes.map((note) => (
          <View key={note.id} style={styles.note}>
            {console.log(notes)}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.noteTitle}>{note.title}</Text>
              <TouchableOpacity onPress={() => handleDelete(note.id)}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.noteDate}>{note.date}</Text>
            <Text style={styles.noteSummary}>{note.summary}</Text>
            <Image source={{ uri: note.image }} style={styles.noteImage} />
          </View>
        ))}
      </ScrollView>
    </View>
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
  note: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteDate: {
    marginBottom: 5,
  },
  noteSummary: {
    marginBottom: 5,
  },
  noteImage: {
    width: "100%",
    height: 200, // Adjust height as needed
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default ViewNotes;
