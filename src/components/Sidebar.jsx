import { IconContext } from "react-icons";
import { FaDiscord } from "react-icons/fa";

export default () => {
  const Icon = (props) => {
    return (
      <li className="group relative">
        <button className="sidebar-icon cursor-pointer">
          <IconContext.Provider
            value={{
              color: "white",
              size: "28px",
            }}
          >
            {props.image}
          </IconContext.Provider>
        </button>
        <div className="absolute left-20 top-[50%] flex translate-y-[-50%] translate-x-[-60%] scale-0 rounded-md bg-neutral-950 py-2 px-2.5 transition-all duration-75 group-hover:translate-x-0 group-hover:scale-100">
          <span className="text-xs font-bold text-neutral-100">
            {props.tooltip}
          </span>
        </div>
      </li>
    );
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-neutral-700">
      <aside className="h-screen w-[72px] bg-neutral-900">
        <ul className="my-3 flex flex-col items-center gap-y-2">
          <Icon image={<FaDiscord />} tooltip="Discord" />
        </ul>
      </aside>
    </div>
  );
};
