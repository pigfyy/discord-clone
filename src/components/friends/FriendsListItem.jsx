export default () => {
  return (
    <li className="flex w-full rounded-[8px] px-[10px] hover:bg-neutral-500">
      <button className="group flex w-full items-start gap-3 border-t-[1px] border-[#4f545c7a] py-[12px] hover:border-[#00000000]">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img
            src="https://lh3.googleusercontent.com/a/AEdFTp6DwgMMcje4HCPCOOEAjcczJZSLXDGta5ScAjSE=s96-c"
            alt=""
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-base font-semibold leading-[17.6px] text-neutral-100">
            Pigfy
          </span>
          <span className="text-sm font-medium leading-5 text-neutral-175">
            Online
          </span>
        </div>
      </button>
    </li>
  );
};
