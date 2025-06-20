<script lang="ts">
	import FloatButton from "./components/FloatButton.svelte";
	import Footer from "./components/Footer.svelte";
	import Header from "./components/Header.svelte";	

    let isSideMenuOpen = false;
</script>

<div id="wrap" class="wrap" data-role="page-container">
    <div class="skip_nav">
        <a href="index.html#main" class="skip_link">본문 바로가기</a>
    </div>
    <div class="fc_wrap _fcWrap">
        <Header bind:isSideMenuOpen={isSideMenuOpen}></Header>
        <div id="main" class="fc_container container" role="main">       
            <slot></slot>  
            <FloatButton bind:isSideMenuOpen={isSideMenuOpen}></FloatButton>
            <Footer></Footer>                                      
        </div>
    </div>
</div>

<div class="layer_dim _layer_dim"></div>
