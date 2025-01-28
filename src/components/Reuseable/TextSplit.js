import React, { Fragment } from "react";

const TextSplit = ({
  text = "",
  separator = "\n",
  children = "",
  highlight = "",
}) => {
  const newText = children || text;
  const arr = newText.split(separator);
  const lastIndex = arr.length - 1;
  const newHighlight = highlight.toLowerCase();

  return (
    <Fragment>
      {arr.map((t, i) => {
        const newT = t.trim();
        const lowerT = newT.toLowerCase();
        return (
          <Fragment key={i}>
            {highlight && lowerT.includes(newHighlight) ? (
              lowerT === newHighlight ? (
                <span>{newT}</span>
              ) : (
                newT
                  .split(" ")
                  .map((st, j) =>
                    st.toLowerCase() === newHighlight ? (
                      <span key={j}>{st} </span>
                    ) : (
                      st + " "
                    )
                  )
              )
            ) : (
              newT
            )}{" "}
            {i !== lastIndex && <br />}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default TextSplit;
