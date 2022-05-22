import { Text, View, StyleSheet,TouchableWithoutFeedback,Image, FlatList } from 'react-native';
import React from 'react';



const HomeScreen = () => {
  return (
    <View style = {styles.container}>  
    <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{  
    flex:1,
    marginTop:"10%" 
  },
 
})

export default HomeScreen;
