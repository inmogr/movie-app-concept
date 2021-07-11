import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Button } from "react-native-paper";

import { useMovieGet } from "../api";
import RatingStars from "../components/RatingStars";
import { ROUTES } from "../constants";

export interface DetailsProps {
    route?: {
        params?: {
            id?: string;
        };
    };
}

const Details = React.memo((props: DetailsProps) => {
    const navigation = useNavigation();

    const { loading, error, data, fetch } = useMovieGet();
    React.useEffect(() => {
        fetch(props?.route?.params?.id || "");
    }, []);

    const navToHome = React.useCallback(() => {
        navigation.navigate(ROUTES.HOME);
    }, []);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.loading}>
                {/* JUST SIMPLE ERROR PAGE IN REAL LIFE YOU CAN CREATE 404 OR OTHER WAYS */}
                <Text>Not Found</Text>
                <Button onPress={navToHome}>{ROUTES.HOME}</Button>
            </View>
        );
    }

    const title = `${data?.title || ""} (${data?.imdb_rating || 0})`;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.flexGrow} showsVerticalScrollIndicator={false} bounces={false}>
                <FastImage style={styles.backdrop} source={{ uri: data?.backdrop }} />
                <SafeAreaView>
                    <View style={styles.area}>
                        <View style={styles.posterWrapper}>
                            <FastImage style={[styles.posterWrapper, styles.poster]} source={{ uri: data?.poster }} />
                        </View>
                        <View style={{ width: 24 }} />
                        <View style={styles.titleWrapper}>
                            <Text style={[styles.titleWrapper, styles.title, title.length > 19 ? styles.titleLong : undefined]}>{title}</Text>
                        </View>
                    </View>
                    <View style={[styles.area, { height: 75, alignItems: "flex-end" }]}>
                        <View style={styles.posterWrapper} />
                        <View style={{ width: 24 }} />
                        <RatingStars rating={data?.imdb_rating} />
                    </View>
                    <View style={[styles.area, styles.areaPadding]}>
                        <Text>{data?.released_on ? new Date(data?.released_on).getFullYear() : "-"}</Text>
                        <Text>{" | "}</Text>
                        <Text>{data?.length}</Text>
                        <Text>{" | "}</Text>
                        <Text>{data?.director}</Text>
                    </View>
                    <View style={[styles.area, styles.areaPadding]}>
                        <Text>{"Cast: "}</Text>
                        <Text>{data?.cast.join(", ")}</Text>
                    </View>
                    <View style={[styles.area, styles.areaPadding]}>
                        <Text>
                            {"Movie description: "}
                            {data?.overview}
                        </Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
});

export default Details;

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        height: "100%",
        width: "100%",
    },
    backdrop: {
        height: 256,
        width: "100%",
    },
    area: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 32,
    },
    areaPadding: {
        paddingTop: 16,
    },
    posterWrapper: {
        width: 100,
    },
    poster: {
        position: "absolute",
        top: -75,
        height: 150,
    },
    titleWrapper: {
        flex: 1,
    },
    title: {
        top: -32,
        position: "absolute",
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    titleLong: {
        top: -64,
    },
    flexGrow: {
        flexGrow: 1,
    },
});
