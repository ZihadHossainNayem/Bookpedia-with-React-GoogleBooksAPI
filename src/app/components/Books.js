"use client";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { BookCard } from "./BookCard";

export const Books = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  /* api */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          /*   `https://www.googleapis.com/books/v1/volumes?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}&maxResults=20&orderBy=relevance&q=programming` */
          `https://www.googleapis.com/books/v1/volumes?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}&maxResults=20&orderBy=relevance&q=science`
        );
        setRecommendedBooks(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="md:px-12 px-4 md:py-6 py-4 bg-[#d4ecd6]">
      {/* search */}
      <div className="flex items-center justify-center w-full">
        <form className="w-[70%] relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full border px-4 py-2 pr-12 focus:outline-none rounded-lg"
          />
          <button className="py-2 px-4 absolute right-0 top-0">
            <BiSearch size={25} className="text-gray-700" />
          </button>
        </form>
      </div>
      {/* recommendation */}
      <div className="mt-6">
        <h1 className="text-gray-800 text-2xl font-semibold">
          Recommended Books
        </h1>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 md1:grid-cols-3 md2:grid-cols-4">
            {recommendedBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
      </div>
      {/* results */}
      <div></div>
    </div>
  );
};
