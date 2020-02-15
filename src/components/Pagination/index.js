import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash';

function Pagination(props) {
const { itemsCount, pageSize, onPageChange } = props;
const pagesCount = Math.ceil(itemsCount / pageSize);
if (pagesCount === 1) return null;
const pages = _.range(1, pagesCount + 1);

  return(
    <nav>
      {
        pages.map((obj, index) => {
          return(
            // <ul key={index}>
              <button key={index} onClick={() => onPageChange(obj)}>{obj}</button>
            // </ul>
          );
        })
      }
    </nav>
  );
}

export default Pagination;