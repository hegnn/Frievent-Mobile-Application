import React, {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventDetail from '../Screens/EventDetail';
import Home from '../Screens/Home';
import CreateEvent from '../Screens/CreateEvent';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {hideTabbar} from '../redux/actions/common';
import {connect} from 'react-redux';
import {Image, View} from 'react-native';
import HeaderLogo from '../Assets/HeaderLogo.png';

const HomePageNavigation = ({navigation, route, tabBarStatus}) => {
  const Stack = createNativeStackNavigator();
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'CreateEvent' || tabBarStatus) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route, tabBarStatus]);

  const CustomHeader = () => {
    return (
      <Image
        style={{
          height: 30,
          width: '90%',
          resizeMode: 'contain',
        }}
        source={HeaderLogo}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerTitle: props => <CustomHeader {...props} />}}
      />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="EventDetailScreen" component={EventDetail} />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  tabBarStatus: state.common.hide,
});

export default connect(mapStateToProps)(HomePageNavigation);
