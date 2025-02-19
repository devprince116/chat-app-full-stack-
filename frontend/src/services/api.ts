import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; user: User }>,
      { email: string; password: string }>({
        query: (body) => ({
          url: `/auth/login`,
          method: "POST",
          body,
        }),
      }),

    register: builder.mutation<
      ApiResponse<User>,
      Omit<User, "_id" | "active" | "role"> & { confirmPassword: string }
    >({
      query: (body) => ({
        url: `/auth/signup`,
        method: "POST",
        body,
      }),
    }),

    // sendPrivateMessage: builder.mutation<
    //   ApiResponse<{ id: string; content: string }>,
    //   { receiverId: string; message: string }
    // >({
    //   query: (body) => ({
    //     url: `/chat`,
    //     method: "POST",
    //     body,
    //   }),
    // }),

    sendGroupMessage: builder.mutation<
      ApiResponse<{
        id: string;
        senderId: string;
        content: string;
        groupId: string;
        timestamp: string;
        members: { id: string; email: string; role: "user" | "admin" }[];
      }>,
      { groupId: string; message: string }
    >({
      query: (body) => ({
        url: `/chat/grp-chat`,
        method: "POST",
        body,
      }),
    }),


    // getPrivateMessages: builder.query<
    //   ApiResponse<{ messages: { id: string; senderId: string; content: string }[] }>,
    //   { receiverId: string }
    // >({
    //   query: ({ receiverId }) => `/chat/${receiverId}`,
    // }),

    getGroupMessages: builder.query<
      ApiResponse<{ messages: { id: string; senderId: string; content: string }[] }>,
      { groupId: string }
    >({
      query: ({ groupId }) => `/chat/${groupId}`,
    }),

    getAllUser: builder.query<ApiResponse<{ users: User[] }>, void>({
      query: () => `/admin`, // Calls the getAllUsers API
    }),

    getAllGroups: builder.query<
      ApiResponse<{
        groups: {
          id: string;
          name: string;
          isPublic: boolean;
          members: { id: string; email: string; role: string }[];
          messages: { id: string; content: string; senderId: string }[];
        }[]
      }>,
      void
    >({
      query: () => `/group/all`,
    }),

    createGroup: builder.mutation<
      ApiResponse<{ group: { id: string; name: string; isPublic: boolean; members: { id: string; email: string; role: string }[] } }>,
      { name: string; isPublic: boolean }
    >({
      query: (body) => ({
        url: `/group`,
        method: "POST",
        body,
      }),
    }),

    joinPublicGroup: builder.mutation<
      ApiResponse<{
        id: string;
        name: string;
        isPublic: boolean;
        members: { id: string; email: string; role: "user" | "admin" }[];
      }>,
      { groupId: string }
    >({
      query: ({ groupId }) => ({
        url: `/group/${groupId}`,
        method: "POST",
      }),
    }),


    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUserQuery,
  useSendGroupMessageMutation,
  useGetGroupMessagesQuery,
  useGetAllGroupsQuery,
  useJoinPublicGroupMutation,
  useLogoutMutation,
  useCreateGroupMutation
} = api;
