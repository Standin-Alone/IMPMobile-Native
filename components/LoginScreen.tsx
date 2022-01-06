import React, {Component} from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Fumi} from 'react-native-textinput-effects';
import Colors from '../constants/Colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Layout from '../constants/Layout';
import Button from 'apsl-react-native-button';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading:false,
        focus_username_txt:false,
        username:'',
        password:''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        
        
        <LinearGradient colors={['#80ed99', '#80ed99', '#80ed99']} style={styles.top_gradient} start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}>     
            <Animatable.View style={styles.title_container} animation="fadeInDownBig">
                <Text style={styles.title} numberOfLines={2}> Welcome to </Text>
                <Text style={styles.title} numberOfLines={2}> Intervention Management Platform</Text>

           
            </Animatable.View>              
       

        <Animatable.View animation="slideInLeft" >
            <Fumi
            label={'Username'}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={Colors.green}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={[styles.username,{borderColor: this.state.focus_username_txt == true || this.state.username.length != 0  ? Colors.light_green : Colors.light}]}
            onFocus = {()=>this.setState({focus_username_txt:true})}
            onBlur = {()=>this.setState({focus_username_txt:false})}
            onChangeText={(value)=>this.setState({username:value})}
            keyboardType="email-address"
            />
        </Animatable.View>
        
        <Animatable.View animation="slideInLeft" delay={500} >
            <Fumi
            label={'Password'}
            iconClass={FontAwesomeIcon}
            iconName={'key'}
            iconColor={Colors.green}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={[styles.password,{borderColor: this.state.focus_password_txt == true || this.state.password.length != 0  ? Colors.light_green : Colors.light}]}
            onFocus = {()=>this.setState({focus_password_txt:true})}
            onBlur = {()=>this.setState({focus_password_txt:false})}
            onChangeText={(value)=>this.setState({password:value})}
            secureTextEntry={true}
            />
        </Animatable.View>

        <Button
          textStyle={styles.login_txt}
          style={styles.login_btn}
          activityIndicatorColor={'white'}
          isLoading={this.state.isLoading}
          disabledStyle={{opacity: 1}}
         >
          Login
        </Button>
        </LinearGradient>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  top_gradient:{
      zIndex:1,
      paddingBottom:30,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20  
  }, 
  title:{
    top: (Layout.height / 100) * 20,   
    color:Colors.light,     
    alignSelf:'center',
    fontFamily:'Gotham_bold',
    
    fontSize:20,    
  },
  title_container:{        
    alignContent:'center',
    alignSelf:'center'
  },
  username: {
    width: (Layout.width / 100) * 90,
    top: (Layout.height / 100) * 40,
    left: (Layout.width / 100) * 5,
    fontFamily:'Gotham_bold',
    borderWidth:1,
    borderRadius:10,
    backgroundColor: '#F7F7F7',
    fontSize: 1,
  },
  password: {
    width: (Layout.width / 100) * 90,
    top: (Layout.height / 100) * 42,
    left: (Layout.width / 100) * 5,
    fontFamily:'Gotham_bold',
    borderWidth:1,
    borderRadius:10,
    backgroundColor: '#F7F7F7',
    fontSize: 20,
  },
  login_txt:{
    color:Colors.light,    
    fontFamily:'Gotham_bold',
  },
  login_btn:{    
    top: (Layout.height / 100) * 45,
    width: (Layout.width / 100) * 90,
    left: (Layout.width / 100) * 5,
    borderColor: Colors.green,
    backgroundColor: Colors.green,    
  }
});
