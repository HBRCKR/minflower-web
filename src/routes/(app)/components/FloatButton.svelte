<script lang="ts">
    import { onMount } from "svelte";
    export let isSideMenuOpen = false;

    // openTalkTalk 함수를 onMount 밖으로 이동
    const openTalkTalk = () => {
        window.open(
            'http://talk.naver.com/wmhxwib?ref=http%3A%2F%2Flocalhost%3A5176%2Fclinic%2Fgreeting%23',
            'talktalk',
            'scrollbars=1, resizable=1, width=486, height=745'
        );
    };
</script>
<ul class="floating_item _floating {isSideMenuOpen ? 'is_side_menu_open' : ''}">
    <li>
        <a href="index.html#" class="link_item theme_background _btnFloating" data-cid=""
            data-type="defaultPhone" data-data="" data-name="전화">
            <span class="icon icon1"></span><span class="text">전화</span>
        </a>
    </li>
    <li>
        <a href="index.html#" class="link_item theme_background _btnFloating" data-cid="3zcg3azu"
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

<style>
    .is_side_menu_open {        
        right: 370px;
    }
</style>
