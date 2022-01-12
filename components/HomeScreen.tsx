import React, {Component} from 'react';
import {View,Text, StyleSheet,FlatList} from 'react-native';
import {Fumi} from 'react-native-textinput-effects';
import Colors from '../constants/Colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Layout from '../constants/Layout';
import Button from 'apsl-react-native-button';
import * as Animatable from 'react-native-animatable';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import * as ipConfig from '../ipconfig';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from 'react-native-paper';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {          
        params:this.props.route.params,
    };






  }


  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>        
        
        <Animatable.Text style={styles.greetings} animation="fadeInDownBig" >Hello John Edcel</Animatable.Text>        
        <Animatable.Text style={styles.recent_title}> Recent Transactions</Animatable.Text>
        <Card style={styles.card} elevation={10}>
            <Card.Cover source={{uri:'http://cf.ltkcdn.net/socialnetworking/images/std/168796-281x281-girl-swear-icon.png'}} resizeMode='cover' style={styles.card_cover}/>
            <Card.Content>
                <Text> Lea Mae Cervantes</Text>    
            </Card.Content>            
        </Card>

        <FlatList 

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  card:{
    top:(Layout.height/100) * 15,
    width:(Layout.width/100) * 20,    
    left:10
  },
  card_cover:{    
    width:  100,
    height: 100
  },
  recent_title:{
    top:(Layout.height/100) * 10,
    left:10,
    fontFamily:'Gotham_bold',
    color:Colors.header_text
  },
  greetings:{
    fontFamily:'Gotham_bold',
    top:(Layout.height/100) * 5,
    color:Colors.blue_green,    
    left:10,
    fontSize:25,      
  }
});
