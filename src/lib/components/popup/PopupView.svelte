<script lang="ts">
    //import { Button } from "$lib/components/ui/button/index.js"
	import type { Popup } from "$lib/type/popup/popup.js";
    import { X } from "lucide-svelte"    
    import { onMount } from "svelte"

    export let popups : Popup[]

    let activePopups: Popup[] = []
    let closedPopups = new Set<number>()
    let hiddenPopups = new Set<number>()

  onMount(() => {
    // 쿠키에서 숨겨진 팝업 목록 불러오기
    console.log("popups", popups)
    const hiddenPopupIds = getHiddenPopupsFromCookie()
    hiddenPopups = new Set(hiddenPopupIds)

    // 현재 시간에 표시되어야 할 팝업 필터링
    const now = new Date()
    const validPopups = popups.filter((popup) => {
      const startDate = new Date(popup.startDate)
      const endDate = new Date(popup.endDate)

      return popup.isActive && now >= startDate && now <= endDate && !hiddenPopupIds.includes(popup.id)
    })

    activePopups = validPopups
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
    closedPopups = new Set([...closedPopups, popupId])
  }

  const hidePopupForDay = (popupId: number) => {
    hiddenPopups = new Set([...hiddenPopups, popupId])
    closedPopups = new Set([...closedPopups, popupId])

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
    if (!popup.image) return ""
    
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

  $: visiblePopups = activePopups.filter((popup) => !closedPopups.has(popup.id));
</script>

{#if visiblePopups.length > 0}
	<div class="fixed inset-0 bg-black/10  z-[9998]" />
	{#each visiblePopups as popup, index}
		<div
			class={`fixed ${getPositionClass(popup.position)} ${getSizeClass(popup.size)} rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-[9999]`}
			style="background-color: {popup.backgroundColor}; z-index: {9999 + index};"
		>
			{#if popup.image && popup.imagePosition === "background"}
				<img
					src={popup.image || "/placeholder.svg"}
					alt="팝업 이미지"
					class={getImageStyle(popup)}
				/>
			{/if}

			{#if popup.showCloseButton}
				<button
					on:click={() => closePopup(popup.id)}
					class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
					aria-label="팝업 닫기"
				>
					<X class="w-5 h-5" />
				</button>
			{/if}

			<div class="relative p-6 h-full flex flex-col">
				<!-- 상단 이미지 -->
				{#if popup.image && popup.imagePosition === "top"}
					<div class="mb-4 -mx-6 -mt-6">
						<img
							src={popup.image || "/placeholder.svg"}
							alt="팝업 이미지"
							class={getImageStyle(popup)}
						/>
					</div>
				{/if}

				<!-- 좌우 이미지와 텍스트 레이아웃 -->
				<div class="flex-1 flex {getLayoutClass(popup)}">
					<!-- 좌우 이미지 -->
					{#if popup.image && (popup.imagePosition === "left" || popup.imagePosition === "right")}
						<img
							src={popup.image || "/placeholder.svg"}
							alt="팝업 이미지"
							class={getImageStyle(popup)}
						/>
					{/if}

					<!-- 텍스트 콘텐츠 -->
					<div class="flex-1">
						<!-- 제목 -->
						<h3
							class="font-bold mb-3 leading-tight"
							style="color: {popup.textColor}; font-size: {popup.titleFontSize}px;"
						>
							{popup.title}
						</h3>

						<!-- 내용 -->
						<div
							class="mb-4 leading-relaxed"
							style="color: {popup.textColor}; font-size: {popup.contentFontSize}px;"
						>
							{#each popup.content.split("\n") as line, index}
								<p class="mb-2">{line}</p>
							{/each}
						</div>
					</div>
				</div>

				<!-- 하단 버튼 영역 -->
				<div class="mt-auto pt-4 space-y-3">
					<!-- 메인 버튼 -->
					<button
						class="w-full font-medium py-2 px-4 rounded text-white"
						style="background-color: {popup.buttonColor}"
						on:click={() => closePopup(popup.id)}
					>
						{popup.buttonText}
					</button>

					<!-- 하단 옵션 버튼들 -->
					{#if popup.showDontShowAgain}
						<div class="flex justify-between items-center text-sm">
							<button
								on:click={() => hidePopupForDay(popup.id)}
								class="underline hover:no-underline transition-all"
								style="color: {popup.textColor}"
							>
								1일 동안 보지 않기
							</button>
							<button
								on:click={() => closePopup(popup.id)}
								class="underline hover:no-underline transition-all"
								style="color: {popup.textColor}"
							>
								닫기
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
{/if}