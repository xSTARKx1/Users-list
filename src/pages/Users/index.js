import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Row, Spin, Typography } from 'antd';

import { UserCard } from '../../components';
import {
  getUsersAsync,
  isUserListLoadingStatus,
  resetPosts,
  selectUsers,
} from '../../features/users/usersSlice';

import './index.scss';

const Users = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const users = useSelector(selectUsers);
  const loadingStatus = useSelector(isUserListLoadingStatus);

  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(resetPosts());
  }, [dispatch]);

  useEffect(() => {
    if (loadingStatus === 'error') {
      messageApi.open({
        type: 'error',
        content: 'Server error! Try again!',
      });
    }
  }, [loadingStatus, messageApi]);

  return (
    <div className='main-container'>
      {contextHolder}
      <Typography.Title className='page-title'>Users list</Typography.Title>
      {loadingStatus === 'loading' ? (
        <Spin size='large' className='spinner' />
      ) : (
        <Row gutter={[50, 32]}>
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default Users;
