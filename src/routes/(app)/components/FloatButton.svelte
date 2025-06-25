<script lang="ts">
    import { onMount } from "svelte";
    export let isSideMenuOpen = false;

    let showPhoneModal = false;

    // openTalkTalk 함수를 onMount 밖으로 이동
    const openTalkTalk = () => {
        window.open(
            'http://talk.naver.com/wmhxwib?ref=http%3A%2F%2Flocalhost%3A5176%2Fclinic%2Fgreeting%23',
            'talktalk',
            'scrollbars=1, resizable=1, width=486, height=745'
        );
    };

    const openPhoneModal = () => {
        showPhoneModal = true;
    };

    const closePhoneModal = () => {
        showPhoneModal = false;
    };

    const handleBackdropClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) {
            closePhoneModal();
        }
    };
</script>

<ul class="floating_item _floating {isSideMenuOpen ? 'is_side_menu_open' : ''}">
    <li>
        <a href="#" on:click|preventDefault={openPhoneModal} class="link_item theme_background _btnFloating" data-cid=""
            data-type="defaultPhone" data-data="" data-name="전화">
            <span class="icon icon1"></span><span class="text">전화</span>
        </a>
    </li>
    <li>
        <a href="/clinic/location" class="link_item theme_background _btnFloating" data-cid="3zcg3azu"
            data-type="address" data-data="" data-name="오시는길">
            <span class="icon icon5"></span><span class="text">오시는길</span>
        </a>
    </li>
    <li>
        <!-- <script type="text/javascript" src="https://partner.talk.naver.com/banners/script"></script> -->
        <a 
            href="#"
            on:click={openTalkTalk}
            class="talk_banner_div link_item theme_background _btnFloating" data-cid="159418"
            data-type="talkLink" data-data="159418" data-name="톡톡"
        >
        <span class="icon icon43"></span><span class="text">톡톡</span>
        </a>
        
        <!-- <div class="talk_banner_div " data-id="159418" >            
        </div> -->
    </li>
    <li>
        <a href="index.html#" class="link_item top_item _btnFloating" data-type="top">
            <span class="icon icon_top"></span><span class="text blind">top</span>
        </a>
    </li>
</ul>

<!-- 전화 모달 -->
{#if showPhoneModal}
    <div class="modal-overlay" on:click={handleBackdropClick}>
        <div class="modal-content">
            <div class="modal-header">
                <h3>전화번호</h3>
                <button class="close-btn" on:click={closePhoneModal}>&times;</button>
            </div>
            <div class="modal-body">
                <p class="clinic-name">" 강남연세 마인드플라워 클리닉 " 입니다.</p>
                <p class="phone-number">02-2088-7448</p>
                <p class="mobile-notice">전화연결은 모바일에서 가능합니다.</p>
            </div>
        </div>
    </div>
{/if}

<style>
    .is_side_menu_open {        
        right: 370px;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }

    .modal-content {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        width: 90%;
        overflow: hidden;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
        color: #666;
    }

    .close-btn:hover {
        background-color: #f5f5f5;
    }

    .modal-body {
        padding: 30px 20px;
        text-align: center;
    }

    .clinic-name {
        font-size: 16px;
        color: #333;
        margin-bottom: 15px;
        font-weight: 500;
    }

    .phone-number {
        font-size: 24px;
        font-weight: bold;
        color: #007bff;
        margin-bottom: 15px;
    }

    .mobile-notice {
        font-size: 14px;
        color: #666;
        margin: 0;
    }
</style>
