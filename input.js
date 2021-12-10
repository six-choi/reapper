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
    Date: firebase.firestore.Timestamp.fromDate(new Date("December 8, 2021")),
    Cleanness: 0,
    Waste: ["일반 쓰레기", "음식물 쓰레기", "혼합된 쓰레기", "재활용 쓰레기"],
    img: "img_url",
    Placecondition: [
      "쓰레기가 여기 저기 흩어져 있어요",
      "분리수거되지 않고 혼합 배출되어 있어요",
      "세척되지 않은 채로 배출되어 있어요",
      "쓰레기 배출 금지 안내가 있는 곳에 배출되어 있어요",
      "잘못된 봉투로 배출되어 있어요",
    ],
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
const condition = [];
document
  .querySelector(".js-btn-condition")
  .addEventListener("click", function () {
    if (1) condition.push(value);
  });
