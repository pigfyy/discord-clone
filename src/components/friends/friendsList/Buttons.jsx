import chatBox from "../../../assets/imgs/chatBox.svg";
import threeDots from "../../../assets/imgs/threeDots.svg";
import checkmark from "../../../assets/imgs/checkmark.svg";
import xmark from "../../../assets/imgs/xmark.svg";
import unblock from "../../../assets/imgs/unblock.svg";

import {
  setAsFriends,
  setAsStrangers,
  removeRequest,
} from "../../../utils/friendRelationUtils";

import { useFriendsStore } from "../../../store";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

export default (props) => {
  const [user] = useAuthState(auth);

  const { currentPage } = useFriendsStore();

  const list = (() => {
    if (currentPage === "Online" || currentPage === "All")
      return [chatBox, threeDots];
    if (currentPage === "Blocked") return [unblock];
    if (props.pending === "pending-in") return [checkmark, xmark];
    return [xmark];
  })();

  const handleClick = (button) => {
    const extractEnd = (str) => {
      const parts = str.split("/");
      return parts[parts.length - 1].split(".")[0];
    };
    const btn = extractEnd(button);

    if (btn === "checkmark") {
      setAsFriends(user.uid, props.id);
      return;
    } else if (btn === "xmark") {
      props.pending === "pending-in"
        ? removeRequest(user.uid, props.id)
        : setAsStrangers(user.uid, props.id);
      return;
    }
  };

  return (
    <div className="flex gap-2">
      {list.map((button) => {
        return (
          <div
            className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800 group-hover:bg-neutral-900"
            onClick={() => {
              handleClick(button);
            }}
            key={crypto.randomUUID()}
          >
            <img src={button} alt="" />
          </div>
        );
      })}
    </div>
  );
};
