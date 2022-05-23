import { StyleSheet, Text, View,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Categorybox({selectCategory,backgroundstyle,textstyle,text,cancel,selectClose}:{selectCategory:any,backgroundstyle:any,textstyle:any,text:string,cancel:string,selectClose:any}) {
  return (
    <TouchableWithoutFeedback onPress={()=>{
        if(cancel=="False")
         selectCategory(text)
    }}>
     <View style={styles.container}>
      <View style={backgroundstyle}>
        <Text style={textstyle}>{text}</Text>
        {cancel=="True"?[
         <View style={{marginTop:"2%",marginLeft:'1.5%',marginRight:'1%'}}> 
             <TouchableWithoutFeedback onPress={()=>{
                 selectClose("cancel "+text)
             }}>
             <Icon name="close" size={15} color="#FFFF" />
             </TouchableWithoutFeedback>
             
         </View>   
      ]:[]}
      </View>  
     </View>
    </TouchableWithoutFeedback>    
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: '1.5%',
        
    }
})