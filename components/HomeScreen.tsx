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
        isFocus:false,
        full_name:''
    };

  }
  
  async componentDidMount(){
     
    this.setState({full_name:await AsyncStorage.getItem('full_name')})

  }

  render() {

    return (
      <View style={styles.container}>        
        
        <Animatable.Text style={styles.greetings} animation="fadeInDownBig" >Hello John Edcel</Animatable.Text>        
        <Animatable.Text style={styles.question} animation="fadeInDownBig" >What voucher transaction do you want to search?</Animatable.Text>        
        <Fumi
            label={'Search it by reference number'}
            iconClass={FontAwesomeIcon}
            iconName={'search'}
            iconColor={Colors.green}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={[
              styles.search_text_input,
              {
                borderColor:
                  this.state.isFocus == true
                    ? Colors.green
                    : '#ddd',
              },
            ]}
            onBlur={() => this.setState({isFocus: false})}
            onFocus={() => this.setState({isFocus: true})}
            onChangeText={value => this.setState({search: value})}
            keyboardType="email-address"
          />


        <Animatable.Text style={styles.recent_title}><FontAwesomeIcon name="info-circle" color={Colors.blue_green} size={16}/>  Recent Transaction Today</Animatable.Text>
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
    top:(Layout.height/100) * 15,
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
  },
  question:{
    fontFamily:"Gotham_light",
    fontSize:12,
    top:(Layout.height/100) * 8,
    left:(Layout.width / 100) * 3,
  },
  search_text_input:{
    top:(Layout.height/100) * 10,
    borderWidth:1,
    left:(Layout.width / 100) * 3,
    width:(Layout.width / 100) * 95,
    borderRadius:20,
    borderColor:'#ddd'
  }

});
