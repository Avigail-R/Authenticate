import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuthStore} from "../store/auth-context";

function WelcomeScreen() {
  const {token} = useAuthStore();
  const [message, setMessage] = useState('');
  useEffect(() => {
    console.log(token);
    axios.get('https://react-native-4800f-default-rtdb.firebaseio.com/expenses/message.json?auth=' + token)
      .then((response) => {
      console.log(response.data);
      setMessage(response.data);
    });
  },[token]);
    
  
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
