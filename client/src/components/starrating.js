import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Starating = ({ response, submit, allDataNotNull, setResponse, name }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);

  useEffect(() => {
    if (response[name] === null) setCurrentValue(0);
  }, [submit]);

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const Rating = ["Bad", "Average", "Good", "Very Good", "Excellent"];

  const handleClick = (value, rate, name) => {
    const newValue = value === currentValue ? 0 : value;
    setCurrentValue(newValue);

    setResponse((response) => ({
      ...response,
      [name]: newValue > 0 ? rate : null,
    }));
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  allDataNotNull();

  return (
    <div id="svgContainer">
      {Rating.map((Obj, index) => (
        <FaStar
          key={index}
          size={24}
          name={Obj}
          onClick={() => handleClick(index + 1, Obj, name)}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseLeave={handleMouseLeave}
          value={Obj}
          color={
            (hoverValue || currentValue) > index ? colors.orange : colors.grey
          }
          style={{
            marginRight: 10,
            marginTop: 15,
            marginLeft: 20,
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
};

export default Starating;
