import Pagination from 'tui-pagination';

const refs = {
  paginationRef: document.getElementById('pagination'),
};

const paganation = new Pagination(refs.paginationRef, {
  totalItems: 10000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

export default paganation;
