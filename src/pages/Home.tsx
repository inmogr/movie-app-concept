import React from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useMovieList } from "../api";
import MovieList from "../components/MovieList";

const Home = React.memo(() => {
    const { loading, error, data, fetch } = useMovieList();
    React.useEffect(() => {
        fetch();
        const id = setInterval(() => {
            fetch();
        }, 60000);
        return () => {
            clearInterval(id);
        };
    }, []);

    React.useEffect(() => {
        if (error) {
            Alert.alert("Error", error);
        }
    }, [error]);

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.genre}
                    ListHeaderComponent={<Text style={styles.header}>{"Wookie\nMovies"}</Text>}
                    ListEmptyComponent={loading ? <ActivityIndicator /> : null}
                    renderItem={({ item }) => (
                        <View key={item.genre} style={styles.body}>
                            <Text style={styles.genre}>{item.genre}</Text>
                            <MovieList items={item.items} horizontal />
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
});

export default Home;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    header: {
        width: "100%",
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 8,
        paddingBottom: 16,
    },
    body: {
        width: "100%",
        paddingVertical: 8,
    },
    genre: {
        fontSize: 16,
        fontWeight: "bold",
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
});
