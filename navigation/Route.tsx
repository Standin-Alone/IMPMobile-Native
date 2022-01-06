import  React,{Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../components/LoginScreen';

const Stack  = createStackNavigator();

function MyStack(){
    return(

        <Stack.Navigator>            
            <Stack.Screen component={LoginScreen} name='LoginScreen' options={{headerShown:false,headerTransparent:true}}/>
        </Stack.Navigator>
    )
    
}


export default function Route(){



    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}