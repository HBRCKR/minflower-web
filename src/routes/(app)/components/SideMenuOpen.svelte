<script lang="ts">
    import { onMount } from "svelte";
    
    // 사이드 메뉴 상태 관리
    export let isOpen = false;
    
    // 메뉴 아이템 타입 정의
    interface SubMenuItem {
        name: string;
        path: string;
        orderNo: number;
    }

    interface MenuItem {
        name: string;
        path: string;
        orderNo: number;
        subMenuItems: SubMenuItem[];
    }

    // Header에서 전달받은 메뉴 아이템
    export let menu_items: MenuItem[] = [];
    
    // 사이드 메뉴 닫기 함수
    function closeSideMenu() {
        isOpen = false;
    }

    let selectedMainMenuName = "";
    let selectedSubMenuName = "";
    
    const selectMainMenu = (menu: MenuItem) => {
        if (selectedMainMenuName === menu.name) {
            selectedMainMenuName = "";
        } else {
            selectedMainMenuName = menu.name;
        }
    }

    const selectSubMenu = (subMenu: SubMenuItem) => {
        if (selectedSubMenuName === subMenu.name) {
            selectedSubMenuName = "";
        } else {
            selectedSubMenuName = subMenu.name;
        }
    }
</script>

{#if isOpen}
<div class="is_side_menu_open side_menu theme_background _sideMenu" >
    <button class="btn_close nicon_close _sideMenuClose" on:click={closeSideMenu}>
        <span class="blind">닫기</span>
    </button>
    <div class="area_logo">
        <h1 class="site_name">
            <a href="/">강남연세 마인드플라워 클리닉</a>
        </h1>
    </div>
    <div class="list_sitemenu_wrap">
        <ul class="list_sitemenu _gnbMenuList">
            {#each menu_items as menu}
                <li class="is_sub_menu {selectedMainMenuName === menu.name ? 'selected' : ''}" on:click={() => selectMainMenu(menu)}>
                    <div class="sitemenu_inner">
                        <a href={menu.subMenuItems.length > 0 ? '#' : menu.path} 
                        data-cid="e89nrbld" 
                        data-sub-menu-cid="6fyfazo9" 
                        data-title="클리닉 소개">
                            <div class="menu_name">
                                <span class="text">{menu.name}</span>
                            </div>
                            {#if menu.subMenuItems.length > 0}
                                <span class="menu_num theme_background">{menu.subMenuItems.length}</span>
                            {/if}
                        </a>
                        {#if menu.subMenuItems.length > 0}
                            <button class="nicon_down2 _sideSubMenuOpen">
                                <span class="blind">하위메뉴더보기</span>
                            </button>
                            <button class="nicon_up2 _sideSubMenuClose">
                                <span class="blind">하위메뉴닫기</span>
                            </button>
                        {/if}
                    </div>
                    {#if menu.subMenuItems.length > 0}
                        <ul class="list_sub_menu _subMenu">
                            {#each menu.subMenuItems as subMenu}
                                <li class="_sub {selectedSubMenuName === subMenu.name ? 'selected' : ''}" on:click={() => selectSubMenu(subMenu)}>
                                    <a href={menu.path + subMenu.path}>
                                        <div class="menu_name">
                                            <span class="text">{subMenu.name}</span>
                                        </div>
                                        <span class="selected_line theme_background"></span>
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    <div class="copyright">ⓒ modoo! powered by Naver</div>
</div>
{/if}

<style>    
    .side_menu {
        text-align: left;
        font-family: "Noto Sans", "맑은 고딕", "Malgun Gothic", Arial, Helvetica, sans-serif, Lucida, Grande, "Microsoft YaHei", "Hiragino Sans GB", SimSun, Meiryo;
        font-size: 13px;
        margin: 0;
        padding: 0;
        background-color: #e89788 !important;
        display: block;
        overflow-y: auto;
        position: fixed;
        top: 0;
        right: 0; /* 초기에는 화면 밖에 위치 */
        bottom: 0;
        z-index: 9999;
        width: 320px;
        box-sizing: border-box;
        transition: right 0.3s ease-in-out;
    }
    
    .is_side_menu_open {
        right: 0; /* 열릴 때 화면 안으로 이동 */
        min-width: 320px;
    }
    
    .btn_close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 48px;
        height: 48px;
        border: 0;
        background-color: rgba(0, 0, 0, .08);
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
    }
    
    .area_logo {
        padding: 30px 75px 64px 40px;
    }
    
    .site_name {
        margin: 0;
        font-size: 20px;
        font-weight: 400;
    }
    
    .site_name a {
        color: white;
        text-decoration: none;
    }
    
    .list_sitemenu_wrap {
        margin-top: 20px;
    }
    
    .list_sitemenu {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .sitemenu_inner {
        
    }
    
    .menu_name {
        color: white;
    }
    
    .list_sub_menu {
        list-style: none;
        padding-left: 40px;
        display: none; /* 기본적으로 숨김 */
    }
    
    li.is_sub_menu.open .list_sub_menu {
        display: block; /* 열릴 때 표시 */
    }
    
    .nicon_down2, .nicon_up2 {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
    }
    
    .nicon_up2 {
        display: none;
    }
    
    li.is_sub_menu.open .nicon_down2 {
        display: none;
    }
    
    li.is_sub_menu.open .nicon_up2 {
        display: inline-block;
    }
    
    .copyright {
        padding: 20px;
        color: white;
        text-align: center;
        font-size: 12px;
    }
</style>
