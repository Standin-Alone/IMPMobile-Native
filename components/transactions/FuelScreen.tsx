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

export default class FuelScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {          
        params:this.props.route.params,     
        data:[],        
        cart:[]


        
    };


    
  }


  componentDidMount(): void {
    this.setState({data:this.state.params.program_items});


    console.warn(this.state.params)
    
  


  }
  

  gotoSelectedCommodityScreen = (item) =>{
    this.props.navigation.push('SelectedCommodityScreen',{item:item})

  }

  renderCommodity = (item, index) => (
    <Card elevation={10} style={styles.card}>
      <Card.Cover
        resizeMode="contain"
        source={{ uri: "data:image/jpeg;base64," + item.base64 }}
      />
      <Card.Title
        title={item.item_name }
        titleStyle={styles.card_title}        
        subtitle={"₱" + item.ceiling_amount + " per " + item.unit_measure}
        right={() => (
          <Button
          textStyle={styles.add_to_cart_txt}
          style={styles.add_to_cart_btn}
          activityIndicatorColor={Colors.light}
          activeOpacity={100}
          isLoading={this.state.isLoading}
          disabledStyle={{opacity: 1}}
          onPress ={()=>this.gotoSelectedCommodityScreen(item)}
          >
            <FontAwesomeIcon name="cart-plus" size={20} color={Colors.light} style={{left:20}}/>
         Add 
        </Button>
        )}
      />
      <Card.Content></Card.Content>
    </Card>
  );
  

  emptyCommodity = () => (
    <Card elevation={20} style={styles.card}>
      <Card.Title title="None" />
    </Card>
  );

  


 
  render() {
 
    return (
      <View  style={styles.container}>        
      
      {/* COMMODITIES LIST */}      
        <FlatList
          nestedScrollEnabled
          data={this.state.data.filter((item) =>
            !item.item_name.toLowerCase().match("fertilizer") &&
            !this.state.cart.find((value) => value.name === item.item_name)
            ? item : null
            )}

          style={styles.flat_list}
          ListEmptyComponent={() => this.emptyCommodity()}
          renderItem={({ item, index }) => this.renderCommodity(item, index)}
          keyExtractor={(item) => item.name}
        />      

      {/*  Go to Summary Screen */}
      <View style={{flex: 1}}>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <Button
            textStyle={styles.next_txt}
            style={styles.next_btn}
            activityIndicatorColor={Colors.light}
            activeOpacity={100}            
            disabledStyle={{opacity: 1}}
            // onPress ={this.handleGoToCommodity}
            >
        ● {this.state.cart.length} item ● ₱{this.state.cart.map((prev) => {
                                                sum += prev.total_amount;
                                                return sum;
                                          }) == 0 ? "0.00": sum.toFixed(2)} 
          </Button>
        </View>
      </View>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  card: {
    marginTop: 10,
    marginHorizontal: 2,
    marginBottom: 20,
    borderRadius: 25,
  },
  card_title:{
    fontFamily:'Gotham_bold'
  },
  commodity:{

      width:150,
      height:150,
      top:(Layout.height / 100) * 8,
      alignSelf:'center',       
  },
  commodity_image: {
    top: 5,
    height: (Layout.height / 100) * 35,
    width: (Layout.width / 100) * 100,
    overflow: "hidden",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  flat_list: {
    marginTop: (Layout.height / 100) * 10,
    marginBottom: (Layout.height / 100) * -2,
    width: (Layout.width / 100) * 92,
    alignSelf: "center",
  },
  next_txt:{
    color:Colors.light,    
    fontFamily:'Gotham_light',
  },
  
  next_btn:{    
    
    width: (Layout.width / 100) * 90,
    left: (Layout.width / 100) * 5,
    borderColor: Colors.green,
    backgroundColor: Colors.green,    
  },
  add_to_cart_txt:{
    color:Colors.light,    
    fontFamily:'Gotham_bold',
    fontSize:10
  },
  add_to_cart_btn:{
    borderColor:'#ddd',
    backgroundColor:Colors.light_green,
    width: (Layout.width / 100) * 40,
    right:10
  }
});
