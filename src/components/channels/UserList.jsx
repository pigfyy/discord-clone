import React from "react";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";

function UserList() {
  const [conversationIds, setConversationIds] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q1 = query(collection(db, `users/${user.uid}/conversations`));
    const conversationIds = [];
    const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        conversationIds.push(doc.id);
      });
    });

    // const q2 = query(collection(db, "conversations"));
    // const conversations = [];
    // const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     conversations.push({ ...doc.data(), id: doc.id });
    //   });
    // });

    setConversationIds(conversationIds);
    // setConversations(conversations);

    return () => {
      unsubscribe1();
      // unsubscribe2();
    };
  }, []);

  useEffect(() => {
    conversationIds.forEach((id) => {
      console.log(id);
    });
  }, [conversationIds]);

  const list = [
    {
      name: "All Chat",
      pfp: "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/groupChatIcons%2Fblue.png?alt=media&token=a8dd8c96-b4a6-438e-b5c4-3a931561c707",
      isSelected: true,
    },
    {
      name: "User 1",
      pfp: "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/characterPfps%2F1.png?alt=media&token=6f6ceb75-e952-41c9-9902-5592fdbbc321",
      isSelected: false,
    },
  ];

  const users = list.map((user) => {
    return (
      <li className="px-1.5" key={crypto.randomUUID()}>
        <button
          className={`flex w-full items-center gap-[14px] rounded-[4px] p-1.5 ${
            user.isSelected ? "bg-neutral-600" : "group hover:bg-neutral-600"
          }`}
        >
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={user.pfp} alt="" />
          </div>
          <span
            className={`text-base font-medium leading-5 ${
              user.isSelected
                ? "text-neutral-100"
                : "text-neutral-300 group-hover:text-neutral-150"
            }`}
          >
            {user.name}
          </span>
        </button>
      </li>
    );
  });

  return <ul className="flex flex-col gap-[2px] py-1.5">{users}</ul>;
}

export default UserList;
