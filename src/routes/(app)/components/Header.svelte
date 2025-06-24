<script lang="ts">
	import { onMount } from "svelte";
	import SideMenuOpen from "./SideMenuOpen.svelte";    
    import Swiper from 'swiper/bundle';
    import type { SwiperOptions } from 'swiper';
    import 'swiper/css/bundle';
	import { nonpassive } from "svelte/legacy";
    
    export let isSideMenuOpen = false;

    const toggleSideMenu = () => {
    isSideMenuOpen = !isSideMenuOpen;
    };

    let selectedMainIndex = 0;
    let selectedSubIndex = 0;

    const handleMainMenuClick = (index: number) => {
        selectedMainIndex = index;
        selectedSubIndex = 0;
    };

    const handleSubMenuClick = (index: number) => {        
        selectedSubIndex = index;
    };


    const menu_items=[
        {
            name:"클리닉 소개",
            subMenuItems:[
                {
                    name:"인사말",
                    path:"/greeting",
                    orderNo:0
                },
                {
                    name:"클리닉 둘러보기",
                    path:"/tour",
                    orderNo:0
                },
                {
                    name:"전문가 소개",
                    path:"/experts",
                    orderNo:0
                },
                {
                    name:"진행 절차",
                    path:"/process",
                    orderNo:0
                },
                {
                    name:"오시는 길",
                    path:"/location",
                    orderNo:0
                }
            ],
            path:"/clinic",
            orderNo:0
        },
        {
            name: "검사",
            path: "/assessment", 
            subMenuItems: [
                {
                name: "인지기능평가(지능/주의력)",
                path: "/cognitive-function",
                orderNo: 1
                },
                {
                name: "인지/기질평가",
                path: "/temperament",
                orderNo: 2
                },
                {
                name: "언어평가",
                path: "/language",
                orderNo: 3
                },
                {
                name: "학습평가",
                path: "/learning",
                orderNo: 4
                },
                {
                name: "종합심리평가",
                path: "/full-psychology",
                orderNo: 5
                },
                {
                name: "진로적성평가",
                path: "/career-aptitude",
                orderNo: 6
                }
            ],
            orderNo:0
        },
        {
        name: "인지학습 프로그램",
        subMenuItems: [
            {
            name: "인지능력 향상 프로그램",
            path: "/ability",
            orderNo: 1
            },
            {
            name: "집중력 향상 프로그램",
            path: "/focus",
            orderNo: 2
            },
            {
            name: "학습전략 코칭",
            path: "/strategy",
            orderNo: 3
            }
        ],
        path: "/cognitive",
        orderNo:0
        },
        {
            name: "언어 프로그램",
            subMenuItems: [
                {
                name: "언어발달증진 프로그램",
                path: "/development",
                orderNo: 1
                },
                {
                name: "발음향상 프로그램",
                path: "/pronunciation",
                orderNo: 2
                },
                {
                name: "읽기향상 프로그램",
                path: "/reading",
                orderNo: 3
                }
            ],
            path: "/language",
            orderNo:0
        },
        {
            name: "그룹 프로그램",
            subMenuItems: [
                {
                name: "학교준비 프로그램",
                path: "/school-readiness",
                orderNo: 1
                },
                {
                name: "사회성/사회인지 프로그램",
                path: "/social-cognition",
                orderNo: 2
                },
                {
                name: "사회적 의사소통향상 프로그램",
                path: "/social-communication",
                orderNo: 3
                },
                {
                name: "독서 멘토링 프로그램",
                path: "/reading-mentoring",
                orderNo: 4
                }
            ],
            path: "/group",
            orderNo:0
        },
        {
            name: "상담 및 컨설팅",
            subMenuItems: [
                {
                name: "심리상담",
                path: "/psychological",
                orderNo: 1
                },
                {
                name: "적성/학습 컨설팅",
                path: "/aptitude-learning",
                orderNo: 2
                },
                {
                name: "진로 컨설팅",
                path: "/career",
                orderNo: 3
                }
            ],
            path: "/consulting",
            orderNo:0
        },      
        {
        name: "공지사항",
        subMenuItems: [],
        path: "/notice",
        orderNo:0
        }
    ]

    let swiper: Swiper;
    let prevEl: HTMLDivElement | null = null;
    let nextEl: HTMLDivElement | null = null;
  
    onMount(() => {
        // DOM이 완전히 렌더링된 후 Swiper 초기화
        setTimeout(() => {
            console.log('Swiper 초기화 시작');
            console.log('prevEl:', prevEl);
            console.log('nextEl:', nextEl);
            
            // 버튼들을 강제로 표시
            if (prevEl) {
                prevEl.style.display = 'flex';
                prevEl.style.visibility = 'visible';
                prevEl.style.opacity = '1';
            }
            if (nextEl) {
                nextEl.style.display = 'flex';
                nextEl.style.visibility = 'visible';
                nextEl.style.opacity = '1';
            }
            
            const swiperContainer = document.querySelector('.swiper');
            console.log('swiperContainer:', swiperContainer);
            
            if (!swiperContainer) {
                console.error('Swiper 컨테이너를 찾을 수 없습니다');
                return;
            }
            
            const options: SwiperOptions = {
                cssMode: false, // 데스크톱에서도 작동하도록 false로 변경
                direction: 'horizontal',
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 0,
                speed: 400,
                slidesPerGroup: 1,  
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',                
                },
                watchOverflow: false, // 자동 숨김 비활성화
                allowTouchMove: true, // 터치/마우스 드래그 허용
                resistance: true, // 끝에서 저항 효과
                resistanceRatio: 0.85, // 저항 비율
                // 슬라이드가 잘리지 않도록 설정
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 0
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 0
                    },
                    1024: {
                        slidesPerView: 'auto',
                        spaceBetween: 0
                    }
                }
            };
            
            try {
                swiper = new Swiper('.swiper', options);
                console.log('Swiper 초기화 성공:', swiper);

                swiper.on('slideChange', () => {
                    console.log('슬라이드 변경됨');
                    const isDisabled = swiper.isBeginning;
                    if (isDisabled) {
                        console.log('prev 버튼은 비활성화됨');
                    }
                });

                // 초기 상태 설정 - 버튼들을 모두 표시
                console.log('초기에 모든 버튼 표시');
                if (prevEl) prevEl.style.display = 'flex';
                if (nextEl) nextEl.style.display = 'flex';
                
                // 수동으로 네비게이션 이벤트 추가
                if (nextEl) {
                    nextEl.addEventListener('click', () => {
                        console.log('next 버튼 클릭됨');
                        if (swiper && !swiper.isEnd) {
                            swiper.slideNext();
                        }
                    });
                }
                
                if (prevEl) {
                    prevEl.addEventListener('click', () => {
                        console.log('prev 버튼 클릭됨');
                        if (swiper && !swiper.isBeginning) {
                            swiper.slidePrev();
                        }
                    });
                }
                
            } catch (error) {
                console.error('Swiper 초기화 실패:', error);
            }
        }, 100);

        // MutationObserver 설정
        const observers: MutationObserver[] = [];
        
        const observeAriaDisabled = (
            el: HTMLElement | null,
            type: 'prev' | 'next'
        ) => {
            if (!el) return;
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (
                        mutation.type === 'attributes' &&
                        mutation.attributeName === 'aria-disabled'
                    ) {
                        handleAriaChange(el, type);
                    }
                }
            });

            observer.observe(el, {
                attributes: true,
                attributeFilter: ['aria-disabled'],
            });

            observers.push(observer);
        };

        // DOM 요소들이 준비된 후 observer 설정
        setTimeout(() => {
            if (prevEl && nextEl) {
                observeAriaDisabled(prevEl, 'prev');
                observeAriaDisabled(nextEl, 'next');
            }
        }, 200);

        return () => {
            observers.forEach((o) => o.disconnect());
            if (swiper) {
                swiper.destroy();
            }
        };
    });

    function handleAriaChange(el: HTMLElement, type: 'prev' | 'next') {
        const newValue = el.getAttribute('aria-disabled');
        console.log(`${type} 버튼 상태:`, newValue);

        if (newValue === 'true') {
            console.log(`${type} 버튼이 비활성화됨`);
            el.style.display = 'none';
        } else {
            console.log(`${type} 버튼이 활성화됨`);
            el.style.display = 'flex';
        }
    }
