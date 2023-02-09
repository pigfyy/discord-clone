import chatBox from "../../../assets/imgs/chatBox.svg";
import threeDots from "../../../assets/imgs/threeDots.svg";
import checkmark from "../../../assets/imgs/checkmark.svg";
import xmark from "../../../assets/imgs/xmark.svg";
import unblock from "../../../assets/imgs/unblock.svg";

import { useFriendsStore } from "../../../store";

export default (props) => {
  const { currentPage } = useFriendsStore();

  const list = (() => {
    if (currentPage === "Online" || currentPage === "All")
      return [chatBox, threeDots];
    if (currentPage === "Blocked") return [unblock];
    if (props.pending === "pending-in") return [checkmark, xmark];
    return [xmark];
  })();

  return (
    <div className="flex gap-2">
      {list.map((button) => {
        return (
          <div
            className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800 group-hover:bg-neutral-900"
            key={crypto.randomUUID()}
          >
            <img src={button} alt="" />
          </div>
        );
      })}
    </div>
  );
};
