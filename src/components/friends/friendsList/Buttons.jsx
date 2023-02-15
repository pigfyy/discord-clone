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
  const { setMenuOpen, setMenuXY, setMenuType, setMenuAdditionalData } =
    useMenuStore();

  const list = (() => {
    if (currentPage === "Online" || currentPage === "All")
      return ["chatbox", "ellipsis"];
    if (currentPage === "Blocked") return ["unblock"];
    if (props.pending === "pending-in") return ["checkmark", "xmark"];
    return ["xmark"];
  })();

  const handleClick = (button, e) => {
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
      setMenuAdditionalData({ id1: user.uid, id2: props.id });
    };

    if (button === "checkmark") {
      handleCheckmark();
      return;
    }
    if (button === "xmark") {
      handleXmark();
      return;
    }
    if (button === "ellipsis") {
      handleEllipsis();
      return;
    }
  };

  return (
    <div className="flex gap-2">
      {list.map((button) => {
        const imgLink = (() => {
          if (button === "chatbox")
            return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/icons%2Fchatbox.svg?alt=media&token=c1db919d-5c8a-4450-b192-62f8b2d3341c";
          if (button === "ellipsis")
            return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/icons%2Fellipsis.svg?alt=media&token=aef3a29c-771f-4c97-8c37-62d908fc4edf";
          if (button === "checkmark")
            return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/icons%2Fcheckmark.svg?alt=media&token=ac60cea7-4820-4e5a-b12f-4fc9a190c22a";
          if (button === "xmark")
            return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/icons%2Fxmark.svg?alt=media&token=29bd15c3-2aed-49be-afcd-ad7fe66cff09";
          if (button === "unblock")
            return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/icons%2Funblock.svg?alt=media&token=9e9685aa-0423-4bc0-9120-c2ff0a97caf0";
        })();
        return (
          <div
            className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800 active:!bg-neutral-490 group-hover:bg-neutral-900"
            onClick={(e) => {
              button !== "chatbox" && handleClick(button, e);
            }}
            key={crypto.randomUUID()}
            dont-close-button={button === "ellipsis" ? "true" : "false"}
          >
            <img src={imgLink} alt="" />
          </div>
        );
      })}
    </div>
  );
};
