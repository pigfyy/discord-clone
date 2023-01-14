import { FaAt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export default () => {
  const [input, setInput] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    setInput("");
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      name: displayName,
      pfp: photoURL,
      text: input,
      timestamp: Timestamp.now(),
      uid,
    });
  };

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  messages;

  const msg = (messageInfo) => {
    const { username, pfp, time, message, isNewStack } = messageInfo;
    return (
      <>
        {isNewStack ? (
          <li className="mt-3 flex flex-col gap-1 first:mt-0">
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
          <li className="ml-[52px]">
            <p className="text-base font-normal text-neutral-150">{message}</p>
          </li>
        )}
      </>
    );
  };

  const t = messages.map((message) => {
    const dateString = (() => {
      const date = message.timestamp.toDate();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const today = new Date();
      let dateString;
      if (date.toDateString() === today.toDateString()) {
        dateString = "Today at " + date.toLocaleString("en-US", options);
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
        dateString = date.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      }
      return dateString;
    })();

    return msg({
      username: message.name,
      pfp: message.pfp,
      time: dateString,
      message: message.text,
      isNewStack: true,
    });
  });

  const [user] = useAuthState(auth);

  return (
    <div className="flex max-h-screen w-full flex-col">
      <header className="flex h-12 items-center border-b-[1px] border-neutral-950">
        <div className="flex gap-2 px-3">
          <div className="px-1">
            <IconContext.Provider
              value={{
                color: "hsl(213, 4%, 57%)",
                size: "1.5rem",
              }}
            >
              <FaAt />
            </IconContext.Provider>
          </div>
          <span className="text-base font-semibold text-neutral-100">
            All Chat
          </span>
        </div>
      </header>
      <main className="flex h-full w-full flex-col">
        {/* chat */}
        <div className="h-full overflow-y-scroll px-3">
          <ul className="flex flex-col py-3">{t}</ul>
        </div>
        {/* input box */}
        <form className="h-[68px] w-full px-3" onSubmit={handleSubmit}>
          <div className="flex h-[44px] items-center rounded-lg bg-neutral-500 px-4">
            <input
              type="text"
              className="w-full bg-neutral-500 text-base font-normal text-neutral-150 outline-none"
              placeholder="Message @CAMICSC"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </form>
      </main>
    </div>
  );
};
