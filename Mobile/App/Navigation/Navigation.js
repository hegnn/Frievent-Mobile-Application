import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import BottomTabNavigation from "./BottomTabNavigation";
import { connect } from "react-redux";
import axios from "axios";

const Navigation = ({ isLoggedIn, userId }) => {
  const Stack = createNativeStackNavigator();
  if (userId) axios.defaults.headers.common.userid = userId;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            {/* <Stack.Screen name="BottomTab" component={BottomTabNavigation} /> */}
          </>
        ) : (
          <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  userId: state.auth.data._id,
});

export default connect(mapStateToProps, null)(Navigation);
