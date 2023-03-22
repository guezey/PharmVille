import Pagination from 'react-bootstrap/Pagination';

function Paginate({postsPerPage, totalPosts, paginate}) {

  let items = [];
    for (let number = 1; number <= Math.ceil(totalPosts / postsPerPage); number++) {
        items.push(
          <Pagination.Item key={number} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>,
        );
    }
    return(
            <Pagination size="sm">{items}</Pagination>
    );
}

export default Paginate;