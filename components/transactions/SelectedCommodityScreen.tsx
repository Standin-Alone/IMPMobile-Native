import React, {Component} from 'react';
import {View,Text, StyleSheet,FlatList,Image} from 'react-native';
import Colors from '../../constants/Colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Layout from '../../constants/Layout';
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
import Images from '../../constants/Images';
import Button from 'apsl-react-native-button';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import {Fumi} from 'react-native-textinput-effects';
import NumericInput from "react-native-numeric-input";
export default class SelectedCommodityScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {          
        params:this.props.route.params,      
        amount:'',
        quantity:0,
        total_amount:0.00,
        validation : Yup.object({
            amount: Yup.number().typeError('Amount must be a number').required("Please enter amount"),


          })  
    };

  }

 


  render() {
 
    return (
      <View  style={styles.container}>        
        
        <Animatable.Image animation="fadeInDownBig" source={{uri: "data:image/jpeg;base64," + this.state.params.item.base64}} style={styles.logo} />

        <Animatable.Text style={styles.commodity_title}><FontAwesomeIcon name="info-circle" color={Colors.blue_green} size={20}/>  {this.state.params.item.item_name}</Animatable.Text>
        <NumericInput
            value={this.state.quantity}
            onChange={(value) => handleQuantity(value)}
            minValue={1}
            maxValue={99999}
            totalWidth={240}
            totalHeight={50}
            iconSize={25}
            initValue={this.state.quantity}
            step={1}
            valueType="integer"
            rounded
            iconStyle={{ color: "white" }}

            containerStyle={styles.quantity}
            rightButtonBackgroundColor={Colors.light_green}
            leftButtonBackgroundColor={Colors.light_green}
          />
        <Animatable.Text style={styles.ceiling_amount}> {"₱" + this.state.params.item.ceiling_amount} </Animatable.Text>


        <Formik
          initialValues = {{username:'',password:''}}
          validationSchema = {this.state.validation}
          onSubmit= {(values,{resetForm })=>this.handleLogin(values,navigation,resetForm)} 
          // validateOnChange={false}           
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>(
          <View>

        <Fumi
            label={'Enter your amount'}
            iconClass={Ionicons}
            iconName={'pricetag'}
            iconColor={Colors.green}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={[styles.amount,{borderColor: this.state.focus_amount == true || this.state.amount.length != 0  ? Colors.light_green 
                        :                        
                            this.state.error == true  || (errors.password && touched.password) ? Colors.danger : Colors.light}]}
            onFocus = {()=>this.setState({focus_amount:true})}
            onBlur = {()=>this.setState({focus_amount:false})}
            onChangeText={handleChange('password')}       
            value={values.password}                                        
            secureTextEntry={true}
            />

        {/* display total amount */}
        <Animatable.Text style={[styles.total_amount,{fontSize:15}]}>
        {"Total Amount: "}

        <Animatable.Text style={[styles.total_amount,{color:Colors.blue_green}]}>
            ₱{" "}
            
                  {isNaN(this.state.total_amount)
                    ? 0.0
                    : this.state.total_amount.toFixed(2)}
        </Animatable.Text>
        </Animatable.Text>
              
        <View style={{flex: 1}}>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,top:(Layout.height / 100) * 35}}>
          <Button
            textStyle={styles.add_to_cart_txt}
            style={styles.add_to_cart_btn}
            activityIndicatorColor={Colors.light}
            activeOpacity={100}            
            disabledStyle={{opacity: 1}}
            // onPress ={this.handleGoToCommodity}
            >
                Add to Cart
          </Button>
        </View>
      </View>

      </View>
    )}
    </Formik>

      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  logo:{    
    width:300,
    height:300,
    top:(Layout.height / 100) * 8,
    alignSelf:'center',    
  },
  add_to_cart_txt:{
    color:Colors.light,    
    fontFamily:'Gotham_bold',
  },
  
  add_to_cart_btn:{    
    
    width: (Layout.width / 100) * 90,
    left: (Layout.width / 100) * 5,
    borderColor: Colors.green,
    backgroundColor: Colors.green,    
  },
  amount: {
    width: (Layout.width / 100) * 90,
    top: (Layout.height / 100) * 25,
    left: (Layout.width / 100) * 5,
    fontFamily:'Gotham_bold',
    borderWidth:1,
    borderRadius:10,
    backgroundColor: '#F7F7F7',
    fontSize: 20,
  },
  commodity_title:{
    top:(Layout.height/100) * 15,
    left:10,
    fontSize:20,
    fontFamily:'Gotham_bold',
    color:Colors.header_text
  },
  ceiling_amount:{
    top:(Layout.height/100) * 20,
    left:10,
    fontSize:30,
    fontFamily:'Gotham_bold',
    color:Colors.header_text
  },
  total_amount:{
    top:(Layout.height/100) * 30,
    left:30,
    fontSize:25,
    fontFamily:'Gotham_bold',
    color:Colors.header_text
  },
  quantity:{
      position:'absolute',
      top:(Layout.height/100) * 53,
      left:(Layout.width/100) * 45,
      width:(Layout.width/100) *45,
    }
 
});
