export interface Popup {
    id: number
    title: string
    content: string
    startDate: string
    endDate: string
    isActive: boolean
    position: "center" | "top" | "bottom"
    size: "small" | "medium" | "large"
    showCount: number
    createdAt: string
    // 새로 추가되는 필드들
    backgroundColor: string
    textColor: string
    titleFontSize: string
    contentFontSize: string
    image?: string
    imagePosition: "top" | "left" | "right" | "background"
    buttonText: string
    buttonColor: string
    showCloseButton: boolean
    showDontShowAgain: boolean
    popupType: "text" | "image"
  }

export interface PopupCreate {
    id?: number,
    title: string,
    content: string,
    startDate: string,
    endDate: string,
    position: "center" | "top" | "bottom",
    size: "small" | "medium" | "large",
    isActive: boolean,
    backgroundColor: string,
    textColor: string,
    titleFontSize: string,
    contentFontSize: string,
    image: string,
    imagePosition: "top" | "left" | "right" | "background",
    buttonText: string,
    buttonColor: string,
    showCloseButton: boolean,
    showDontShowAgain: boolean,
}