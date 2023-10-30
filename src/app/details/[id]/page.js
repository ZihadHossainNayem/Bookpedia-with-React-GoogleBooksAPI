"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { BookRating } from "@/app/components/BookRating";

const MAX_DESCRIPTION_LENGTH = 108;

const Details = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const googleID = bookInfo?.id || "No ID Available";
  const title = bookInfo?.volumeInfo?.title || "No Title Available";
  const author = bookInfo?.volumeInfo?.authors
    ? bookInfo.volumeInfo.authors.join(", ")
    : "Unknown Author";
  const averageRating = bookInfo?.volumeInfo?.averageRating || "N/A";
  const ratingCount = bookInfo?.volumeInfo?.ratingsCount || "N/A";
  const publishedDate = bookInfo?.volumeInfo?.publishedDate || "N/A";
  const publisher = bookInfo?.volumeInfo?.publisher || "N/A";
  const bookImage =
    bookInfo?.volumeInfo?.imageLinks?.thumbnail ||
    "https://via.placeholder.com/150";
  const description = bookInfo?.volumeInfo?.description || "N/A";
  const descriptionWithoutTags = stripTagsFromDesc(description);

  const descriptionWords = descriptionWithoutTags.split(" ");
  const displayedDescription = showFullDescription
    ? descriptionWords.join(" ")
    : descriptionWords.slice(0, MAX_DESCRIPTION_LENGTH).join(" ");
  const showSeeMore = descriptionWords.length > MAX_DESCRIPTION_LENGTH;

  const categories = bookInfo?.volumeInfo?.categories || "N/A";
  const language = bookInfo?.volumeInfo?.language || "N/A";
  const pageCount = bookInfo?.volumeInfo?.pageCount || "N/A";
  const printType = bookInfo?.volumeInfo?.printType || "N/A";

  return (
    <>
      <Navbar />
      <main className="md:px-12 lg:px-24 px-4 md:py-6 py-4 bg-[#fafbfd] h-screen">
        {bookInfo && (
          <div className="grid md:grid-cols-2 md:gap-0 gap-6">
            {/* left - thumbnail image */}
            <div className="pt-2 mx-auto">
              <Image
                src={bookImage}
                alt="book cover"
                width={390}
                height={570}
                priority
                className="w-[390px] h-[570px] object-cover border shadow-md"
              />
            </div>
            {/* right - information */}
            <div className="pt-1 pl-4">
              <p className="text-2xl font-semibold text-gray-800">{title}</p>
              <p className="text-gray-500 mt-4">by {author}</p>
              <div className="text-gray-600">
                <BookRating
                  averageRating={averageRating}
                  ratingCount={ratingCount}
                />
              </div>
              <div className="my-6 text-gray-600 text-justify">
                {displayedDescription}
                {showSeeMore && (
                  <span
                    className="text-gray-900 font-medium cursor-pointer"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? " See less" : " See more..."}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                {categories && Array.isArray(categories)
                  ? categories.map((category, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 bg-slate-200 text-gray-800 rounded"
                      >
                        {category}
                      </div>
                    ))
                  : null}
              </div>

              <h1 className="text-gray-700 text-xl font-medium mt-6">
                Book Details
              </h1>
              <div className="mt-2 text-gray-500 space-y-1 mb-8">
                <p>Publisher: {publisher}</p>
                <p>
                  Published Date: {new Date(publishedDate).toLocaleDateString()}
                </p>
                <p>Language: {language}</p>
                <p>Total Pages: {pageCount}</p>
                <p>Print Type: {printType}</p>
                <p>Google Book ID: {googleID}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Details;
