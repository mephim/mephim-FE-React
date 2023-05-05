import { Space, Table, Tag, Button } from 'antd';
import { LikeOutlined, LikeFilled, StopOutlined } from '@ant-design/icons';
const { Column } = Table;
function Category() {
    return (
        <div>
            <h4>Quản lý thể loại</h4>
            {/* <Table dataSource={listRate}>
        <Column title="ID rate" dataIndex="rateId" key="rateId" />
        <Column title="User" dataIndex="username" key="username" />
        <Column title="Tên phim" dataIndex="movieName" key="movieName" />
        <Column title="Số sao" dataIndex="numRate" key="numRate" />
        <Column title="Nội dung" dataIndex="content" key="content" />
        <Column
            title="Like"
            key="liked"
            render={(_: any, record: IRateResponse) => (
                <Space size="large">
                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={record.liked ? <LikeFilled /> : <LikeOutlined />}
                        onClick={() => likeThisRate(record.rateId, record.liked)}
                    />
                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={<StopOutlined />}
                        onClick={() => deleteThisRate(record.rateId)}
                    />
                </Space>
            )}
        />
    </Table> */}
        </div>
    );
}
export default Category;
