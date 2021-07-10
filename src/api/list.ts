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
            const genres: Record<string, any> = {};
            
            const movies = res.data?.movies || [];
            for (const movie of movies) {
                for (const genre of movie.genres) {
                    const existing = genres[genre] || { items: [] }
                    existing.items = [...existing.items, movie];
                    genres[genre] = existing;
                }
            }

            const list = Object.keys(genres).map((genre) => ({ genre, items: genres[genre] }))
            setData(list);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return { loading, error, data, fetch };
};
