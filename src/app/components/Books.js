"use client";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from "axios";
import { BookCard } from "./BookCard";

export const Books = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Art");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsMessage, setSearchResultsMessage] = useState("");
  const totalBooks = 40;

  /* for pagination */
  const booksPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Art",
    "Biography",
    "Business",
    "Cooking",
    "Comics",
    "Education",
    "Fiction",
    "Health",
    "History",
    "Music",
    "Mystery",
    "Philosophy",
    "Psychology",
    "Romance",
    "Science",
    "Sports",
    "Technology",
    "Travel",
  ];

  // Google Book API
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        let response;

        if (searchTerm) {
          response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&orderBy=relevance&printType=all&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}&maxResults=${totalBooks}`
          );
        } else {
          response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${selectedCategory}&orderBy=relevance&printType=all&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}&maxResults=${totalBooks}`
          );
        }

        if (isMounted) {
          const books = response.data.items || [];

          if (books.length === 0) {
            setSearchResultsMessage("No results found.");
          } else {
            setSearchResultsMessage("");
          }

          setRecommendedBooks(books);
          console.log(books);
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setSearchResultsMessage("Error fetching search results.");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchTerm, currentPage]);

  /* total pages needed for pagination */
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  /* pagination handler */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  return (
    <div className="lg:px-24 md:px-12  px-4 md:py-6 py-4 flex flex-col md:flex-row bg-[#fafbfd]">
      {/* left section - category */}
      <div className="md:mr-8 mr-0">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">
          Popular Categories
        </h2>
        <div className="flex flex-wrap md:block gap-2 text-sm md:text-base">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center mb-4 w-auto">
              <input
                type="radio"
                id={category}
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* right section */}
      <div className="w-full md:ml-6 ml-0">
        {/* search */}
        <div className="flex items-center justify-center w-full mb-6">
          <form
            className="w-full relative"
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          >
            <input
              type="text"
              placeholder="Search here..."
              className="w-full border px-4 py-2 pr-12 focus:outline-none rounded-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="py-2 px-4 absolute right-0 top-0">
              <BiSearch size={25} className="text-gray-700" />
            </button>
          </form>
        </div>
        {/* recommendation */}
        <div className="mt-6">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 md1:grid-cols-3 md2:grid-cols-4">
              {recommendedBooks.length > 0 ? (
                recommendedBooks
                  .slice(startIndex, endIndex)
                  .map((book, index) => <BookCard key={index} book={book} />)
              ) : (
                <span>{searchResultsMessage}</span>
              )}
            </div>
          </div>
        </div>
        {/* pagination buttons*/}
        {recommendedBooks.length > 0 ? (
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              onClick={handlePrevPage}
              className="mr-4"
              disabled={currentPage === 1}
            >
              <GrFormPrevious className="text-3xl hover:bg-gray-200 rounded-lg" />
            </button>
            <span>{`page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              className="ml-4"
              disabled={currentPage === totalPages}
            >
              <GrFormNext className="text-3xl hover:bg-gray-200 rounded-lg" />
            </button>
          </div>
        ) : (
          ""
        )}

        {/* results */}
        <div></div>
      </div>
    </div>
  );
};
