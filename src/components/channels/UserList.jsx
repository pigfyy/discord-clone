import React from "react";
import { useEffect } from "react";
import useStore from "../../store.js";

function UserList() {
  const {
    userConversationIds,
    setUserConversationIds,
    userConversationsData,
    setUserConversationsData,
  } = useStore();

  const users = userConversationsData.map((conversation) => {
    return (
      <li className="px-1.5" key={crypto.randomUUID()}>
        <button
          className={`flex w-full items-center gap-[14px] rounded-[4px] p-1.5 ${
            false ? "bg-neutral-600" : "group hover:bg-neutral-600"
          }`}
        >
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={conversation.groupPfp} alt="" />
          </div>
          <span
            className={`text-base font-medium leading-5 ${
              false
                ? "text-neutral-100"
                : "text-neutral-300 group-hover:text-neutral-150"
            }`}
          >
            {conversation.groupName}
          </span>
        </button>
      </li>
    );
  });

  return <ul className="flex flex-col gap-[2px] py-1.5">{users}</ul>;
}

export default UserList;
