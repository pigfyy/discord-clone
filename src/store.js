import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set, get) => ({
    userConversationIds: [],
    userConversationsData: [],
    setUserConversationIds: (ids) =>
      set((state) => ({ userConversationIds: ids })),
    setUserConversationsData: (data) =>
      set((state) => ({ userConversationsData: data })),
  }))
);

export default useStore;
