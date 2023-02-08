import { useEffect, useState } from "react";

import { db, auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default (props) => {
  const [user] = useAuthState(auth);

  const [data, setData] = useState({ name: "", pfp: "" });

  const { groupName, groupPfp, isDm, participantIDs } = props.data;

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
          false ? "bg-neutral-600" : "group hover:bg-neutral-600"
        }`}
      >
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img src={data.pfp} alt="" />
        </div>
        <span
          className={`text-base font-medium leading-5 ${
            false
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
