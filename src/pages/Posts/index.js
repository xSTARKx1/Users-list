import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, message, Row, Spin, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import {
  getPosts,
  isPostsLoadingStatus,
  selectPosts,
} from '../../features/users/usersSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const posts = useSelector(selectPosts);
  const { userId } = useParams();
  const loadingStatus = useSelector(isPostsLoadingStatus);

  useEffect(() => {
    dispatch(getPosts(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (loadingStatus === 'error') {
      messageApi.open({
        type: 'error',
        content: 'Server error! Try again!',
      });
    }
  }, [loadingStatus, messageApi]);

  const redirectToUsersPage = () => {
    return navigate('/users');
  };

  return (
    <div className='main-container'>
      {contextHolder}
      <div>
        <Button
          type='dashed'
          onClick={redirectToUsersPage}
          icon={<ArrowLeftOutlined />}
          className='back-button'
        >
          Back to Users List
        </Button>
        <Typography.Title className='page-title'>Posts</Typography.Title>
      </div>
      {loadingStatus === 'loading' ? (
        <Spin size='large' className='spinner' />
      ) : (
        <Row gutter={[16, 16]}>
          {posts.map(({ id, title, body }) => {
            return (
              <Col span={12} key={id}>
                <Card title={title} bordered={false}>
                  {body}
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default Posts;
