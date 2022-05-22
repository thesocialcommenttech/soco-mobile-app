import { StyleSheet, Text, View,TouchableWithoutFeedback,Image } from 'react-native'
import React from 'react'

export default function followList({title,userId,image}:{title:string, userId:string, image:string}) {
  return (
    <> 
    <TouchableWithoutFeedback onPress={()=>{
        console.log("Pressed")
    }}>
         <View style={styles.mTab}>
           <View style={styles.imageCon}>
             <Image source={{ uri: (image)}} style={styles.img}/>
           </View>
           <View style={styles.followtext}>
             <Text style={styles.name}>{title}</Text>
             <Text>@ {userId}</Text>
           </View>
         </View>
      </TouchableWithoutFeedback> 
    </>  
  )
}

const styles = StyleSheet.create({
    mTab:{
        marginRight: "7%",
        marginLeft: "7%",
        
        padding: '3%',
        borderColor: 'lightgray',
        borderWidth: 0.8,
        flexDirection: 'row'
      },
      imageCon: {
        marginLeft: "4%",
      },
      img: {
        width:50,
        height: 50,
        borderRadius: 25
      },
      followtext:{
        marginLeft: '4%'
      },
      name:{
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        color: "black"
      }
})