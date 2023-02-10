import { useState } from "react";

import { setAsPending } from "../../../utils/friendRelationUtils";

import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";

export default () => {
  const [user] = useAuthState(auth);

  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.length) return;
    const friendsName = input.split("#")[0];
    const friendsTag = input.split("#")[1];
    setInput("");

    // gets the user id from name and tag
    const q = query(
      collection(db, "users"),
      where("displayName", "==", friendsName),
      where("tag", "==", friendsTag)
    );
    let userId = "";
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    // if the user id is not found, return
    if (!userId) return;

    // set the relation to pending for both users
    setAsPending(user.uid, userId);
  };

  return (
    <form
      className="group flex w-full rounded-[9px] border-[1px] border-[#00000000] focus-within:border-primary-300"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter a Username#0000"
        className="h-12 w-full rounded-l-lg bg-neutral-900 px-3 text-base font-medium leading-[21px] tracking-[0.64px] text-neutral-150 placeholder-neutral-475 placeholder-opacity-100 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={37}
      />
      <div className="grid flex-shrink-0 place-items-center rounded-r-lg bg-neutral-900 px-4">
        <button
          className={`h-8 rounded-[3px] bg-primary-400 py-[2px] pl-4 pr-3 text-sm font-medium leading-4 text-neutral-100 ${
            !input.length && "cursor-not-allowed opacity-50"
          }`}
          onClick={handleSubmit}
        >
          Send Friend Request
        </button>
      </div>
    </form>
  );
};
