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
        
        // 테스트용 팝업 데이터 추가 (API에서 데이터가 없을 경우)
        if (popups.length === 0) {
            const testPopup: Popup = {
                id: 1,
                title: "공지사항",
                content: "중요한 공지사항을 확인해보세요!",
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 후
                isActive: true,
                position: "center",
                size: "medium",
                showCount: 0,
                createdAt: new Date().toISOString(),
                backgroundColor: "#ffffff",
                textColor: "#333333",
                titleFontSize: "18",
                contentFontSize: "14",
                image: "/popup/2.PNG",
                imagePosition: "top",
                buttonText: "확인",
                buttonColor: "#007bff",
                showCloseButton: true,
                showDontShowAgain: true,
                popupType: "image",
                linkUrl: "/notice/38"
            }
            popups = [testPopup]
        }
    } catch (error) {
        console.error("Failed to load popups:", error)
        
        // 에러 발생 시 테스트용 팝업 데이터 추가
        const testPopup: Popup = {
            id: 1,
            title: "공지사항",
            content: "중요한 공지사항을 확인해보세요!",
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 후
            isActive: true,
            position: "center",
            size: "medium",
            showCount: 0,
            createdAt: new Date().toISOString(),
            backgroundColor: "#ffffff",
            textColor: "#333333",
            titleFontSize: "18",
            contentFontSize: "14",
            image: "/popup/2.PNG",
            imagePosition: "top",
            buttonText: "확인",
            buttonColor: "#007bff",
            showCloseButton: true,
            showDontShowAgain: true,
            popupType: "image",
            linkUrl: "/notice/38"
        }
        popups = [testPopup]
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
    
    {#if popups.length > 0}    
       <PopupView {popups} />
    {/if}
   
</AppLayout>
    
