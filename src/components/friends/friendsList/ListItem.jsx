import Buttons from "./Buttons";

import fetchConversationId from "../../../utils/fetchConversationId";

import { useFriendsStore, useAppStore } from "../../../store";

import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default (props) => {
  const [user] = useAuthState(auth);

  const data = props.friendData;

  const { currentPage } = useFriendsStore();
  const { setCurrentSection, setChatId } = useAppStore();

  const id = data.id.split(" ")[0];
  const pendingStatus = data.id.split(" ")[1];

  const handleClick = async () => {
    if (currentPage === "Online" || currentPage === "All") {
      const id = await fetchConversationId(user.uid, data.id);
      if (id === null) return;
      setChatId(id);
      setCurrentSection("chat");
    }
  };

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
              {data.displayName}
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
        <Buttons pending={pendingStatus} id={id} key={data.id} />
      </button>
    </li>
  );
};
