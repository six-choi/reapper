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
    { place: "은평구", lat: 37.59189, lng: 126.91273 },
    { place: "은평구", lat: 37.59172, lng: 126.9136 },
    { place: "은평구", lat: 37.59381, lng: 126.91354 },
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

       //인포윈도우
  var infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        //html로 표시될 인포 윈도우의 내용
                        infowindow.setContent(pointArray[i].place);
                        //인포윈도우가 표시될 위치
                        infowindow.open(map, marker);
                    }
                })(marker, i));
                
                if (marker) {
                    marker.addListener('click', function() {
                        //중심 위치를 클릭된 마커의 위치로 변경
                        map.setCenter(this.getPosition());
                        //마커 클릭 시의 줌 변화
                        map.setZoom(16);
                    });
                }
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
