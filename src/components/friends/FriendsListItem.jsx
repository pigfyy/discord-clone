import chatBox from "../../assets/imgs/chatBox.svg";
import threeDots from "../../assets/imgs/threeDots.svg";

import { useEffect, useState } from "react";

import { db } from "../../firebase";
import { onSnapshot, doc } from "firebase/firestore";

export default (props) => {
  const [data, setData] = useState({ name: "", pfp: "" });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", props.friendId), (doc) => {
      setData({ name: doc.data().displayName, pfp: doc.data().photoURL });
    });

    return unsub;
  }, []);

  return (
    <li className="flex w-full rounded-[8px] px-[10px] hover:bg-neutral-500">
      <button className="group flex w-full justify-between border-t-[1px] border-[#4f545c7a] py-[12px] hover:border-[#00000000]">
        <div className="flex gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={data.pfp} alt="" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-semibold leading-[17.6px] text-neutral-100">
              {data.name}
            </span>
            <span className="text-sm font-medium leading-5 text-neutral-175">
              Online
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800 group-hover:bg-neutral-900">
            <img src={chatBox} alt="" />
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800 group-hover:bg-neutral-900">
            <img src={threeDots} alt="" />
          </div>
        </div>
      </button>
    </li>
  );
};
