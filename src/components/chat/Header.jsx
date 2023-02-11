import { useState, useEffect } from "react";
import { useAppStore } from "../../store.js";

import atIcon from "../../assets/imgs/atIcon.svg";
import conversationIcon from "../../assets/imgs/conversationIcon.svg";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.js";
import { doc, onSnapshot } from "firebase/firestore";

export default () => {
  const [user] = useAuthState(auth);

  const [receivingUserId, setReceivingUserId] = useState("");
  const [data, setData] = useState({ type: "", name: "" });
  const { chatId } = useAppStore();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "conversations", chatId), (doc) => {
      const data = doc.data();
      if (!data) {
        console.log("no conversation found from id: " + chatId);
        return;
      }
      setData((prev) => ({
        type: data.isDm ? "dm" : "group",
        name: !data.isDm ? data.groupName : prev.name,
      }));
      if (data.isDm) {
        const receivingUser = data.participantIDs.filter(
          (id) => id !== user.uid
        )[0];
        setReceivingUserId(receivingUser);
        return;
      }
      setReceivingUserId("");
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
      setData((prev) => ({
        type: prev.type,
        name: data.displayName,
      }));
    });

    return unsub;
  }, [receivingUserId]);

  return (
    <header className="flex h-12 min-h-[3rem] items-center shadow-inset">
      <div className="flex gap-[5px] px-3">
        <div className="px-1">
          <img src={data.type === "dm" ? atIcon : conversationIcon} alt="" />
        </div>
        <span className="text-base font-semibold text-neutral-100">
          {data.name}
        </span>
      </div>
    </header>
  );
};
