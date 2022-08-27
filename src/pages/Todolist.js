import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
} from "react-native";

import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useIsFocused } from "@react-navigation/native";

import { db, auth } from "../../config";

const Todos = () => {
  const [date, setDate] = useState(new Date());
  //Todolist useStates
  const [entityText, setEntityText] = useState("");
  const [toDos, setToDos] = React.useState([]);
  //screenFocus check
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData();
  }, [isFocused == true]);

  async function fetchData() {
    date.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser.uid),
      where("dateSet", "==", date),
      orderBy("timestamp")
    );
    const querySnapshot = await getDocs(q);
    const toDos = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    setToDos(toDos);
  }
  (error) => {
    console.log(error);
  };

  const addToDo = async (todo) => {
    let toDoToSave = {
      timestamp: serverTimestamp(),
      text: entityText,
      completed: false,
      userId: auth.currentUser.uid,
      dateSet: date,
    };
    const docRef = await addDoc(collection(db, "tasks"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };

  const renderToDoItem = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new entity"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={addToDo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {toDos && (
        <View style={styles.listContainer}>
          <FlatList
            data={toDos}
            renderItem={renderToDoItem}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 70,
    padding: 20,
  },
  entityContainer: {
    // marginTop: 16,
    // borderBottomColor: "grey",
    // borderBottomWidth: 2,
    // paddingBottom: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    maxWidth: 250,
    width: 250,
    shadowRadius: 10,
    marginBottom: 20,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
});
