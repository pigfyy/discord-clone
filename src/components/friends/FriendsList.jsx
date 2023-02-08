import FriendsListItem from "./FriendsListItem";

import { useEffect } from "react";
import { useFriendsStore } from "../../store";

import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, onSnapshot, doc } from "firebase/firestore";

export default () => {
  const { userFriendIds, setUserFriendIds } = useFriendsStore();

  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(db, "users", user.uid, "friends"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const userFriendsIds = [];
      querySnapshot.forEach((doc) => {
        userFriendsIds.push(doc.id);
      });
      setUserFriendIds(userFriendsIds);
    });

    return unsub;
  }, []);

  const friends = userFriendIds.map((friendId) => {
    return <FriendsListItem key={friendId} friendId={friendId} />;
  });

  return <ul className="mx-[20px] mt-3">{friends}</ul>;
};
