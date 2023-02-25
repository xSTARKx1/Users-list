import { message, Modal, Space, Spin, Typography } from 'antd';
import { useSelector } from 'react-redux';
import {
  isAlbumLoadingStatus,
  selectAlbums,
} from '../../features/users/usersSlice';

import './index.scss';
import { useEffect } from 'react';

const AlbumModal = (props) => {
  const { isModalOpen, handleCancel, name } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const albums = useSelector(selectAlbums);
  const loadingStatus = useSelector(isAlbumLoadingStatus);

  useEffect(() => {
    if (loadingStatus === 'error') {
      messageApi.open({
        type: 'error',
        content: 'Server error! Try again!',
      });
    }
  }, [loadingStatus, messageApi]);

  return (
    <Modal
      title={`Albums of ${name}`}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      {contextHolder}
      {loadingStatus === 'loading' ? (
        <Spin size='large' className='spinner' />
      ) : (
        <Space direction='vertical'>
          {albums.map(({ id, title }, i) => {
            return (
              <Typography.Text key={id}>{`${i + 1}. ${title}`}</Typography.Text>
            );
          })}
        </Space>
      )}
    </Modal>
  );
};

export default AlbumModal;
