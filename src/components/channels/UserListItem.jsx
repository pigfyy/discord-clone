import { useEffect, useState } from "react";
import { useAppStore } from "../../store.js";

import { db, auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default (props) => {
  const [user] = useAuthState(auth);

  const { chatId, setCurrentSection, setChatId } = useAppStore();
  const [data, setData] = useState({ name: "", pfp: "" });

  const { groupName, groupPfp, isDm, participantIDs, id } = props.data;
  const isSelected = chatId === id;

  useEffect(() => {
    let unsub;
    if (!isDm) {
      setData({ name: groupName, pfp: groupPfp });
    } else {
      const receivingUser = participantIDs.filter((id) => id !== user.uid)[0];
      unsub = onSnapshot(doc(db, "users", receivingUser), (doc) => {
        setData({ name: doc.data().displayName, pfp: doc.data().photoURL });
      });
    }

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  return (
    <li className="px-1.5">
      <button
        className={`flex w-full items-center gap-3 rounded-[4px] p-1.5 ${
          isSelected ? "bg-neutral-600" : "group hover:bg-neutral-600"
        }`}
        onClick={() => {
          setCurrentSection("chat");
          setChatId(id);
        }}
      >
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img src={data.pfp} alt="" />
        </div>
        <span
          className={`text-base font-medium leading-5 ${
            isSelected
              ? "text-neutral-100"
              : "text-neutral-300 group-hover:text-neutral-150"
          }`}
        >
          {data.name}
        </span>
      </button>
    </li>
  );
};
