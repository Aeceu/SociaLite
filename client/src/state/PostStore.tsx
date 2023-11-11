import { create } from "zustand";
import axios from "../api/axios";

interface PostStoreProps {
  loading: boolean;
  createPostLoading: boolean;
  error: string;
  AllPosts: AllPostsProps[] | null;
  UserPosts: AllPostsProps[] | null;
  GetAllPosts: () => void;
  GetUserPosts: (userID: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setCreatePostLoading: (createPostLoading: boolean) => void;
  setError: (err: string) => void;
  HandleNewPost: ({ post, id }: NewPostProps) => Promise<HandleReturnProps>;
  HandleDeletePost: (postID: string) => Promise<HandleReturnProps>;
  HandleUpdatePost: ({ post, id }: NewPostProps) => Promise<HandleReturnProps>;
  HandlePostLikes: (id: string) => Promise<number>;
  HandleLikes: ({ postID, userID }: PostUserIDProps) => Promise<string>;
  HandleGetComments: (postID: string) => Promise<Array<commentsProps>>;
  HandleCreateComment: ({
    comment,
    postID,
    userID,
  }: CreateCommentsProps) => Promise<string>;
}

export const PostStore = create<PostStoreProps>((set, get) => ({
  AllPosts: null,
  UserPosts: null,
  loading: false,
  createPostLoading: false,
  error: "",
  GetAllPosts: async () => {
    try {
      get().setLoading(true);
      const res = await axios.get("/api/v1/posts");
      set({ AllPosts: res.data.posts });
    } catch (error) {
      console.log(error);
    } finally {
      get().setLoading(false);
    }
  },
  GetUserPosts: async (userID) => {
    try {
      get().setLoading(true);
      const res = await axios.get(`/api/v1/posts/${userID}`);
      set({ UserPosts: res.data.userPosts });
    } catch (error) {
      console.log(error);
    } finally {
      get().setLoading(false);
    }
  },
  setLoading(loading) {
    set({ loading: loading });
  },
  setCreatePostLoading(createPostLoading) {
    set({ createPostLoading: createPostLoading });
  },
  setError(err) {
    set({ error: err });
  },
  HandleNewPost: async ({ post, id }) => {
    try {
      get().setCreatePostLoading(true);
      const res = await axios.post(`/api/v1/post/${id}`, { post });
      return {
        data: res.data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response.data.error,
      };
    } finally {
      get().setCreatePostLoading(false);
    }
  },
  HandleUpdatePost: async ({ post, id }) => {
    try {
      get().setLoading(true);
      const res = await axios.patch(`/api/v1/post/${id}`, { post });
      return {
        data: res.data.message,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response.data.error,
      };
    } finally {
      get().setLoading(false);
    }
  },
  HandleDeletePost: async (postID) => {
    try {
      get().setLoading(true);
      const res = await axios.delete(`/api/v1/post/${postID}`);
      return {
        data: res.data.message,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response.data.error,
      };
    } finally {
      get().setLoading(false);
    }
  },
  HandlePostLikes: async (id) => {
    try {
      const res = await axios.get(`/api/v1/postlikes/${id}`);
      return res.data.likes;
    } catch (error) {
      console.log(error);
    }
  },
  HandleLikes: async ({ postID, userID }) => {
    try {
      const res = await axios.post(`/api/v1/handlelikes`, { postID, userID });

      return res.data.message;
    } catch (error) {
      console.log(error);
    }
  },
  HandleCreateComment: async ({ comment, postID, userID }) => {
    try {
      const res = await axios.post("/api/v1/createcomment", {
        comment,
        postID,
        userID,
      });
      return res.data.message;
    } catch (error: any) {
      console.log(error);
      return error.response.data.error;
    }
  },
  HandleGetComments: async (postID) => {
    try {
      const res = await axios.get(`/api/v1/postcomments/${postID}`);
      return res.data.comments;
    } catch (error) {
      console.log(error);
    }
  },
}));
