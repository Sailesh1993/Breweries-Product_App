import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  name: string;
}

interface Props {
  items: Item[];
}

const Pagination: React.FC<Props> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);

  return (
    <div>
      {displayedItems.map((item: Item) => (
        <div key={item.id}>
          <Link to={`/products/${item.id}`}>{item.name}</Link> 
        </div>
      ))}
      <ReactPaginate
        pageCount={Math.ceil(items.length / itemsPerPage)}
        nextLabel="next >"
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        previousLabel="< previous"
        marginPagesDisplayed={2}
        pageLinkClassName="page-link"
        pageClassName="page-item"
        previousClassName="page-item"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
