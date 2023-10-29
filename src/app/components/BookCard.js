import React from "react";
import Image from "next/image";
import { BookRating } from "./BookRating";
import Link from "next/link";

export const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const title = volumeInfo.title || "No Title Available";
  const author = volumeInfo.authors
    ? volumeInfo.authors.join(", ")
    : "Unknown Author";
  const CoverImage =
    volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150";
  const averageRating = volumeInfo.averageRating || "N/A";
  const ratingCount = volumeInfo.ratingsCount || "N/A";

  return (
    <Link href={`/details/${book.id}`}>
      <div
        className="p-2 m-2 max-w-[400px] md:max-h-[280px] flex rounded-lg gap-3 bg-white
      shadow hover:transform hover:scale-105 transition-transform duration-300"
      >
        {/* cover image */}
        <div className="flex items-center px-1 ">
          <Image
            src={CoverImage}
            alt="book cover"
            width={320}
            height={512}
            priority
            className="w-40 h-64 object-cover"
          />
        </div>
        {/* text details */}
        <div className="flex flex-col my-auto gap-2 flex-1">
          <h1 className="md:text-2xl text-xl text-gray-800 font-semibold line-clamp-3">
            {title}
          </h1>
          <p className="text-gray-500">
            by <span>{author}</span>
          </p>
          <BookRating averageRating={averageRating} ratingCount={ratingCount} />
          <span className="text-gray-800">
            {volumeInfo.publishedDate
              ? volumeInfo.publishedDate.split("-")[0]
              : "Unknown Year"}
          </span>
        </div>
      </div>
    </Link>
  );
};
