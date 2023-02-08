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
    setUserFriendIds: (ids) => set((state) => ({ userFriendIds: ids })),
  }))
);

export { useConversationsStore, useFriendsStore };
