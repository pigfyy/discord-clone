import React, { useEffect, useState, useRef } from "react";
import { useAppStore } from "../../store.js";

import { db } from "../../firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export default () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useAppStore();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp"),
      where("conversationId", "==", chatId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [chatId]);

  const messageView = messages.map((message) => {
    const msg = (messageInfo) => {
      const { username, pfp, time, message, isNewStack } = messageInfo;

      return (
        <React.Fragment key={crypto.randomUUID()}>
          {isNewStack ? (
            <li className="mt-[17px] flex flex-col gap-1 first:mt-0 last:mb-1">
              <div className="flex">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                  <img src={pfp} alt="" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium leading-5 text-neutral-100">
                      {username}
                    </span>
                    <span className="text-xs font-medium leading-[22px] text-neutral-200">
                      {time}
                    </span>
                  </div>
                  <p className="text-base font-normal text-neutral-150">
                    {message}
                  </p>
                </div>
              </div>
            </li>
          ) : (
            <li className="ml-[52px] mt-[2px]">
              <p className="text-base font-normal text-neutral-150">
                {message}
              </p>
            </li>
          )}
        </React.Fragment>
      );
    };

    const dateString = (() => {
      const date = message.timestamp.toDate();
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const today = new Date();
      let dateString;
      if (date.toDateString() === today.toDateString()) {
        dateString =
          "Today at " +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
      } else if (
        date.toDateString() ===
        new Date(today.getTime() - 86400000).toDateString()
      ) {
        dateString =
          "Yesterday at " +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
      } else {
        dateString = date.toLocaleString("en-US", options);
      }
      return dateString;
    })();
    const isNewStack = (() => {
      const prevMessage = messages[messages.indexOf(message) - 1];
      if (prevMessage) {
        // check if previous message was from longer then an hour ago
        const prevDate = prevMessage.timestamp.toDate();
        const date = message.timestamp.toDate();
        if (date.getTime() - prevDate.getTime() > 300000) {
          return true;
        }
        if (prevMessage.userId === message.userId) {
          return false;
        }
      }
      return true;
    })();

    return msg({
      username: message.name,
      pfp: message.pfp,
      time: dateString,
      message: message.text,
      isNewStack: isNewStack,
      uid: message.uid,
    });
  });

  // to scroll to bottom upon new message
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      left: 0,
      behavior: "auto",
    });
  }, [messages]);

  return (
    <ul
      className="flex flex-1 flex-col overflow-y-scroll py-3 px-3"
      ref={chatContainerRef}
    >
      {messageView}
    </ul>
  );
};
