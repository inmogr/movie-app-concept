import React from "react";

import { ApiAxios } from "../libs";

// I know this is duplicate but I don't know if the provider has get item as I did not find docs
// Also in real life usually get item is different than get list
export const useMovieGet = () => {
    const [loading, setLoading] = React.useState<boolean>();
    const [error, setError] = React.useState<string>();
    const [data, setData] = React.useState<any>();

    const fetch = async (id: string) => {
        setTimeout(() => {
            setLoading(true);
        }, 1);
        try {
            const res = await ApiAxios.get("/movies");
            const item = res.data?.movies?.find((i: any) => i.id === id);
            setData(item);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return { loading, error, data, fetch };
};
