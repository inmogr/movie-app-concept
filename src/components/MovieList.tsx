import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Button } from "react-native-paper";

import { ROUTES } from "../constants";

export interface MovieListProps {
    items: Movie[];
    horizontal?: boolean;
}

const MovieList = React.memo((props: MovieListProps) => {
    const navigation = useNavigation();

    const navToDetails = React.useCallback((item: Movie) => {
        return () => {
            navigation.navigate(ROUTES.DETAILS, { id: item.id });
        };
    }, []);

    return (
        <FlatList
            horizontal={props.horizontal}
            data={props.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Button key={item.id} onPress={navToDetails(item)}>
                    <FastImage style={styles.image} source={{ uri: item.poster }} />
                </Button>
            )}
        />
    );
});

export default MovieList;

const styles = StyleSheet.create({
    image: {
        height: 128,
        width: 72,
    },
});
