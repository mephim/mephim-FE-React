import Table from 'react-bootstrap/Table';
function ListMovie() {
    return <div>
        <h3>Danh sách phim</h3>
        <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên phim</th>
          <th>Đạo diễn</th>
          <th>Diễn viên</th>
          <th>Thời lượng</th>
          <th>Mô tả</th>
          <th>Poster</th>
          <th>Trailer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Oeeeeeeeeeeeeeetto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdeeeeeeeeeeeeeeeeeeeeeeeeeeeeo</td>
        </tr>
      </tbody>
    </Table>

    </div>;
}

export default ListMovie;