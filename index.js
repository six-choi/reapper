var webSocket;
var map; //모든 함수가 접근해야하므로 전역변수로!

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(37.59189, 126.91273),
    zoom: 13,
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  //마커 추가하기
  var pointArray = [
    { lat: 37.59189, lng: 126.91273 },
    { lat: 37.59172, lng: 126.9136 },
    { lat: 37.59381, lng: 126.91354 },
  ];
  createIcon(map, pointArray);

  //맵이 완료된 시점에 웹소켓 서버와 연결을 완료해 놓자!
  connectServer();
}
//아이콘 생성하기!
function createIcon(map, pointArray) {
  for (var i = 0; i < pointArray.length; i++) {
    //보여질 아이콘을 제이슨 객체로 정의
    var icon = {
      url: "./images/reddot.png", //url
      scaledSize: new google.maps.Size(15, 15), //scaled size
      origin: new google.maps.Point(0, 0), //origin
      anchor: new google.maps.Point(0, 0), //anchor
    };

    var marker = new google.maps.Marker({
      position: pointArray[i],
      icon: icon,
      map: map,
    });
    marker.setMap(map);
  }
}
//웹소켓 서버에 접속
function connectServer() {
  webSocket = new WebSocket("ws://127.0.0.1:7979");

  //이벤트 처리
  webSocket.onopen = function () {
    var status = document.getElementById("status");
    status.innerText = "접속성공";
  };
  webSocket.onclose = function () {
    var status = document.getElementById("status");
    status.innerText = "접속해제";
  };
  webSocket.onerror = function (err) {
    var status = document.getElementById("status");
    status.innerText = "에러발생" + err;
  };
  //서버에서 전송된 데이터 받기!
  webSocket.onmessage = function (e) {
    //console.log(e.data); //서버의 json 데이터가 날아와야 한다.
    var json = JSON.parse(e.data); //String에서 json으로 파싱

    createIcon(
      [{ lat: parseFloat(json.lat), lng: parseFloat(json.lng) }],
      ["./images/reddot.png"],
      [json.content]
    );
  };
}
