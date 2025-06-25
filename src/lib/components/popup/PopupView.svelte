<script lang="ts">
    //import { Button } from "$lib/components/ui/button/index.js"
	import type { Popup } from "$lib/type/popup/popup.js";
    import { onMount } from "svelte"
    import { popupStates, togglePopup } from "$lib/stores/popupStore.js";

    const { popups } = $props<{ popups: Popup[] }>()

    let activePopups = $state<Popup[]>([])
    let hiddenPopups = $state(new Set<number>())

  onMount(() => {
    // 쿠키에서 숨겨진 팝업 목록 불러오기
    console.log("popups", popups)
    const hiddenPopupIds = getHiddenPopupsFromCookie()
    hiddenPopups = new Set(hiddenPopupIds)

    // 현재 시간에 표시되어야 할 팝업 필터링
    const now = new Date()
    const validPopups = popups.filter((popup: Popup) => {
      const startDate = new Date(popup.startDate)
      const endDate = new Date(popup.endDate)

      return popup.isActive && now >= startDate && now <= endDate && !hiddenPopupIds.includes(popup.id)
    })

    activePopups = validPopups

    // 스토어에서 닫힌 팝업 상태를 확인하여 초기 상태 설정
    popupStates.subscribe(states => {
      // 스토어에 없는 팝업들은 열린 상태로 설정
      validPopups.forEach((popup: Popup) => {
        if (!(popup.id in states)) {
          togglePopup(popup.id, true)
        }
      })
    })()
  })

  const getHiddenPopupsFromCookie = (): number[] => {
    if (typeof window === "undefined") return []

    const cookie = document.cookie.split("; ").find((row) => row.startsWith("hiddenPopups="))

    if (!cookie) return []

    try {
      return JSON.parse(decodeURIComponent(cookie.split("=")[1]))
    } catch {
      return []
    }
  }

  const saveHiddenPopupsToCookie = (popupIds: number[]) => {
    if (typeof window === "undefined") return

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    document.cookie = `hiddenPopups=${encodeURIComponent(JSON.stringify(popupIds))}; expires=${tomorrow.toUTCString()}; path=/`
  }

  const closePopup = (popupId: number) => {
	console.log("closePopup", popupId)
    togglePopup(popupId, false)
  }

  const hidePopupForDay = (popupId: number) => {
    hiddenPopups = new Set([...hiddenPopups, popupId])
    togglePopup(popupId, false)

    // 쿠키에 저장
    saveHiddenPopupsToCookie([...hiddenPopups])
  }

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "w-[300px] max-h-[400px]"
      case "medium":
        return "w-[400px] max-h-[500px]"
      case "large":
        return "w-[500px] max-h-[600px]"
      default:
        return "w-[400px] max-h-[500px]"
    }
  }

  const getPositionClass = (position: string) => {
    switch (position) {
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      case "top":
        return "top-8 left-1/2 transform -translate-x-1/2"
      case "bottom":
        return "bottom-8 left-1/2 transform -translate-x-1/2"
      default:
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    }
  }

  const getImageStyle = (popup: Popup) => {
        if (!popup.image) return {}
        
        if (popup.imagePosition === "background") {
            return "absolute inset-0 w-full h-full object-cover opacity-20"
        } else if (popup.imagePosition === "top") {
            return "w-full h-32 object-cover rounded-t-lg"
        } else {
            return "w-24 h-24 object-cover rounded-lg flex-shrink-0"
        }
    }

	const getLayoutClass = (popup: Popup) => {
        if (popup.imagePosition === "left") {
            return "flex-row items-center gap-4"
        } else if (popup.imagePosition === "right") {
            return "flex-row-reverse items-center gap-4"
        } else {
            return "flex-col"
        }
    }

  // 스토어를 구독하여 팝업 상태 변경을 감지
  let popupStatesValue = $state<Record<number, boolean>>({})
  popupStates.subscribe(states => {
    popupStatesValue = states
  })

  // visiblePopups를 $derived로 변경
  const visiblePopups = $derived(activePopups.filter((popup) => {
    return popupStatesValue[popup.id] ?? true
  }))

</script>

{#if visiblePopups.length > 0}
	<div class="fixed inset-0 bg-black/10  z-[9998]" />
	{#each visiblePopups as popup, index}
		<div
			class={`fixed ${getPositionClass(popup.position)}  rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-[9999]`}
			style="background-color: {popup.backgroundColor}; z-index: {9999 + index};"
		>
		{#if popup.popupType === 'image' && popup.image}
        <!-- 이미지 팝업: 이미지가 팝업창을 꽉 채움 -->
        <img
            src={popup.image}
            alt="팝업 이미지"
            class="w-full h-full object-cover"
        />
        {#if popup.showCloseButton}
            <button 
			class="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full p-1 z-10000"
			onclick={() => closePopup(popup.id)}>
                <span class="w-4 h-4 flex items-center justify-center font-bold">×</span>
            </button>
        {/if}
    {:else}
        <!-- 텍스트 팝업: 기존 레이아웃 -->
        {#if popup.image && popup.imagePosition === "background"}
            <img
                src={popup.image || "/placeholder.svg"}
                alt="팝업 이미지"
                class={getImageStyle(popup)}
            />
        {/if}     
        
        {#if popup.showCloseButton}
            <button 
			class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10" 
			onclick={() => closePopup(popup.id)}>
                <span class="w-5 h-5 flex items-center justify-center font-bold text-xl">×</span>
            </button>
        {/if}

        <div class="relative p-6 h-full flex flex-col">       
            {#if popup.image && popup.imagePosition === "top"}
                <div class="mb-4 -mx-6 -mt-6">
                    <img
                        src={popup.image || "/placeholder.svg"}
                        alt="팝업 이미지"
                        class={getImageStyle(popup)}
                    />
                </div>
            {/if}

            <div class="flex-1 flex {getLayoutClass(popup)}">
                {#if popup.image && (popup.imagePosition === "left" || popup.imagePosition === "right")}
                    <img
                        src={popup.image || "/placeholder.svg"}
                        alt="팝업 이미지"
                        class={getImageStyle(popup)}
                    />
                {/if}

                <div class="flex-1">
                    <h3
                        class="font-bold mb-3 leading-tight"
                        style="color: {popup.textColor}; font-size: {popup.titleFontSize}px;"
                    >
                        {popup.title}
                    </h3>

                    <div
                        class="mb-4 leading-relaxed"
                        style="color: {popup.textColor}; font-size: {popup.contentFontSize}px;"
                    >
                        {#each popup.content.split("\n") as line, index}
                            <p class="mb-2">
                                {line}
                            </p>
                        {/each}
                    </div>
                </div>
            </div>
            
            <div class="mt-auto pt-4 space-y-3">         
                {#if popup.showDontShowAgain}
                    <div class="flex justify-between items-center text-sm">
                        <button 
                            class="underline hover:no-underline" 
                            style="color: {popup.textColor}"
                            onclick={() => hidePopupForDay(popup.id)}
                        >
                            1일 동안 보지 않기
                        </button>
                        <button 
                            class="underline hover:no-underline" 
                            style="color: {popup.textColor}"
                            onclick={() => closePopup(popup.id)}
                        >
                            닫기
                        </button>
                    </div>
                {:else}
                    <button 
                        class="w-full py-2 px-4 rounded-lg font-medium transition-colors"
                        style="background-color: {popup.buttonColor}; color: white;"
                        onclick={() => closePopup(popup.id)}
                    >
                        {popup.buttonText || "확인"}
                    </button>
                {/if}
            </div>
        </div>
    {/if}
		</div>
	{/each}
{/if}