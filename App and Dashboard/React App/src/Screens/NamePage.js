import React,{useState} from 'react';
import {StyleSheet,Text,View,Button,TextInput,AsyncStorage} from 'react-native';
import { Component } from 'react';
import { Input } from 'react-native-elements';

export default class NamePage extends Component{

  constructor(props){
	super(props);
    this.state = {
      name: '',
      age: '',
    }	
	  
  }

  Store=async()=>{
      await AsyncStorage.setItem('name', this.state.name);
      await AsyncStorage.setItem('age', this.state.age);
      
        AsyncStorage.getItem('name').then((name) => {
      if(name){
          console.log(name);
      }   
  });

  AsyncStorage.getItem('age').then((age) => {
      if(age){
          console.log(age);
      }
  });  
      	  
  }

  render(){
   return(
     <View style={styles.container}>
         <Text style={{fontSize:30}}>Enter Name:</Text>
         <TextInput style={styles.input} 
          placeholder='Eg:- Ritesh Aggarwal'
          onChangeText={(text) => this.setState({name:text})}
         />

         
         <Text style={{fontSize:30}}>Enter Age:</Text>
         <TextInput style={styles.input} 
          placeholder='Eg:- 25'
          onChangeText={(text) => this.setState({age:text})}
         />




		<Button
		  style={styles.button}
		  title="Next Page"
		  onPress={this.Store}
		/>
         
     </View>

   )
   }

}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#58D68D',
        alignItems:'center',
        justifyContent:'center',
    },
    input:{
        borderWidth:1,
        borderColor:'#777',
        padding:8,
        margin:10,
        width:300,
        backgroundColor:'#ecff33',
    },
    button:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        backgroundColor:'#ecff33'
    }
})