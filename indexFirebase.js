import "./firebaseConfig.js";
import {
  collection,
  getDocs,
  getFirestore,
  GeoPoint,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
export const db = getFirestore();

const querySnapshot = await getDocs(collection(db, "repper"));
const allPoints = querySnapshot.docs.map((snap) => {
  const { latitude, longitude } = snap.data().point;
  return { lat: latitude, lng: longitude };
});
console.log(allPoints);
createIcon(map, allPoints);
