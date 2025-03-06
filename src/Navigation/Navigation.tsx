import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Screens } from '../Utils/Const';
import { StartupScreen, DashboardScreen, RegisterUserScreen } from '../Screens';
import CreateRoomScreen from '../Screens/CreateRoom/CreateRoomScreen';

export type RootStackParamList = {
  RegisterUser: undefined;
  StartupScreen: undefined;
  Dashboard: undefined;
  CreateRoom: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Screens.StartupScreen}
        screenOptions={{ headerShown: false, animation: 'ios_from_right' }}
      >
        <Stack.Screen name={Screens.StartupScreen} component={StartupScreen} />
        <Stack.Screen name={Screens.RegisterUser} component={RegisterUserScreen} />
        <Stack.Screen name={Screens.Dashboard} component={DashboardScreen} />
        <Stack.Screen name={Screens.CreateRoom} component={CreateRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
