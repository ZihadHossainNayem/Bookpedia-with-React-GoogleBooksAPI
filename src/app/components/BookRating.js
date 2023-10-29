import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export const BookRating = ({ averageRating, ratingCount }) => {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" />);
    }

    const remainingStars = 5 - stars.length;

    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<BsStar key={`empty-${i}`} />);
    }
    return stars;
  };
  return (
    <div className="flex items-center gap-1">
      {renderStars()}
      {/* <span className="ml-1">{averageRating}</span> */}
      <span className="mt-[3px] ml-1">({ratingCount})</span>
    </div>
  );
};
