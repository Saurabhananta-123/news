import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigate from './Navigation/Navigate';
import { ThemeProvider } from './Screens/component/ThemeContext'; // Import ThemeProvider
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
   <ThemeProvider>
    <Navigate/>
    </ThemeProvider>
  </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({

});
