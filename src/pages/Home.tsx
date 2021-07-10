import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { ROUTES } from "../constants";

const Home = React.memo(() => {
    const navigation = useNavigation();

    const navToDetails = React.useCallback(() => {
        navigation.navigate(ROUTES.DETAILS);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home Screen</Text>
            <Button onPress={navToDetails}>{ROUTES.DETAILS}</Button>
        </View>
    );
});

export default Home;
