import { useState, useEffect } from "react";
import { useAppStore } from "../../store.js";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.js";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  Timestamp,
  setDoc,
} from "firebase/firestore";

export default () => {
  const [user] = useAuthState(auth);

  const [input, setInput] = useState("");
  const [receivingUserId, setReceivingUserId] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const { chatId } = useAppStore();

  useEffect(() => {
    setInput("");
    const unsub = onSnapshot(doc(db, "conversations", chatId), (doc) => {
      const data = doc.data();
      if (!data) {
        console.log("no conversation found from id: " + chatId);
        return;
      }
      if (data.isDm) {
        const receivingUser = data.participantIDs.filter(
          (id) => id !== user.uid
        )[0];
        setReceivingUserId(receivingUser);
        return;
      }
      setReceivingUserId("");
      setPlaceholder("Message " + data.groupName);
    });

    return unsub;
  }, [chatId]);

  useEffect(() => {
    if (!receivingUserId) return;
    const unsub = onSnapshot(doc(db, "users", receivingUserId), (doc) => {
      const data = doc.data();
      if (!data) {
        console.log("no user found from id: " + receivingUserId);
        return;
      }
      setPlaceholder("Message @" + data.displayName);
    });

    return unsub;
  }, [receivingUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    setInput("");
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      conversationId: chatId,
      name: displayName,
      pfp: photoURL,
      text: input,
      timestamp: Timestamp.now(),
      userId: uid,
    });
    await setDoc(
      doc(db, "conversations", chatId),
      {
        lastMsgTimestamp: Timestamp.now(),
      },
      { merge: true }
    );
  };

  return (
    <form className="mx-3 h-[68px]" onSubmit={handleSubmit}>
      <div className="flex h-[44px] items-center rounded-lg bg-neutral-500 px-4">
        <input
          type="text"
          className="w-full bg-neutral-500 text-base font-normal text-neutral-150 outline-none"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
};
