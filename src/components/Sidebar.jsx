import { IconContext } from "react-icons";
import { FaDiscord } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";

export default () => {
  const Icon = (props) => {
    return (
      <li className="group relative">
        <button className="sidebar-icon cursor-pointer overflow-hidden">
          <IconContext.Provider
            value={{
              color: "white",
              size: "28px",
            }}
          >
            {props.image}
          </IconContext.Provider>
        </button>
        <div className="absolute left-[72px] top-2/4 inline-flex w-40 translate-x-[-60%] translate-y-[-50%] scale-0 transition-all duration-75 group-hover:translate-x-0 group-hover:scale-100">
          <div className="flex flex-col rounded-md bg-neutral-950 py-2 px-2.5">
            <span className="text-xs font-bold text-neutral-100">
              {props.tooltip}
            </span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <aside className="h-screen w-[72px] bg-neutral-900">
      <ul className="my-3 flex flex-col items-center gap-y-2">
        <Icon image={<FaDiscord />} tooltip="Direct Messages" />
        <Icon image={<img src={s} alt="" />} tooltip="Dinosaur woooo" />
        <Icon image={<RiAddLine />} tooltip="Direct Messages" />
      </ul>
    </aside>
  );
};
