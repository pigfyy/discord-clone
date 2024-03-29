import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";

import { useEffect, useState } from "react";

import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onSnapshot, doc } from "firebase/firestore";

export default () => {
  const [user] = useAuthState(auth);

  const [tag, setTag] = useState("");

  const logUserOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setTag(doc.data().tag);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <section className="flex flex-col gap-[2px] py-1.5">
      <div className="flex items-center justify-between px-1.5">
        <button className="flex w-full basis-3/4 items-center gap-[14px] rounded-[4px] hover:bg-neutral-500">
          <div className="flex gap-2 rounded-[4px] p-1">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img src={user.photoURL} alt="" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[14px] font-semibold leading-[18px] text-neutral-100">
                {user.displayName}
              </span>
              <span className="text-xs font-normal leading-[13px] text-neutral-175">
                {`#${tag}`}
              </span>
            </div>
          </div>
        </button>
        <button onClick={logUserOut}>
          <IconContext.Provider
            value={{
              color: "red",
              size: "20px",
            }}
          >
            <RiLogoutBoxRLine />
          </IconContext.Provider>
        </button>
      </div>
    </section>
  );
};
