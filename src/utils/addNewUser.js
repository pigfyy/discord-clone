import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export default async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  // creates an original tag for the user
  const existingTags = [];

  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("displayName", "==", user.displayName))
  );

  querySnapshot.forEach((doc) => {
    existingTags.push(doc.data().tag);
  });

  const tag = (() => {
    let number = Math.floor(Math.random() * 9999) + 1;
    while (existingTags.includes(number)) {
      number = Math.floor(Math.random() * 9999) + 1;
    }
    return number.toString().padStart(4, "0");
  })();

  // creates a new user in the database, along with a conversation in all chat
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    tag,
    status: "Online",
  });
  await setDoc(
    doc(db, "users", user.uid, "conversations", "72S9NvgsxEN15usrGE0x"),
    {
      conversationId: "72S9NvgsxEN15usrGE0x",
    }
  );
};
