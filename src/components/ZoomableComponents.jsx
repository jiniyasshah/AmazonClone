import React, { useState, useEffect } from "react";
import "../css/Header.css";
import "../css/Product.css";

const useZoomEffect = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsZoomed(isHovered);
      },
      isHovered ? 0 : 500
    ); // Delay unzooming effect by 500ms

    return () => {
      clearTimeout(timer);
      setIsZoomed(false);
    };
  }, [isHovered]);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return { isZoomed, handleHover };
};

const ZoomableImage = ({ imageUrl, className, alt }) => {
  const { isZoomed, handleHover } = useZoomEffect();

  return (
    <div className="image-container">
      <img
        src={imageUrl}
        alt={alt}
        className={`${className} ${isZoomed ? "zoomed" : ""}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      />
    </div>
  );
};

const ZoomableOption = ({ content }) => {
  const { isZoomed, handleHover } = useZoomEffect();

  return (
    <div
      className={`header__option ${isZoomed ? "zoomed" : ""}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      {content}
    </div>
  );
};

export { ZoomableImage, ZoomableOption };
