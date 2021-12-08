import "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getFirestore,
  GeoPoint,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
export const db = getFirestore();
export async function send() {
  const lat = mapMarker.getPosition().lat();
  const lng = mapMarker.getPosition().lng();

  console.log({ lat, lng });
  const docRef = await addDoc(collection(db, "repper"), {
    point: new GeoPoint(lat, lng),
  });
  console.log(docRef.id);
  // $.ajax({
  //   url: "http://localhost:9999/input",
  //   type: "POST",
  //   data: {
  //     lat: $("input[name='lat']").val(),
  //     lng: $("input[name='lng']").val(),
  //     content: $("input[name='content']").val(),
  //   },
  //   success: function (result) {},
  // });
}
//버튼 이벤트
document.querySelector("#register").addEventListener("click", function () {
  //alert("전송하시겠습니까?");
  send();
});
