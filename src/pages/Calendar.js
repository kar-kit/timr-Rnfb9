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
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../config";

const Calendar = () => {
  //Datepicker useStates
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  //Todolist useStates
  const [entityText, setEntityText] = useState("");
  const [toDos, setToDos] = React.useState([]);

  useEffect(() => {
    fetchData();
  }, [date]);

  async function fetchData() {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser.uid),
      where("dateSet", "==", date),
      orderBy("timestamp")
    );
    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
      console.log(doc.id, " => ", doc.data());
    });
    setToDos(toDos);
    console.log(toDos);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    console.log("selected date", currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setShow(true);
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
    console.log(item.text);

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
      <Text>This is the Calendar</Text>

      <Button onPress={showDatepicker} title="Show date picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

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
        <View>
          <View style={styles.listContainer}>
            <FlatList
              data={toDos}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
              renderItem={renderToDoItem}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Calendar;

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
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
});
