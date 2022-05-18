import { Text, View, StyleSheet,TouchableWithoutFeedback,Image, FlatList } from 'react-native';
import React from 'react';
import Follow from './follow';
import Interest from '../Interest/interest';


const HomeScreen = () => {
  return (
    <View style = {styles.container}>  
    <Follow></Follow>
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
