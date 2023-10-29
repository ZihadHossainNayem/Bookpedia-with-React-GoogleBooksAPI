"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";

const Details = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);

  const stripTagsFromDesc = (htmlString) => {
    const regex = /(<([^>]+)>)/gi;
    return htmlString.replace(regex, "");
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (id) {
          /* make API call to get book details based on ID */
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}`
          );
          console.log(response.data);
          setBookInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const bookID = bookInfo?.id || "No ID Available";
  const title = bookInfo?.volumeInfo?.title || "No Title Available";
  const author = bookInfo?.volumeInfo?.authors
    ? bookInfo.volumeInfo.authors.join(", ")
    : "Unknown Author";
  const averageRating = bookInfo?.volumeInfo?.averageRating || "N/A";
  const ratingCount = bookInfo?.volumeInfo?.ratingsCount || "N/A";
  const publishedDate = bookInfo?.volumeInfo?.publishedDate || "N/A";
  const publisher = bookInfo?.volumeInfo?.publisher || "N/A";
  const bookImage = bookInfo?.volumeInfo?.imageLinks?.thumbnail || "N/A";
  const description = bookInfo?.volumeInfo?.description || "N/A";
  const descriptionWithoutTags = stripTagsFromDesc(description);
  const categories = bookInfo?.volumeInfo?.categories || "N/A";
  const language = bookInfo?.volumeInfo?.language || "N/A";
  const pageCount = bookInfo?.volumeInfo?.pageCount || "N/A";
  return (
    <>
      <Navbar />
      <main className="md:px-12 px-4 md:py-6 py-4">
        <h1>Book Details:</h1>
        {bookInfo && (
          <div className="grid md:grid-cols-2 md:gap-0 gap-6">
            <div>
              <Image
                src={bookImage}
                alt="book cover"
                width={400}
                height={534}
                priority
                className="w-[400px] h-[534px] object-cover border shadow-md"
              />
            </div>
            <div>
              <p>Title: {title}</p>
              <p>Google Book ID: {bookID}</p>
              <p>Authors: {author}</p>
              <p>Description: {descriptionWithoutTags}</p>
              <p>Average Rating: {averageRating}</p>
              <p>Total Reviews: {ratingCount}</p>
              <p>Publisher: {publisher}</p>
              <p>Published Date: {publishedDate}</p>
              <p>Categories: {categories}</p>
              <p>Language: {language}</p>
              <p>Total Page: {pageCount}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Details;
