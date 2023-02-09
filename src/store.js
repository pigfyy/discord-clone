import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useConversationsStore = create(
  devtools((set, get) => ({
    userConversationIds: [],
    userConversationsData: [],
    setUserConversationIds: (ids) =>
      set((state) => ({ userConversationIds: ids })),
    setUserConversationsData: (data) =>
      set((state) => ({ userConversationsData: data })),
  }))
);

const useFriendsStore = create(
  devtools((set, get) => ({
    userFriendIds: [],
    currentPage: "Online",
    setUserFriendIds: (ids) => set((state) => ({ userFriendIds: ids })),
    setCurrentPage: (page) => set((state) => ({ currentPage: page })),
  }))
);

export { useConversationsStore, useFriendsStore };
