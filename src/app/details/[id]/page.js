"use client";
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Details = () => {
  const id = useParams();
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (id) {
          /* make API call to get book details based on ID */
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id.id}`
          );
          console.log(response.data);
          setBookInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };
    fetchBookDetails();
  }, []);

  const title = bookInfo.volumeInfo.title || "No Title Available";
  const author = bookInfo.volumeInfo.authors
    ? bookInfo.volumeInfo.authors.join(", ")
    : "Unknown Author";
  /*   const CoverImage =
    bookInfo.volumeInfo.imageLinks?.thumbnail ||
    "https://via.placeholder.com/150"; */
  const averageRating = bookInfo.volumeInfo.averageRating || "N/A";
  const ratingCount = bookInfo.volumeInfo.ratingsCount || "N/A";

  return (
    <div>
      <h1>book details:</h1>
      <p>{title}</p>
      <p>{author}</p>
      <p>{averageRating}</p>
      <p>{ratingCount}</p>
    </div>
  );
};

export default Details;
