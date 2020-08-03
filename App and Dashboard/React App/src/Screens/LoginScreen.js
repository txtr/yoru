import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';

class WebViewExample extends Component {
   constructor()  {
      super()
   }

   async handleToken(access_token) {
      await AsyncStorage.setItem('access_token', access_token)
      .then(console.log('access token is set'))
      console.log('Stored the token successfully')
   }

   componentDidMount()  {
      console.log("Inside component did mount")
      this.getToken = setInterval(() => {
         
         // let response = await fetch('http://7cf92a28.ngrok.io/access_token')
         // console.log(response)
         var myHeaders = new Headers();
         myHeaders.append("Authorization", "Bearer MWVlYzQ5OGYtZGU5Mi00Y2Y2LWFiN2EtMTdhM2IwNjNkN2ZhY2NhMDM2MzEtZmJj_PF84_consumer");

         var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow'
         };
         
         fetch("https://app-sih.herokuapp.com/access_token", requestOptions)
         .then(response => response.text())
         .then(result => {
            data = JSON.parse(result)
            if(data.access_token != null){
               console.log('Got token from heroku');
               clearInterval(this.getToken);//stop when recieved token
               console.log(data.access_token)
               this.handleToken(data.access_token)

            }
         })
         //.catch(error => console.log('error', error)); 
         // .then((response) => {
         //    console.log(response)
            
         //})

      }, 6000)
   }

   render() {
      return (
         <View style = {styles.container}>
            <WebView
            source = {{ uri:'https://api.ciscospark.com/v1/authorize?client_id=C8bd938df97c9089c41db99fdc4bebf05ac3125f455b61c9510180ae8fea5f731&response_type=code&redirect_uri=https%3A%2F%2Fapp-sih.herokuapp.com%2F&scope=spark-compliance%3Amemberships_read%20spark-admin%3Aresource_groups_read%20spark%3Aall%20spark-admin%3Apeople_write%20spark-admin%3Aorganizations_read%20spark-admin%3Aplaces_read%20spark-compliance%3Ateam_memberships_read%20spark-compliance%3Ateam_memberships_write%20spark-admin%3Adevices_read%20spark-admin%3Ahybrid_clusters_read%20spark-compliance%3Amessages_read%20spark-admin%3Adevices_write%20spark-compliance%3Amemberships_write%20identity%3Aplaceonetimepassword_create%20spark-admin%3Aroles_read%20spark-compliance%3Aevents_read%20spark-admin%3Aresource_group_memberships_read%20spark-admin%3Aresource_group_memberships_write%20spark-compliance%3Arooms_read%20spark-admin%3Acall_qualities_read%20spark-compliance%3Amessages_write%20spark%3Akms%20audit%3Aevents_read%20spark-admin%3Ahybrid_connectors_read%20spark-compliance%3Ateams_read%20spark-admin%3Aplaces_write%20spark-admin%3Alicenses_read%20spark-admin%3Apeople_read&state=set_state_here'}}
            />
         </View>
      )
   }
   
   
}
export default WebViewExample;

const styles = StyleSheet.create({
   container: {
      height: 350,
   }
})

