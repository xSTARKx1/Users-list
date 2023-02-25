import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserAlbums, fetchUserPosts, fetchUsers } from './usersAPI';

const initialState = {
  users: [],
  userListLoadingStatus: 'idle',
  albums: [],
  albumLoadingStatus: 'idle',
  posts: [],
  postsLoadingStatus: 'idle',
};

export const getUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers();
  return response.data;
});

export const getAlbums = createAsyncThunk('users/fetchAlbums', async (id) => {
  const response = await fetchUserAlbums(id);
  return response.data;
});

export const getPosts = createAsyncThunk('users/fetchPosts', async (id) => {
  const response = await fetchUserPosts(id);
  return response.data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetAlbums(state) {
      state.albums = [];
    },
    resetPosts(state) {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.userListLoadingStatus = 'loading';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.userListLoadingStatus = 'idle';
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.userListLoadingStatus = 'error';
      })
      .addCase(getAlbums.pending, (state) => {
        state.albumLoadingStatus = 'loading';
      })
      .addCase(getAlbums.rejected, (state) => {
        state.albumLoadingStatus = 'error';
      })
      .addCase(getAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.albumLoadingStatus = 'idle';
      })
      .addCase(getPosts.pending, (state) => {
        state.postsLoadingStatus = 'loading';
      })
      .addCase(getPosts.rejected, (state) => {
        state.postsLoadingStatus = 'error';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsLoadingStatus = 'idle';
        state.posts = action.payload;
      });
  },
});

export const { resetAlbums, resetPosts } = usersSlice.actions;

export const selectUsers = (state) => state.users.users;
export const isUserListLoadingStatus = (state) =>
  state.users.userListLoadingStatus;
export const selectAlbums = (state) => state.users.albums;
export const isAlbumLoadingStatus = (state) => state.users.albumLoadingStatus;
export const selectPosts = (state) => state.users.posts;
export const isPostsLoadingStatus = (state) => state.users.postsLoadingStatus;

export default usersSlice.reducer;
