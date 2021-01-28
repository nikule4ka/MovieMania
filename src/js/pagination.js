import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const refs = {
  paginationRef: document.getElementById('pagination'),
};

const paganation = new Pagination(refs.paginationRef, {
  totalItems: 10000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

// console.log(paganation);

export default paganation;
