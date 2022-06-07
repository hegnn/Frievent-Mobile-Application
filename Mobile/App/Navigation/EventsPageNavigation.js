
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Events from '../Screens/Events';
import EventDetail from '../Screens/EventDetail';

const EventsPageNavigation = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator >
            <Stack.Screen name="EventsScreen" component={Events} options={{headerShown: false}} />
            <Stack.Screen name="EventDetailScreen" component={EventDetail} />
        </Stack.Navigator>
    )
}

export default EventsPageNavigation
