import { useState } from "react";
import "./styles.scss";

const Rating = () => {
  const [ratingData, setRateSelected] = useState({
    rate: 0,
    selected: false,
  });

  const handleHover = (rate: number, selected = ratingData.selected) => {
    setRateSelected({ rate, selected });
  };

  return (
    <div className="rating">
      {ratingData.selected ? (
        <div>Thank you!</div>
      ) : (
        <fieldset className="fieldset">
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <span
                key={item}
                className={ratingData.rate >= item ? "active" : ""}
                onClick={() => handleHover(item, true)}
                onMouseEnter={() =>
                  handleHover(ratingData.selected ? ratingData.rate : item)
                }
                onMouseLeave={() =>
                  handleHover(ratingData.selected ? ratingData.rate : 0)
                }
              >
                &#9733;
              </span>
            );
          })}
        </fieldset>
      )}
    </div>
  );
};

export default Rating;
