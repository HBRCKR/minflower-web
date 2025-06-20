<script lang="ts">
import AppLayout from "./AppLayout.svelte";
import type { Popup } from "$lib/type/popup/popup.js";
	import { onMount } from "svelte";
	import PopupView from "$lib/components/popup/PopupView.svelte";

let popups = $state<Popup[]>([])

const loadPopups = async () => {
    try {
        const result = await fetch(`/api/popup`)
        const data = await result.json()    
        console.log("popups loaded:", data)
        popups = data
    } catch (error) {
        console.error("Failed to load popups:", error)
        // 테스트용 더미 데이터
        popups = [{
            id: 1,
            title: "테스트 팝업",
            content: "이것은 테스트 팝업입니다.",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            isActive: true,
            position: "center",
            size: "medium",
            showCount: 0,
            createdAt: "2024-01-01",
            backgroundColor: "#ffffff",
            textColor: "#000000",
            titleFontSize: "18",
            contentFontSize: "14",
            image: "",
            imagePosition: "top",
            buttonText: "확인",
            buttonColor: "#007bff",
            showCloseButton: true,
            showDontShowAgain: false
        }]
    }
  }

onMount(async () => {
    await loadPopups()
})

</script>

<AppLayout>
    <slot></slot>    
    
    {#if popups.length > 0}    
       <PopupView {popups} />
    {/if}
   
</AppLayout>
    
