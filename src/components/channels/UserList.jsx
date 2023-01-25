import React from "react";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";
import useStore from "../../store.js";

function UserList() {
  //
  // const [conversationIds, setConversationIds] = useState([]);
  const [conversations, setConversations] = useState([]);
  //
  const [user] = useAuthState(auth);

  const {
    userConversationIds,
    setUserConversationIds,
    userConversationsData,
    setUserConversationsData,
  } = useStore();

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

  useEffect(() => {
    const promises = userConversationIds.map((id) => {
      const getConversation = async () => {
        const docRef = doc(db, `conversations/${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
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
      setConversations([]);
    };
  }, [userConversationIds]);

  const users = userConversationsData.map((conversation) => {
    return (
      <li className="px-1.5" key={crypto.randomUUID()}>
        <button
          className={`flex w-full items-center gap-[14px] rounded-[4px] p-1.5 ${
            false ? "bg-neutral-600" : "group hover:bg-neutral-600"
          }`}
        >
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={conversation.groupPfp} alt="" />
          </div>
          <span
            className={`text-base font-medium leading-5 ${
              false
                ? "text-neutral-100"
                : "text-neutral-300 group-hover:text-neutral-150"
            }`}
          >
            {conversation.groupName}
          </span>
        </button>
      </li>
    );
  });

  return <ul className="flex flex-col gap-[2px] py-1.5">{users}</ul>;
}

export default UserList;
