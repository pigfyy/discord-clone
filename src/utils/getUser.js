import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default async (receivingUser) => {
  const docRef = doc(db, "users", receivingUser);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.photoURL;
  } else {
    console.log("No such document!");
  }
};
