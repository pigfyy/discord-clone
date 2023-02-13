import { useState } from "react";

import { setAsPending } from "../../../utils/friendRelationUtils";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";

export default () => {
  const [user] = useAuthState(auth);

  const [input, setInput] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    if (inputStatus !== "") setInputStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.length) return;
    const friendsName = input.split("#")[0];
    const friendsTag = input.split("#")[1];

    if (!friendsTag) {
      setInputStatus(
        `We need ${input}'s four digit tag so we know which one they are.`
      );
      return;
    }

    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (
      docSnap.data().displayName === friendsName &&
      docSnap.data().tag === friendsTag
    ) {
      setInputStatus("You can't add yourself as a friend.");
      return;
    }

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

    if (!userId) {
      setInputStatus(
        "Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct."
      );
      return;
    }

    // set the relation to pending for both users
    setAsPending(user.uid, userId);
    setInput("");
    setInputStatus(
      `Success! Your friend request to ${friendsName}#${friendsTag} was sent.`
    );
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div
        className={`group flex w-full rounded-[9px] border-[1px] border-[#00000000] ${
          inputStatus === ""
            ? "focus-within:border-primary-300"
            : inputStatus.split(" ")[0] === "Success!"
            ? "focus-within:border-green-300"
            : "focus-within:border-red-500"
        }`}
      >
        <input
          type="text"
          placeholder="Enter a Username#0000"
          className="h-12 w-full rounded-l-lg bg-neutral-900 px-3 text-base font-medium leading-[21px] tracking-[0.64px] text-neutral-150 placeholder-neutral-475 placeholder-opacity-100 outline-none"
          value={input}
          onChange={(e) => handleChange(e)}
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
      </div>
      {(() => {
        const className = `text-sm font-normal leading-5 ${
          inputStatus.split(" ")[0] === "Success!"
            ? "text-green-200"
            : "text-red-200"
        }`;

        if (!inputStatus.startsWith("Success!")) {
          return <span className={className}>{inputStatus}</span>;
        }

        return (
          <span className={className}>
            Success! Your friend request to{" "}
            <span className="font-semibold">{inputStatus.split(" ")[5]}</span>{" "}
            was sent.
          </span>
        );
      })()}
    </form>
  );
};
