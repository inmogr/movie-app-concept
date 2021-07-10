import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ROUTES } from "./constants";

import Details from "./pages/Details";
import Home from "./pages/Home";

const Stack = createStackNavigator();

const App = React.memo(() => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name={ROUTES.HOME} component={Home} />
                <Stack.Screen name={ROUTES.DETAILS} component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    );
});

export default App;
