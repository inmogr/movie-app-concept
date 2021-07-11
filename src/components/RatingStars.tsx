import React from "react";
import { View } from "react-native";

import { Asset } from "../assets";

export const convertRatingToStars = (rating?: number) => {
    if (!rating) {
        return 0;
    }
    return Math.floor((rating / 10) * 5);
};

export const getStarsArray = (rating?: number) => {
    const count = convertRatingToStars(rating);
    const stars = new Array(5).fill(0);
    stars.fill(1, 0, count);
    return stars;
};

export interface RatingStarsProps {
    rating?: number;
}

const RatingStars = React.memo((props: RatingStarsProps) => {
    return (
        <React.Suspense fallback={null}>
            {getStarsArray(props.rating).map((star, index) => (
                <React.Fragment key={index}>
                    {index ? <View style={{ width: 8 }} /> : null}
                    {star ? <Asset.star height={32} width={32} /> : <Asset.star_outline height={32} width={32} />}
                </React.Fragment>
            ))}
        </React.Suspense>
    );
});

export default RatingStars;
