import React from "react";
import StarIcon from "@mui/icons-material/Star";
function Rating(props) {
  let count = 0;
  return (
    <>
      {[...Array(5)].map(() => {
        count = count + 1;
        if (count <= props.rating) {
          return (
            <StarIcon style={{ color: "#ffac33" }} fontSize={props.fontSize} />
          );
        } else {
          return <StarIcon fontSize={props.fontSize} />;
        }
      })}
    </>
  );
}

export default Rating;
