import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 300px; /* Adjust size as needed */
  object-fit: contain;
  border-radius: 8px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 15px; /* Increased gap between buttons */
  margin-top: 25px; /* Added more space between the main image and thumbnails */
  justify-content: center; /* Center thumbnails horizontally */
`;

const ImageButton = styled.div`
  border: 2px solid ${({ active }) => (active ? '#3b82f6' : 'transparent')}; /* Blue border when active */
  height: 60px;
  width: 60px;
  padding: 4px;
  cursor: pointer;
  border-radius: 5px;
  transition: border-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.1); /* Slight zoom effect on hover */
    border-color: #3b82f6; /* Highlight on hover */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensure thumbnails are cropped and fit well */
    border-radius: 5px;
  }
`;

const BigImageWrapper = styled.div`
  text-align: center;
  margin: 20px 0 30px 0; /* Added margin on top and below the main image */
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="Product Thumbnail" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
