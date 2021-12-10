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
    {
    "place": '<div class="wrap"><div class="text-box"><h4><b>서울특별시 은평구 은평로21길 12</b></h4><br><div class="img-box"><img src="images/eunpungro21gil.png" style="width: 100%"></div><hr><b>제보시점</b><p>2021년 11월 3일 16시 05분</p><hr><b>청결도</b><p class="cleanliness">★★★★★</p><hr><p class="waste">일반 쓰레기</p><p class="waste">혼합된 쓰레기</p></div>',
    "lat": 37.60171,
    "lng": 126.93312,
    "cleanliness": 5
  },
  {
    "place": '<div class="wrap"><div class="text-box"><h4><b>서울특별시 은평구 은평로21길 16</b></h4><br><div class="img-box"><img src="images/21gil16.png" style="width: 100%"></div><hr><b>제보시점</b><p>2021년 11월 3일 16시 05분</p><hr><b>청결도</b><p class="cleanliness">★★★</p><hr><p class="waste">일반 쓰레기</p><p class="waste">혼합된 쓰레기</p></div>',
    "lat": 37.60179,
    "lng": 126.93298,
    "cleanliness": 3
  },
  {
    "place": "은평로21길 4 31-14",
    "lat": 37.60197,
    "lng": 126.931,
    "cleanliness": 2
  },
  {
    "place": "은평구 21길 44",
    "lat": 37.60296,
    "lng": 126.92953,
    "cleanliness": 2
  },
  {
    "place": "은평세무소",
    "lat": 37.60188,
    "lng": 126.92684,
    "cleanliness": 2
  },
  {
    "place": "은평로12길 6 맞은편",
    "lat": 37.60047,
    "lng": 126.92522,
    "cleanliness": 2
  },
  {
    "place": "은평로12길 8-14",
    "lat": 37.60013,
    "lng": 126.92445,
    "cleanliness": 2
  },
  {
    "place": "은평구 12길 7-11",
    "lat": 37.6,
    "lng": 126.92399,
    "cleanliness": 2
  },
  {
    "place": "은평로 10길 11",
    "lat": 37.5997,
    "lng": 126.92339,
    "cleanliness": 2
  },
  {
    "place": "응암로 328",
    "lat": 37.60015,
    "lng": 126.92262,
    "cleanliness": 2
  },
  {
    "place": '<div class="wrap"><div class="text-box"><h4><b>서울특별시 은평구 응암로 21가길 5</b></h4><br><div class="img-box"><img src="images/Eungam-ro 21gagill5.png" style="width: 100%"></div><hr><b>제보시점</b><p>2021년 11월 3일 17시 59분</p><hr><b>청결도</b><p class="cleanliness">★★</p><hr><p class="waste">일반 쓰레기</p><p class="waste">혼합된 쓰레기</p></div>',
    "lat": 37.59436,
    "lng": 126.91654,
    "cleanliness": 2
  },
  {
    "place": "증산로401-16",
    "lat": 37.59241,
    "lng": 126.91296,
    "cleanliness": 1
  },
  {
    "place": "증산로395",
    "lat": 37.59189,
    "lng": 126.91273,
    "cleanliness": 1
  },
  {
    "place": "증산로397",
    "lat": 37.59172,
    "lng": 126.9136,
    "cleanliness": 1
  },
  {
    "place": "가좌로276-18",
    "lat": 37.59381,
    "lng": 126.91354,
    "cleanliness": 5
  },
  {
    "place": "가좌로 276-11",
    "lat": 37.59386,
    "lng": 126.91326,
    "cleanliness": 7
  },
  {
    "place": "증산로19길 7-7",
    "lat": 37.5942,
    "lng": 126.91356,
    "cleanliness": 1
  },
  {
    "place": "증산로19길 7-10",
    "lat": 37.59404,
    "lng": 126.91348,
    "cleanliness": 3
  },
  {
    "place": "증산로19길 7-4 맞은편",
    "lat": 37.59447,
    "lng": 126.91355,
    "cleanliness": 3
  },
  {
    "place": "증산로19길 9",
    "lat": 37.59475,
    "lng": 126.91357,
    "cleanliness": 3
  },
  {
    "place": "증산로 19길 9-1",
    "lat": 37.59477,
    "lng": 126.91332,
    "cleanliness": 3
  },
  {
    "place": "증산로19길 14-2",
    "lat": 37.59505,
    "lng": 126.913,
    "cleanliness": 8
  },
  {
    "place": "증산로19길 14-3",
    "lat": 37.59525,
    "lng": 126.91299,
    "cleanliness": 2
  },
  {
    "place": "증산로21길 12",
    "lat": 37.59599,
    "lng": 126.91341,
    "cleanliness": 2
  },
  {
    "place": "증산로21길 7",
    "lat": 37.59588,
    "lng": 126.91411,
    "cleanliness": 1
  }  
  ];
  createIcon(map, pointArray);

  //맵이 완료된 시점에 웹소켓 서버와 연결을 완료해 놓자!
  connectServer();
}
//아이콘 생성하기!
function createIcon(map, pointArray) {
  for (var i = 0; i < pointArray.length; i++) {
    //보여질 아이콘을 제이슨 객체로 정의
    const item = pointArray[i];

    var icon = {
      path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
      fillColor: "#FF0000",
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 0.3,
      scaledSize: new google.maps.Size(15, 15), //scaled size
      origin: new google.maps.Point(0, 0), //origin
      anchor: new google.maps.Point(0, 0), //anchor
    };

    if (item.cleanliness > 3) {
      icon.fillColor = "#FFB800";
    }

    if (item.cleanliness > 6) {
      icon.fillColor = "#1DB505";
    }

    var marker = new google.maps.Marker({
      position: item,
      icon: icon,
      map: map,
    });
    marker.setMap(map);

    //인포윈도우
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          //html로 표시될 인포 윈도우의 내용
          infowindow.setContent(pointArray[i].place);
          //인포윈도우가 표시될 위치
          infowindow.open(map, marker);
        };
      })(marker, i)
    );

    if (marker) {
      marker.addListener("click", function () {
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
