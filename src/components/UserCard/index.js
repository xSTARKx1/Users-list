import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Typography, Space } from 'antd';
import { BookOutlined, UnorderedListOutlined } from '@ant-design/icons';

import { AlbumModal } from '../../components';
import { getAlbums, resetAlbums } from '../../features/users/usersSlice';

import './index.scss';

const UserCard = (props) => {
  const { id, name, email, website, phone, company } = props.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Text } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    dispatch(getAlbums(id));
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(resetAlbums());
    setIsModalOpen(false);
  };

  const redirectToPostPage = () => {
    return navigate(`/posts/${id}`);
  };

  return (
    <Col>
      <AlbumModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        name={name}
      />
      <Card style={{ width: 300 }}>
        <Card.Meta title={name} description={email} />
        <div className='card-info'>
          <Space direction='vertical'>
            <Text>Phone: {phone}</Text>
            <Text>Website: {website}</Text>
            <Text>Company: {company.name}</Text>
          </Space>
          <div className='buttons-wrapper'>
            <Button
              type='dashed'
              icon={<UnorderedListOutlined />}
              onClick={redirectToPostPage}
            >
              Posts
            </Button>
            <Button type='dashed' icon={<BookOutlined />} onClick={showModal}>
              Albums
            </Button>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default UserCard;
