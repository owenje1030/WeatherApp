/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ImageBackground, Dimensions, Image} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const device_height = Dimensions.get('window').height;
const device_width = Dimensions.get('window').width;
const weather_api_key = "42570c304b4b0d5dee15097f5cdec509";

class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      data:[],
      loading: true,
      city:'',
      temp:"",
      icon:"",
      desc:"",
      humidity:"",
      pressure:"",
      visibility:"",
    }
    this.fetch_Weather();
  }

  fetch_Weather=()=>{
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid="+weather_api_key)
    .then((response)=>response.json())
    .then((json)=>{
      this.setState({data:json});
      this.setState({temp:(json.main.temp-273.15).toFixed(2)+ " C"});
      this.setState({city:json.name});
      this.setState({icon: json.weather[0].icon});
      this.setState({main: json.weather[0].main});
      this.setState({desc:json.weather[0].description});
      this.setState({pressure: json.main.pressure+" %"});
      this.setState({humidity: json.main.humidity+" hPa"});
      this.setState({visibility: (json.main.visibility/1000).toFixed(2)+" Km"});
    }).catch((error)=>console.error(error)).finally(()=>{
      this.setState({loading: false});
    })
  }


  render(){
    return(
      <View style={styles.container}>
        <ImageBackground
       style={styles.ImageBackground}
       resizeMode='cover'
       source={require('./img/background.jpg')}>
        
        <View style={styles.weatherContainer}>

          <View style={styles.weatherHolder}>
            <Image 
            tintColor='#FFF'
            source={{uri:"https://openweathermap.org/img/wn/"+this.state.icon+"@2x.png"}}
            style={styles.WeatherImage}/>

            <View style={styles.WeatherMainSpec}>
              <Text style={styles.text1}>{this.state.city}</Text>
              <Text style={styles.text1}>{this.state.temp}</Text>
              <Text style={styles.text1}>{this.state.main}</Text>
            </View>
            
          </View>

        </View>

          <View style={styles.desc}>
            <View style={styles.horizontalRule}></View>
            <Text style={styles.text2}><Text style={styles.text3}>Description: </Text> {this.state.desc}</Text>

          </View>
          
        </ImageBackground>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    height: device_height,
    width: device_width,
    backgroundColor:'rgba(255,255,255,0.12)'
  },
  ImageBackground:{
    width: '100%',
    height: '100%'
  },
  weatherContainer:{
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
  },
  weatherHolder:{
    height:'80%',
    width:'90%',
    borderRadius:15,
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.72)',
    flexDirection:'row',
    justifyContent:'center'
  },
  WeatherImage:{
    height:"80%",
    width:"50%"
  },
  WeatherMainSpec:{
    height:"80%",
    width:'50%',
  },
  text1:{
    fontFamily:'sans-serif',
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center'
  },
  text2:{
    fontSize:25,
    paddingLeft:20,
  },
  text3:{
    fontSize:20,
    fontStyle:'italic'
  },
  desc:{
    width:'100%',
    height:'50%',
  },
  horizontalRule:{
    borderBottomColor:'grey',
    borderBottomWidth: 1,
  }
});

export default App;
