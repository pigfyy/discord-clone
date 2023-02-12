import FriendsListItem from "./ListItem";

import { useEffect, useState } from "react";
import { useFriendsStore } from "../../../store";

import { db, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, where, doc } from "firebase/firestore";

export default () => {
  const [user] = useAuthState(auth);

  const { userFriendIds, currentPage, setUserFriendIds } = useFriendsStore();
  const [shownFriends, setShownFriends] = useState([]);

  useEffect(() => {
    const queryRef = (() => {
      if (currentPage === "Online" || currentPage === "All")
        return where("relation", "==", "friend");
      if (currentPage === "Pending")
        return where("relation", "in", ["pending-in", "pending-out"]);
      if (currentPage === "Blocked") return where("relation", "==", "blocked");
    })();

    const q = query(collection(db, "users", user.uid, "friends"), queryRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const userFriendsIds = [];
      querySnapshot.forEach((doc) => {
        const pendingStr =
          doc.data().relation === "pending-in"
            ? "pending-in"
            : doc.data().relation === "pending-out"
            ? "pending-out"
            : "";
        userFriendsIds.push(`${doc.id}` + (pendingStr ? ` ${pendingStr}` : ""));
      });
      setUserFriendIds(userFriendsIds);
    });

    return unsub;
  }, [currentPage]);

  useEffect(() => {
    setShownFriends([]);
    const unsubFunctions = [];
    userFriendIds.forEach((friendId) => {
      const uid = friendId.split(" ")[0];
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        if (currentPage === "Online" && doc.data().status !== "Online") {
          setShownFriends((prev) => {
            return prev.filter((friend) => friend.id !== doc.id);
          });
        } else {
          setShownFriends((prev) => {
            return [
              ...prev.filter((friend) => friend.id !== doc.id),
              {
                displayName: doc.data().displayName,
                pfp: doc.data().photoURL,
                status: doc.data().status,
                id: friendId,
              },
            ];
          });
        }
      });
      unsubFunctions.push(unsub);
    });

    return () => {
      unsubFunctions.forEach((unsub) => unsub());
    };
  }, [userFriendIds]);

  const friends = shownFriends.map((friend) => {
    return <FriendsListItem key={crypto.randomUUID()} friendData={friend} />;
  });

  return (
    <>
      {shownFriends.length >= 1 ? (
        <div className="my-4">
          <span className="mx-[30px] text-xs font-semibold uppercase text-neutral-175">
            {currentPage}
          </span>
          <ul className="mx-[20px] mt-3">{friends}</ul>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-12">
          <div>
            <img
              src={(() => {
                if (currentPage === "Online")
                  return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/friendsListWumpus%2Fonline.png?alt=media&token=92c8a221-dfb4-4121-9cdd-0fa87f9d84ff";
                if (currentPage === "All")
                  return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/friendsListWumpus%2Fall.png?alt=media&token=caa74009-f629-4c3f-bd85-78a97eff0bad";
                if (currentPage === "Pending")
                  return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/friendsListWumpus%2Fpending.png?alt=media&token=7d7c408f-3e07-4ae9-93cf-5937c5d252bb";
                if (currentPage === "Blocked")
                  return "https://firebasestorage.googleapis.com/v0/b/discord-clone-cae29.appspot.com/o/friendsListWumpus%2Fblocked.png?alt=media&token=7d11cb8d-a569-473e-9ab3-4e25bfbd6d91";
              })()}
              alt=""
            />
          </div>
          <span className="text-base font-normal leading-5 text-neutral-200">
            {currentPage === "Online" && "Noone's around to play with Wumpus."}
            {currentPage === "All" &&
              "Wumpus is waiting on friends. You don't have to though!"}
            {currentPage === "Pending" &&
              "There are no pending friend requests. Here's Wumpus for now."}
            {currentPage === "Blocked" && "You can't unblock the Wumpus."}
          </span>
        </div>
      )}
    </>
  );
};
