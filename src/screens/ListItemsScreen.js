import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const ListItemsScreen = () => {
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
          <Button>200</Button>
          <Button>call seller</Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <View>
      <FlatList
        data={myitems}
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
