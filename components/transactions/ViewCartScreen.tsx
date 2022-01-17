import React, {Component} from 'react';
import {View,Text, StyleSheet,FlatList,Image} from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Layout from '../../constants/Layout';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import * as ipConfig from '../../ipconfig';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import Button from 'apsl-react-native-button';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

export default class ViewCartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {          
        params:this.props.route.params,     
    };


    
  }




 
  render() {

    return (
      <View  style={styles.container}>        
      

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});
