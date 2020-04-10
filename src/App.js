import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]); // empty array for no loop

  return (
    <>
      <h1 className="text-4xl text-center bg-teal-500">Pixabay Image Finder</h1>
      <div className="flex justify-center">
        <div className="container pl-4 pr-4  min-w-full">
          <ImageSearch searchText={(text) => setTerm(text)} />

          {!isLoading && images.length === 0 && (
            <h1 className="text-5xl text-center mx-auto mt-3">No Images Found</h1>
          )}
          <div className="flex">
            {isLoading ? (
              <h1 className="text-6xl text-center mx-auto mt-3">Loading...</h1>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 grid-cols-1 gap-4 mx-auto">
                {images.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