</script>

<div class="header is_sub_menu" id="mainHeader" role="banner">
    <div class="section_header_wrap">
      <div class="section_header">
        <div class="area_inner">
          <div class="area_logo">
            <h1 class="site_name">
              <a href="/">강남연세 마인드플라워 클리닉</a>
            </h1>
          </div>
          <div class="area_navbar" role="navigation">
            <div class="list_sitemenu_wrap _navigationWrap ">
                <div bind:this={prevEl} class="swiper-button-prev">
                    <span class="btn_list_prev nicon_backward2 _prevBtnNavi">
                        이전으로
                    </span>
                </div>
                <div id="navigationFrame" class="swiper">
                    <ul class="swiper-wrapper list_sitemenu _gnbMenuList">
                        {#each menu_items as menu, i}     
                            {#if menu.name!="공지사항"}                                                   
                            <li               
                                data-item={menu.subMenuItems.length}
                                data-index={i}
                                data-last-item={menu_items.length-1==i?"true":""}
                                class="swiper-slide theme_color"
                                class:selected={selectedMainIndex === i}                      
                            >                  
                            <a
                                on:click={() => handleMainMenuClick(i)} 
                                href={menu.path+(menu.subMenuItems.length>0?menu.subMenuItems[0].path:"")}
                            >
                                <span class="menu_name">
                                <span class="text">{menu.name}</span>
                                </span>
                                <span class="menu_num theme_background">{menu.subMenuItems.length}</span>
                            </a>
                            <span class="selected_line theme_background"></span>                            
                            </li>  
                            {:else}
                            <li                                               
                                class="swiper-slide theme_color"
                                class:selected={selectedMainIndex === i}                      
                            >                  
                            <a
                                on:click={() => handleMainMenuClick(i)} 
                                href={menu.path+(menu.subMenuItems.length>0?menu.subMenuItems[0].path:"")}
                            >
                                <span class="menu_name">
                                <span class="text">{menu.name}</span>
                                </span>                               
                            </a>
                            <span class="selected_line theme_background"></span>                            
                            </li>  
                            {/if}
                        {/each}
                    </ul>
              </div>
              <div bind:this={nextEl} class="swiper-button-next">
                <span class="btn_list_next nicon_forward2 _nextBtnNavi">
                    <span class="blind">다음 메뉴 보기</span>                    
                </span>
                </div>
            </div>
          </div>
  
          <div class="area_global">
            <button class="btn_view_all _viewSideMenu" on:click={toggleSideMenu}>
              <span class="nicon_drawer"></span>
              전체보기
            </button>
            <!-- <a href="#" class="btn_login _btn_login">로그인</a> -->
          </div>
        </div>
      </div>
    </div>
  
    <!-- Sub Menu -->
    <div class="section_sub_menu_wrap">            
      <div>
        <ul class="list_sub_menu _subMenu">
          {#each menu_items[selectedMainIndex].subMenuItems as subMenu, j}
            <li 
            class="_sub theme_color"
            class:selected={selectedSubIndex === j}
            >
              <a 
                on:click={() => handleSubMenuClick(j)} 
                href={menu_items[selectedMainIndex].path + subMenu.path}
              >
                <div class="menu_name">
                  <span class="text">{subMenu.name}</span>
                </div>
                <span class="selected_line theme_background"></span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>  
  <SideMenuOpen
  bind:isOpen={isSideMenuOpen}
  menu_items={menu_items}
  ></SideMenuOpen>

<style global> 
    /* .area_logo::after{
        margin: 0 0 0 21px;
    } */
    .list_sitemenu_wrap {
        display: flex; 
        justify-items: center;       
        align-items: center;
        position: relative;
        width: 100%;
    }
    
    .swiper {
        width: 100%;
        overflow: hidden;
        flex: 1;
    }
    
    .swiper-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        transform: translate3d(0px, 0px, 0px); /* Swiper가 자동으로 설정하는 transform */
    }
    
    .swiper-button-prev,
    .swiper-button-next {  
        position: relative !important;     
        display: flex !important; /* 강제 표시 */
        font-style: normal;
        line-height: 1;       
        font-size: 40px;
        letter-spacing: 1px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: modoo;       
        z-index: 10;
        cursor: pointer;
        visibility: visible !important;
        opacity: 1 !important;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
        padding: 5px 10px;
        color: #333;
        min-width: 40px;
        min-height: 30px;        
        align-items: center;
        justify-content: center;        
        transition: all 0.2s ease;
    }

    /* .swiper-button-prev:hover,
    .swiper-button-next:hover {
        
    } */

    .swiper-button-prev{        
        padding-right: 30px;
        margin-right: 10px;
    }
    .swiper-button-next{
        padding-left: 20px;   
        margin-left: 10px;
    }
    
    :root {
        --swiper-navigation-size: 0px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after { 
      font-size: 20px; /* 화살표 크기 */
      color: #888;
    }

    .swiper-slide {
        width: auto; 
        padding: 0 10px;
        flex-shrink: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        /* 슬라이드가 잘리지 않도록 설정 */
        overflow: visible;
    }
    
    /* Swiper가 비활성화된 경우에도 버튼 표시 */
    .swiper-button-disabled {
        display: flex !important;
        opacity: 0.5 !important;
        background: rgba(200, 200, 200, 0.9) !important;
        color: #666 !important;
    }
    
    /* 테스트용 스타일 - 버튼이 확실히 보이도록 */
    .btn_list_prev,
    .btn_list_next {
        color: inherit !important;
        font-weight: bold;
        text-decoration: none;
        font-size: 14px;
        white-space: nowrap;
    }
    
    /* 전체 네비게이션 래퍼 스타일 */
    ._navigationWrap {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        overflow: visible; /* 부모 컨테이너도 visible로 설정 */
    }
    
    /* 메뉴 아이템이 잘리지 않도록 설정 */
    .list_sitemenu {
        overflow: visible;
    }
</style>