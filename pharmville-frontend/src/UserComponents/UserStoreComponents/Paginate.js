import Pagination from 'react-bootstrap/Pagination';
import "./Pagination.css";

function Paginate({postsPerPage, totalPosts, paginate}) {

  let items = [];
    for (let number = 1; number <= Math.ceil(totalPosts / postsPerPage); number++) {
        items.push(
          <Pagination.Item className='pageNo' key={number} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>,
        );
    }
    return(
      <div className="paginationHolder">
            <Pagination size="sm">{items}</Pagination>
      </div>
    );
}

export default Paginate;