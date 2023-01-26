import React from "react";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Footer() {
  const logUserOut = () => {};

  const user = {
    displayName: "John Doe",
    photoURL: "https://i.imgur.com/0X8rX7A.jpg",
  };

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
                #0000
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
}

export default Footer;
