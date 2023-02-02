import React from "react";
import { useEffect } from "react";
import { db, auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";
import useStore from "../../store.js";
import UserListItem from "./UserListItem.jsx";

function UserList() {
  const [user] = useAuthState(auth);

  const {
    userConversationIds,
    setUserConversationIds,
    userConversationsData,
    setUserConversationsData,
  } = useStore();

  // grabs all users conversation ids
  useEffect(() => {
    const conversationIds = [];
    const q1 = query(collection(db, `users/${user.uid}/conversations`));
    const unsubscribe = onSnapshot(q1, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        conversationIds.push(doc.id.replace(/\s/g, ""));
      });
      setUserConversationIds([...conversationIds]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // grabs all users conversations data from ids
  useEffect(() => {
    const promises = userConversationIds.map((id) => {
      const getConversation = async () => {
        const docRef = doc(db, `conversations/${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return {
            ...docSnap.data(),
            participantIDs: docSnap
              .data()
              .participantIDs.map((id) => id.replace(/\s/g, "")),
          };
        } else {
          console.log(`No such conversation! Conversation ID: ${id}`);
          return null;
        }
      };
      return getConversation();
    });

    Promise.all(promises)
      .then((conversations) => {
        setUserConversationsData(conversations.filter((c) => c !== null));
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setUserConversationsData([]);
    };
  }, [userConversationIds]);

  const users = userConversationsData.map((conversation) => {
    return <UserListItem data={conversation} key={crypto.randomUUID()} />;
  });

  return <ul className="flex flex-col gap-[2px] py-1.5">{users}</ul>;
}

export default UserList;
