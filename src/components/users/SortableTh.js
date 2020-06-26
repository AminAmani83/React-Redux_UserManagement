import React from "react";
import PropTypes from "prop-types";

const SortableTh = ({
  handleSortUserClick,
  sortedByColumn,
  columnName,
  columnLabel,
}) => {
  return (
    <div name={columnName} className="sort" onClick={handleSortUserClick}>
      {columnLabel}{" "}
      {sortedByColumn.column === columnName ? (
        sortedByColumn.reversed ? (
          <span name={columnName} className="upArrow">
            &#9650;
          </span>
        ) : (
          <span name={columnName} className="downArrow">
            &#9660;
          </span>
        )
      ) : null}
    </div>
  );
};

SortableTh.propTypes = {
  handleSortUserClick: PropTypes.func.isRequired,
  sortedByColumn: PropTypes.shape({
    column: PropTypes.string,
    reversed: PropTypes.bool,
  }).isRequired,
  columnName: PropTypes.string.isRequired,
  columnLabel: PropTypes.string.isRequired,
};

export default SortableTh;
