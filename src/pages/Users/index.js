import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, message, Spin, Typography } from 'antd';

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
        <List
          grid={{
            gutter: [16, 16],
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={users}
          renderItem={(user) => (
            <List.Item>
              <UserCard user={user} key={user.id} />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Users;
