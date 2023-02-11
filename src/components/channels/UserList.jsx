import UserListItem from "./UserListItem.jsx";

import { useEffect } from "react";
import { useConversationsStore } from "../../store.js";

import { db, auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, doc, where } from "firebase/firestore";

export default () => {
  const [user] = useAuthState(auth);

  const {
    userConversationIds,
    setUserConversationIds,
    userConversationsData,
    setUserConversationsData,
  } = useConversationsStore();

  // grabs all users conversation ids
  useEffect(() => {
    const conversationIds = [];
    const q1 = query(collection(db, `users/${user.uid}/conversations`));
    const unsubscribe = onSnapshot(q1, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        conversationIds.push(doc.id.replace(/\s/g, ""));
      });
      setUserConversationIds(conversationIds);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // grabs all users conversations data from ids
  useEffect(() => {
    const q = query(
      collection(db, "conversations"),
      where("participantIDs", "array-contains-any", [user.uid, "everyone"])
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const conversationsData = [];
      querySnapshot.forEach((doc) => {
        conversationsData.push({ ...doc.data(), id: doc.id });
      });
      setUserConversationsData(conversationsData);
    });

    return () => {
      unsub();
    };
  }, [userConversationIds]);

  const users = userConversationsData.map((conversation) => {
    return <UserListItem data={conversation} key={crypto.randomUUID()} />;
  });

  return <ul className="flex flex-col gap-[2px] py-1.5">{users}</ul>;
};
