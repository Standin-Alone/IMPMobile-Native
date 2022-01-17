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
import { createFilter } from "react-native-search-filter";
import Moment from 'react-moment';

const KEYS_TO_FILTERS = ["reference_no", "fullname"];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {          
        params:this.props.route.params,
        isFocus:false,
        full_name:'',
        today_vouchers_list:[],
        search:'',
        refreshing:false,
        isShowImage:false,
        imageURI:null
    };

  }
  


  fetchData = async () => {
    const supplier_id = await AsyncStorage.getItem("supplier_id");
    const currentPage = 1;
    console.warn(supplier_id);
    this.setState({refreshing:true});
    NetInfo.fetch().then(async (response: any) => {
      if (response.isConnected) {
       
      const  result = await axios.get(
        ipConfig.ipAddress+ "/get-scanned-vouchers-today/"+supplier_id+"/"+currentPage,         
        ).catch((error)=>error.response);
        if (result.status == 200) {
          
          this.setState({today_vouchers_list:result.data,refreshing:false})
                    
        }else{
          // console.warn(result);
        }
        
      } else {
        // Alert.alert("Message", "No Internet Connection.");
        this.setState({refreshing:false});
      }

    
    });
  };
  

   getScannedVouchers = async () => {
    const supplier_id = await AsyncStorage.getItem("supplier_id");

    this.setState({refreshing:true});
        
    NetInfo.fetch().then((response: any) => {
      if (response.isConnected) {
        axios
          .get(
            ipConfig.ipAddress+ "/get-scanned-vouchers/"+supplier_id+"/"+1
          )
          .then((response) => {
            if (response.status == 200) {
              
              console.warn(response.data);
              this.setState({today_vouchers_list:response.data})
              this.setState({refreshing:false});

            }

            this.setState({refreshing:false});
          })
          .catch((error) => {
            // Alert.alert('Error!','Something went wrong.')
            console.warn(error.response);
            this.setState({refreshing:false});
          });
      } else {
        // Alert.alert("Message", "No Internet Connection.");
      }
    });

  };

  
  async componentDidMount(){
    this.fetchData();
    this.setState({full_name:await AsyncStorage.getItem('full_name')})

  }

  emptyComponent = () =>(
    <Card
      elevation = {10}
      style     = {styles.empty_card}      
    >
      <Card.Title title="No vouchers were transacted today." />
      <Card.Content></Card.Content>
    </Card>
  )
  

  // show image
  showImage = (uri: any) => {
    setShowImage(true);
    this.setState({isShowImage:true,imageURI:uri})    
  };

  
   leftComponent = () =>(  <Icon name="user" family="entypo" color={Colors.base} size={30} />)
   rightComponent = (reference_no,fullname,current_balance) =>(  
              <Icon
                 name="right" 
                 family="antDesign" 
                 color={Colors.base} 
                 size={30}  
                 style={{right:10}} 
                //  onPress={()=>goToSummary(reference_no,fullname,current_balance)}
                 />
                 )
  renderItem =  (item,index) =>  
  ( 
    <Card
      elevation = {10}
      style     = {styles.card}
      onPress   = {()=>this.showImage(item.base64)}
    >
      <Card.Cover source={{uri:'data:image/jpeg;base64,'+item.base64}}          
        
        style={{resizeMode:'cover',height:(Layout.height/100) * 15}}
        
      />
      <Card.Title        
        title    = {item.reference_no}
        subtitle = {<Moment element={Text}  
        style    = {{color:Colors.muted}}  fromNow>{item.transac_date}</Moment>}        
        left     = {this.leftComponent}
        right    = {()=>this.rightComponent(item.reference_no,item.fullname,item.amount_val)}
      />
      
      <Card.Content>
        <Text style = {styles.name}>{item.fullname}</Text>
      </Card.Content>
    </Card>
  )


  render() {

    const filteredVouchers = this.state.today_vouchers_list.filter(
      createFilter(this.state.search, KEYS_TO_FILTERS)
    );

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
        <FlatList       
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          onRefresh={this.getScannedVouchers}
          refreshing={this.state.refreshing}                                  
          data={this.state.today_vouchers_list ? filteredVouchers : null}
          extraData = {this.state.today_vouchers_list}
          ListEmptyComponent={this.emptyComponent}
          renderItem={({ item, index }) =>  this.renderItem(item,index)}               
          // contentContainerStyle={{flexGrow:0,paddingBottom:90,paddingTop:100}}
          style={styles.today_voucher_flatlist}
          keyExtractor={(item,index)=>index}                           
        />


        <Animatable.Text style={styles.other_transactions}><FontAwesomeIcon name="info-circle" color={Colors.blue_green} size={16}/>  Other Transactions</Animatable.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  // card:{
  //   top:(Layout.height/100) * 15,
  //   width:(Layout.width/100) * 20,    
  //   left:10
  // },
  card_cover:{    
    width:  100,
    height: 100
  },
  today_voucher_flatlist:{
    top:(Layout.height/100) * 15,
    width:(Layout.width/100) * 100,   
    height:(Layout.height/100) * 30,    
    backgroundColor:Colors.light,
    flexGrow:0,    
  },
  card: {
    flex: 1,
    borderRadius: 5,        
    top:10,
    width:(Layout.width/100) * 90,     
    
    marginRight:(Layout.width/100) * 10  ,
    left:10,
    alignSelf: "center",
    marginBottom: 20,
  },
  empty_card: {
    flex: 1,
    borderRadius: 5,        
    top:10,
    width:(Layout.width/100) * 90,     
    
    marginRight:(Layout.width/100) * 10  ,
    left:10,
    alignSelf: "center",
    marginBottom: 20,
  },
  recent_title:{
    top:(Layout.height/100) * 15,
    left:10,
    fontFamily:'Gotham_bold',
    color:Colors.header_text
  },
  other_transactions:{
    top:(Layout.height/100) * 20,
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
