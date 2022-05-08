import * as React from 'react';
import ForgotPasswordScreen from '../Screens/Login/ForgotPassword';

import LoginScreen from "../Screens/Login/Login";
import SignupScreen from "../Screens/Signup/Signup";

export default function (Stack) {
    return (
        <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </>
    );
}
