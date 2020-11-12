import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupsPage from '../../pages/groups/groups.page';
import SessionPage from '../../pages/session/session.page';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Session"
    screenOptions={{ cardStyle: { backgroundColor: '#F4D8CD' } }}>
    <Stack.Screen
      name="Groups"
      component={GroupsPage}
      options={{ title: 'Grupos' }}
    />
    <Stack.Screen
      name="Session"
      component={SessionPage}
      options={{ title: 'Login', headerShown: false }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
