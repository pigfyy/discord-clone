import chatBox from "../../../assets/imgs/chatBox.svg";
import ellipsis from "../../../assets/imgs/ellipsis.svg";
import checkmark from "../../../assets/imgs/checkmark.svg";
import xmark from "../../../assets/imgs/xmark.svg";
import unblock from "../../../assets/imgs/unblock.svg";

import {
  setAsFriends,
  setAsStrangers,
  removeRequest,
} from "../../../utils/friendRelationUtils";

import { useFriendsStore, useMenuStore } from "../../../store";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

export default (props) => {
  const [user] = useAuthState(auth);

  const { currentPage } = useFriendsStore();
  const { setMenuOpen, setMenuXY, setMenuType } = useMenuStore();

  const list = (() => {
    if (currentPage === "Online" || currentPage === "All")
      return [chatBox, ellipsis];
    if (currentPage === "Blocked") return [unblock];
    if (props.pending === "pending-in") return [checkmark, xmark];
    return [xmark];
  })();

  const handleClick = (button, e) => {
    console.log("clicked");
    const btn = (() => {
      const parts = button.split("/");
      return parts[parts.length - 1].split(".")[0];
    })();

    e.stopPropagation();

    const handleCheckmark = () => {
      setAsFriends(user.uid, props.id);
    };

    const handleXmark = () => {
      props.pending === "pending-in"
        ? removeRequest(user.uid, props.id)
        : setAsStrangers(user.uid, props.id);
    };

    const handleEllipsis = () => {
      setMenuOpen(true);
      setMenuXY(e.clientX, e.clientY);
      setMenuType("friendsMenuEllipsis");
    };

    if (btn === "checkmark") {
      handleCheckmark();
      return;
    }
    if (btn === "xmark") {
      handleXmark();
      return;
    }
    if (btn === "ellipsis") {
      handleEllipsis();
      return;
    }
  };

  return (
    <div className="flex gap-2">
      {list.map((button) => {
        return (
          <div
            className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800 active:!bg-neutral-490 group-hover:bg-neutral-900"
            onClick={(e) => {
              button !== chatBox && handleClick(button, e);
            }}
            key={crypto.randomUUID()}
            does-open-menu={button === ellipsis ? "true" : "false"}
          >
            <img src={button} alt="" />
          </div>
        );
      })}
    </div>
  );
};
