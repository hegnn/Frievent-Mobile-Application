import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EventDetail from "../Screens/EventDetail";
import Home from "../Screens/Home";
import CreateEvent from "../Screens/CreateEvent";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { hideTabbar } from "../redux/actions/common";
import { connect } from "react-redux";

const HomePageNavigation = ({ navigation, route, tabBarStatus }) => {
  const Stack = createNativeStackNavigator();
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "CreateEvent" || tabBarStatus) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route, tabBarStatus]);

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="EventDetailScreen" component={EventDetail} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  tabBarStatus: state.common.hide,
});

export default connect(mapStateToProps)(HomePageNavigation);
