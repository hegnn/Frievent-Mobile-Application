import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../Screens/Profile';
import EventsPageNavigation from './EventsPageNavigation';
import HomePageNavigation from './HomePageNavigation';
import {Colors, EventColors} from '../utility/Colors';

const BottomTabNavigation = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomePageNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../Assets/Icons/Home.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? EventColors.green : Colors.black,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Events"
        component={EventsPageNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../Assets/Icons/Search.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? EventColors.green : Colors.black,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../Assets/Icons/Profile4.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? EventColors.green : Colors.black,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
