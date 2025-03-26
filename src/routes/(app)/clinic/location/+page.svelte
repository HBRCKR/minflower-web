<script>
	import { onMount } from "svelte";

  onMount(()=>{
    // <div
    //                   class="map"
    //                   id="convenienceInformationMap"
    //                   data-title="강남엑슬루프라임"
    //                   data-latitude="37.4730721"
    //                   data-longitude="127.1024399"
    //                   data-zoom="13"
    //                   data-local-num="0"
    //                   tabindex="0"
    //                 ></div>
    const mapOptions = {
        title:"강남엑슬루프라임",
        center: new naver.maps.LatLng(37.4730721, 127.1024399),
        zoom: 13,    
        scrollWheel: false  ,
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
            style: naver.maps.ZoomControlStyle.SMALL
        }  
    };

    const map = new naver.maps.Map('convenienceInformationMap', mapOptions);
    const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.4730721, 127.1024399),
        map: map
    });
  })
</script>
<svelte:head>
  <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=s2acq0i4b8"></script>
</svelte:head>  
<div class="fc_content content _content_body">
  <div class="fcdeck_container">
    <div class="fcdeck_ct">
      <div class="card" data-cid="3zcg3azu">
        <h3 class="uio_title theme_color" id="title">
          <span class="uio_title_bullet theme_background"></span>
          오시는 길
        </h3>

        <!-- 실제 위치 정보 영역 -->
        <div class="main_area current" data-cid="3zcg3azu" data-title="오시는 길">
          <div class="inner _inner">
            <div class="uio_box info_box">
              <div class="uio_content">
                <div class="info_section _area" data-convenience-information-cid="3zcg3azu">
                  <div class="map_area _mapArea">
                    <div
                      class="map"
                      id="convenienceInformationMap"
                      data-title="강남엑슬루프라임"
                      data-latitude="37.4730721"
                      data-longitude="127.1024399"
                      data-zoom="13"
                      data-local-num="0"
                      tabindex="0"
                    ></div>
                    <div class="map_adr">
                      <h3>강남엑슬루프라임</h3>
                      <p class="theme_color">서울특별시 강남구 자곡동 650</p>
                      <div class="map_ico_btn_wrap">
                        <a href="#" class="btn_roadmap theme_background" id="findRoute">
                          <span class="nicon nicon_pathfind2"></span>길찾기
                        </a>
                        <a href="#" class="btn_map theme_background" id="mapDetail">
                          <span class="nicon nicon_pin1"></span>지도에서 보기
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- 오시는 길 텍스트 -->
                  <div class="local_area _localArea">
                    <dl class="list_info">
                      <dt class="item_title"><span class="nicon_pin2"></span>오시는길</dt>
                      <dd class="item_description local_description">
                        <span class="text">
                          강남엑슬루프라임 6층(621호)<br /><br />
                          [지하철: 수서역(3호선)에서] <br /><br />
                          마을버스 강남03번 못골마을, 강남자곡아이파크 하차 9분<br />
                          마을버스 강남06, 06-1번 레미안포레 아파트 하차 13분<br />
                          버스 3416번 레미안포레 아파트 하차 12분<br />
                          버스 2412번 못골마을, 강남자곡아이파크 하차 10분<br />
                          버스 4425번 못골마을, 강남자곡아이파크 하차 10분<br />
                          버스 402번 레미안포레 아파트 하차 15분
                        </span>
                      </dd>
                    </dl>

                    <!-- 이용시간 -->
                    <dl class="list_info">
                      <dt class="item_title">
                        <span class="nicon_time2"></span>이용시간
                        <span class="icon icon_open _open" style="display: none"><em class="blind">영업중</em></span>
                        <span class="icon icon_finish _finish" style="display: none"><em class="blind">영업마감</em></span>
                      </dt>
                      <dd class="item_description">
                        <span class="text">
                          <span class="sub_title">평일</span>
                          <span class="sub_text">10:00 ~ 19:00</span>
                        </span>
                        <span class="text">
                          <span class="sub_title">토요일</span>
                          <span class="sub_text">10:00 ~ 14:00</span>
                        </span>
                        <span class="text sub_description">일요일과 공휴일은 휴무입니다.</span>
                      </dd>
                    </dl>

                    <!-- 전화번호 -->
                    <dl class="list_info _telephoneArea">
                      <dt class="item_title"><span class="nicon_call2"></span>전화번호</dt>
                      <dd class="item_description">
                        <span class="text _telephone" data-telephone="02-2088-7448"></span>
                        <span class="text _telephone" data-telephone="010-5960-7448"></span>
                      </dd>
                    </dl>
                  </div>

                  <!-- 계좌영역(비어 있음) -->
                  <div class="area_aaccount _accountArea"></div>
                </div>
              </div>
            </div>
          </div> <!-- inner -->
        </div> <!-- main_area -->
      </div>
    </div>
  </div>
</div>
