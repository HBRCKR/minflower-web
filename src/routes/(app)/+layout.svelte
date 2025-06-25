<script lang="ts">
import AppLayout from "./AppLayout.svelte";
import type { Popup } from "$lib/type/popup/popup.js";
	import { onMount } from "svelte";
	import PopupView from "$lib/components/popup/PopupView.svelte";
	import { page } from "$app/stores";
	import { popupStates, resetPopupStates } from "$lib/stores/popupStore.js";

let popups = $state<Popup[]>([])
let currentPath = $state($page.url.pathname)

const loadPopups = async () => {
    try {
        const result = await fetch(`/api/popup`)
        const data = await result.json()    
        console.log("popups loaded:", data)
        popups = data
    } catch (error) {
        console.error("Failed to load popups:", error)
        // 테스트용 더미 데이터
        // popups = [{
        //     id: 1,
        //     title: "테스트 팝업",
        //     content: "이것은 테스트 팝업입니다.",
        //     startDate: "2024-01-01",
        //     endDate: "2024-12-31",
        //     isActive: true,
        //     position: "center",
        //     size: "medium",
        //     showCount: 0,
        //     createdAt: "2024-01-01",
        //     backgroundColor: "#ffffff",
        //     textColor: "#000000",
        //     titleFontSize: "18",
        //     contentFontSize: "14",
        //     image: "",
        //     imagePosition: "top",
        //     buttonText: "확인",
        //     buttonColor: "#007bff",
        //     showCloseButton: true,
        //     showDontShowAgain: false
        // }]
    }
  }

onMount(async () => {
    await loadPopups()
})

// 페이지가 변경될 때 팝업 상태를 유지하도록 설정
$effect(() => {
    if ($page.url.pathname !== currentPath) {
        currentPath = $page.url.pathname
        // 페이지 변경 시 팝업 상태는 유지 (스토어에 저장되어 있음)
    }
})

</script>

<AppLayout>
    <slot></slot>    
    
    {#if popups.length > 0 && $page.url.pathname === "/clinic/greeting"}    
       <PopupView {popups} />
    {/if}
   
</AppLayout>
    
