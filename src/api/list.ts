import React from "react";

import { ApiAxios } from "../libs";

export const useMovieList = () => {
    const [loading, setLoading] = React.useState<boolean>();
    const [error, setError] = React.useState<string>();
    const [data, setData] = React.useState<any[]>();

    const fetch = async () => {
        setTimeout(() => {
            setLoading(true);
        }, 1);
        try {
            const res = await ApiAxios.get("/movies");
            setData(res.data);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return { loading, error, data, fetch };
};
