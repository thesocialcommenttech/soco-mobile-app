import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function interest() {
  return (
    <View style={styles.container}>
      <View style={styles.fCont}>
      <Text style={styles.boldtext}>My Interests</Text>
      <Text style={styles.normaltext}>Total 5 Interests</Text>
      </View>  
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginLeft: '3%',
        marginRight: '3%',
        flex:1,
        
    },
    fCont:{
        
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boldtext:{
        fontFamily: 'Roboto-Medium',
        fontWeight: '900',
        color: "black"
    },
    normaltext: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        
    }
})