import { StyleSheet, Text, View,TouchableWithoutFeedback,Image } from 'react-native'
import React from 'react'

export default function ReferalList({title,userId,image,prime}:{title:string, userId:string, image:string,prime: boolean}) {
  return (
    <> 
    <TouchableWithoutFeedback onPress={()=>{
        console.log("Pressed")
    }}>
         <View style={styles.mTab}>
           <View style={styles.imageCon}>
            <View style={{flexDirection: 'row'}}>
            <Image source={{ uri: (image)}} style={styles.img}/>
            {prime?[<Image source={{ uri: (image)}} style={styles.prime}/>]:[]} 
            </View>   
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
        padding: '3%',
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
      },
      prime:{
            width:20,
            height: 20,
            borderRadius :10,
            marginTop: '60%',
            marginLeft : '60%',
            position: 'absolute'
      }
})