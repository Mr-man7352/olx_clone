import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ListItemsScreen = () => {
  const [items, setItems] = useState([]);

  const getDetails = async () => {
    const querySnap = await firestore().collection('ads').get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    setItems(result);
  };
  const openDial = (phone) => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telpromt:${phone}`);
    }
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
          <Button onPress={() => openDial()}>call Seller</Button>
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
        inverted
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
