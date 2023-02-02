import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [uid, displayName, photoURL] = [
    user.uid,
    user.displayName,
    user.photoURL,
  ];

  await setDoc(doc(db, "users", uid), {
    uid,
    displayName,
    photoURL,
  });
  await setDoc(doc(db, "users", uid, "conversations", "IDYaemPvaj0csOlukJGP"), {
    conversationId: "IDYaemPvaj0csOlukJGP",
  });
};
