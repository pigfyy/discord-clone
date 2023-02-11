import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useConversationsStore = create(
  devtools((set) => ({
    userConversationIds: [],
    userConversationsData: [],
    setUserConversationIds: (ids) => set(() => ({ userConversationIds: ids })),
    setUserConversationsData: (data) =>
      set(() => ({ userConversationsData: data })),
  }))
);

const useFriendsStore = create(
  devtools((set) => ({
    userFriendIds: [],
    currentPage: "Online",
    setUserFriendIds: (ids) => set(() => ({ userFriendIds: ids })),
    setCurrentPage: (page) => set(() => ({ currentPage: page })),
  }))
);

const useMenuStore = create(
  devtools((set) => ({
    menuOpen: false,
    menuXY: { x: 0, y: 0 },
    menuType: "",
    setMenuOpen: () => set(() => ({ menuOpen: true })),
    setMenuClosed: () => set(() => ({ menuOpen: false })),
    setMenuXY: (x, y) => set(() => ({ menuXY: { x, y } })),
    setMenuType: (type) => set(() => ({ menuType: type })),
  }))
);

const useAppStore = create(
  devtools((set) => ({
    currentSection: "friends",
    chatId: "",
    setCurrentSection: (section) => set(() => ({ currentSection: section })),
    setChatId: (id) => set(() => ({ chatId: id })),
  }))
);

export { useConversationsStore, useFriendsStore, useMenuStore, useAppStore };
