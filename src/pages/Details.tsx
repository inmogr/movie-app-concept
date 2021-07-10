import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { ROUTES } from "../constants";

const Details = React.memo(() => {
    const navigation = useNavigation();

    const navToHome = React.useCallback(() => {
        navigation.navigate(ROUTES.HOME);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Details Screen</Text>
            <Button onPress={navToHome}>{ROUTES.HOME}</Button>
        </View>
    );
});

export default Details;
