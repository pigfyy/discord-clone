import { useEffect } from "react";

import { useMenuStore } from "../../store";

export default (props) => {
  const { menuOpen, setMenuClosed } = useMenuStore();

  useEffect(() => {
    const handleClick = (e) => {
      const isOpenMenuBtn =
        e.target.getAttribute("does-open-menu") === "true" ||
        (e.target.parentElement &&
          e.target.parentElement.getAttribute("does-open-menu") === "true");
      if (!isOpenMenuBtn) {
        setMenuClosed();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [menuOpen]);

  return (
    <div
      className="absolute max-h-[905px] min-w-[188px] max-w-xs rounded-[4px] bg-neutral-950 px-2 py-[6px]"
      style={{ left: `${props.x - 188}px`, top: `${props.y}px` }}
    >
      <button className="group my-0.5 w-full rounded-sm px-2 py-1.5 text-left hover:bg-red-600">
        <span className="text-sm font-medium leading-[18px] text-red-500 group-hover:text-neutral-100">
          Remove Friend
        </span>
      </button>
    </div>
  );
};
