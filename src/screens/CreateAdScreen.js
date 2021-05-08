import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CreateAdScreen = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');

  const postData = async () => {
    if (!name || !desc || !year || !price || !phone) {
      Alert.alert('please fill all the fields');
      return;
    }
    try {
      await firestore().collection('ads').add({
        name,
        desc,
        year,
        price,
        phone,
        image:
          'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
        uid: auth().currentUser.uid,
      });
      Alert.alert('Posted');
      setName('');
      setDesc('');
      setYear('');
      setPhone('');
      setPrice('');
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Ad!</Text>
      <TextInput
        label="Ad title"
        value={name}
        mode="outlined"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Describe what you are selling"
        value={desc}
        mode="outlined"
        numberOfLines={3}
        multiline={true}
        onChangeText={(text) => setDesc(text)}
      />
      <TextInput
        label="Year of Purchase"
        value={year}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={(text) => setYear(text)}
      />
      <TextInput
        label="Price in INR"
        value={price}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={(text) => setPrice(text)}
      />
      <TextInput
        label="Your Contact number"
        value={phone}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={(text) => setPhone(text)}
      />

      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Upload Image
      </Button>

      <Button mode="contained" onPress={() => postData()}>
        Post
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default CreateAdScreen;
