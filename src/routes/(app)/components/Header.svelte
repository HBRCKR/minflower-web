<script lang="ts">
	import { onMount } from "svelte";
	import SideMenuOpen from "./SideMenuOpen.svelte";    
    import Swiper from 'swiper/bundle';
    import type { SwiperOptions } from 'swiper';
    import 'swiper/css/bundle';
	import { nonpassive } from "svelte/legacy";
    
    let isSideMenuOpen = false;

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
            ]
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
        path: "/cognitive"
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
            path: "/language"
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
            path: "/group"
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
            path: "/consulting"
        },      
        {
        name: "공지사항",
        subMenuItems: [],
        path: "/notice"
        }
    ]

    let swiper: Swiper;
  
    onMount(() => {
        const options: SwiperOptions = {
            cssMode: true,
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
        };
        swiper = new Swiper('.swiper', options);

        swiper.on('slideChange', () => {
            const isDisabled = swiper.isBeginning;
            if (isDisabled) {
                console.log('prev 버튼은 비활성화됨');
            }
        });       
    });

   let prevEl: HTMLDivElement | null = null;
  let nextEl: HTMLDivElement | null = null;

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

  onMount(() => {
    const observers: MutationObserver[] = [];
    prevEl!.style.display="none";
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

    observeAriaDisabled(prevEl, 'prev');
    observeAriaDisabled(nextEl, 'next');

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  });
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
                    <button class="btn_list_prev nicon_backward2 _prevBtnNavi ">
                        이전으로
                    </button>
                </div>
                <div id="navigationFrame" class="swiper">
                    <ul class="swiper-wrapper list_sitemenu _gnbMenuList">
                        {#each menu_items as menu, i}                            
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
                        {/each}
                    </ul>
              </div>
              <div bind:this={nextEl} class="swiper-button-next">
                <button class="btn_list_next nicon_forward2 _nextBtnNavi">
                    <span class="blind">다음 메뉴 보기</span>
                </button>
                </div>
            </div>
          </div>
  
          <div class="area_global">
            <button class="btn_view_all _viewSideMenu" on:click={toggleSideMenu}>
              <span class="nicon_drawer"></span>
              전체보기
            </button>
            <a href="#" class="btn_login _btn_login">로그인</a>
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
{#if isSideMenuOpen}
<SideMenuOpen></SideMenuOpen>
{/if} 

<style global> 
    /* .area_logo::after{
        margin: 0 0 0 21px;
    } */
    .list_sitemenu_wrap {
        display: flex; 
        justify-items: center;       
        align-items: center;
    }
    .swiper-button-prev,
    .swiper-button-next {  
        position: relative;     
        display: flex;
        font-style: normal;
        line-height: 1;       
        font-size: 40px;
        letter-spacing: 1px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: modoo;       
            
        
    }

    .swiper-button-prev{        
        padding-right: 30px;
    }
    .swiper-button-next{
        padding-left: 20px;   
    }
    :root {
    --swiper-navigation-size: 0px; /* 원하는 크기로 변경 */
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
        display: inline-block;
    }

    
</style>