import FriendsListItem from "./FriendsListItem";

export default () => {
  return (
    <div className="my-4">
      <span className="mx-[30px] text-xs font-semibold uppercase text-neutral-175">
        Online — 15
      </span>
      <ul className="mx-[20px] mt-3">
        <FriendsListItem />
        <FriendsListItem />
        <FriendsListItem />
        <FriendsListItem />
      </ul>
    </div>
  );
};
