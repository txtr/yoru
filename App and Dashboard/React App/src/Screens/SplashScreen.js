import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Text, AsyncStorage,Image,Animated,ActivityIndicator} from 'react-native';
import Logo from '../images/logo.png';
export default class SplashScreen extends Component   {
    constructor({navigation}) {
        super();
        this.navigation = navigation
    }

    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
      };

    componentDidMount() {

        const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),
      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1200,
      }),
    ])



        setTimeout(async () => {
            await AsyncStorage.getItem('access_token')
            .then((access_token) => this.navigation.navigate(access_token ? 'Home' : 'login')) 
        }, 1000)
    }

    render()    {
        return (
            <View style={styles.container}>
              <Animated.View
                style={{
                  opacity: this.state.LogoAnime,
                  top: this.state.LogoAnime.interpolate({
                    inputRange: [0, 1],
                    outputRange: [80, 0],
                  }),
                }}>
                <Image source={Logo} style={{width: 500,height: 600}} />
                {this.state.loadingSpinner ? (
                  <ActivityIndicator
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    size="large"
                    color="#5257f2"
                  />
                ) : null}
              </Animated.View>
              <Animated.View style={{opacity: this.state.LogoText}}>
                <Text style={styles.logoText}> Yoru </Text>
              </Animated.View>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#5257F2',
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoText: {
        color: '#FFFFFF',
        fontFamily: 'GoogleSans-Bold',
        fontSize: 30,
        marginTop: 29.1,
        fontWeight: '300',
      },
  });
  