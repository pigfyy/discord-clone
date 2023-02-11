import Buttons from "./Buttons";

import fetchConversationId from "../../../utils/fetchConversationId";

import { useEffect, useState } from "react";
import { useFriendsStore, useAppStore } from "../../../store";

import { db, auth } from "../../../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default (props) => {
  const [user] = useAuthState(auth);

  const [data, setData] = useState({ name: "", pfp: "", status: "" });
  const [isShow, setIsShow] = useState(true);
  const { currentPage } = useFriendsStore();
  const { setCurrentSection, setChatId } = useAppStore();

  const friendId = props.friendId.split(" ")[0];
  const pendingStatus = props.friendId.split(" ")[1];

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", friendId), (doc) => {
      currentPage === "Online" && doc.data().status !== "Online"
        ? setIsShow(false)
        : setIsShow(true);
      setData({
        name: doc.data().displayName,
        pfp: doc.data().photoURL,
        status: doc.data().status,
        id: doc.id,
      });
    });

    return unsub;
  }, [currentPage]);

  const handleClick = async () => {
    if (currentPage === "Online" || currentPage === "All") {
      const id = await fetchConversationId(user.uid, data.id);
      if (id === null) return;
      setChatId(id);
      setCurrentSection("chat");
    }
  };

  if (!isShow) return null;

  return (
    <li
      className="flex w-full rounded-[8px] px-[10px] hover:bg-neutral-500"
      onClick={handleClick}
    >
      <button className="group flex w-full justify-between border-t-[1px] border-[#4f545c7a] py-[12px] hover:border-[#00000000]">
        <div className="flex gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={data.pfp} alt="" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-semibold leading-[17.6px] text-neutral-100">
              {data.name}
            </span>
            <span className="text-[13px] font-medium leading-5 text-neutral-175">
              {(() => {
                if (currentPage === "Online" || currentPage === "All")
                  return data.status;
                if (currentPage === "Pending")
                  return pendingStatus === "pending-in"
                    ? "Incoming Friend Request"
                    : "Outgoing Friend Request";
                if (currentPage === "Blocked") return "Blocked";
              })()}
            </span>
          </div>
        </div>
        <Buttons pending={pendingStatus} id={data.id} key={data.id} />
      </button>
    </li>
  );
};
