import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ListItemsScreen = () => {
  const [items, setItems] = useState([]);
  const myitems = [
    {
      name: 'camera',
      year: '3453',
      phone: '12345166',
      image:
        'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
      desc: 'this is a description',
    },
    {
      name: 'iphone',
      year: '3453',
      phone: '123166',
      image:
        'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
      desc: 'this is second description',
    },
  ];

  const getDetails = async () => {
    const querySnap = await firestore().collection('ads').get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    console.log(result);
    setItems(result);
  };
  useEffect(() => {
    getDetails();
    return () => {
      console.log('cleanup');
    };
  }, []);

  const renderItem = (item) => {
    return (
      <Card style={styles.container}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: item.image}} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button>call Seller</Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.phone}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    elevation: 2,
  },
});

export default ListItemsScreen;
