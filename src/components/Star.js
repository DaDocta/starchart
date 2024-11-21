import React, { useEffect, useState } from "react";

const Star = () => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const size = Math.random() * 3 + 1; // Random size between 1px and 4px
    const top = Math.random() * 100; // Random vertical position
    const left = Math.random() * 100; // Random horizontal position
    const moveX = Math.random() * 20 - 10 + "px"; // Random horizontal movement (-10px to 10px)
    const moveY = Math.random() * 20 - 10 + "px"; // Random vertical movement (-10px to 10px)

    setStyle({
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      animationDelay: `${Math.random() * 5}s`, // Random twinkle delay
      "--moveX": moveX,
      "--moveY": moveY,
    });
  }, []);

  return <div className="star" style={style}></div>;
};

export default Star;
