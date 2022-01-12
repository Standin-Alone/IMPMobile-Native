import  React,{Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../components/LoginScreen';
import OTPScreen from '../components/OTPScreen';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const Stack  = createStackNavigator();

function MyStack(){
    return(

        <Stack.Navigator initialRouteName='Root'>            
            <Stack.Screen component={LoginScreen} name='LoginScreen' options={{headerShown:false,headerTransparent:true}}/>
            <Stack.Screen component={OTPScreen} name='OTPScreen' options={{headerShown:false,headerTransparent:true}}/>
            <Stack.Screen component={BottomTabNavigator} name='Root' options={{headerShown:false,headerTransparent:true}}/>
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