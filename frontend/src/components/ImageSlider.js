import React, { useState, useEffect } from "react";
import BtnSlider from "./BtnSlider";
import { useSelector, useDispatch } from "react-redux";
import { listProductImages } from "../actions/imagesActions";
import Loader from "../components/Loader";

function ImageSlider() {
  const [slideIndex, setSlideIndex] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const productImagesList = useSelector((state) => state.productImagesList);
  const { images } = productImagesList;
  console.log("ImageSlider", images);

  const dispatch = useDispatch();

  const nextSlide = () => {
    if (slideIndex !== images.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === images.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(images.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    if (product._id != NaN) {
      dispatch(listProductImages(Number(product._id)));
    }
  }, [product]);

  return (
    <div className="container-slider">
      {!images ? (
        <Loader />
      ) : (
        images.map((image, index) => {
          return (
            <div
              key={index}
              className={
                slideIndex === index + 1 ? "slide_img active-anim" : "slide_img"
              }
            >
              <img src={image.images} />
            </div>
          );
        })
      )}

      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
    </div>
  );
}

export default ImageSlider;
