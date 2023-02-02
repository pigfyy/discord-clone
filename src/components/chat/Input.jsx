import React from "react";
import { useState } from "react";
import { auth, db } from "../../firebase.js";
import { addDoc, collection, Timestamp } from "firebase/firestore";

function Input() {
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
      uid: crypto.randomUUID(),
    });
  };

  return (
    <form className="mx-3 h-[68px]" onSubmit={handleSubmit}>
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
  );
}

export default Input;
