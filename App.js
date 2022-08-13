import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import DrawerNavBar from "./src/components/DrawerNavBar";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavBar />
    </NavigationContainer>
  );
}
