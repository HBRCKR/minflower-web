import { writable } from 'svelte/store';

// 팝업 상태를 관리하는 스토어
export const popupStates = writable<Record<number, boolean>>({});

// 팝업을 열거나 닫는 함수
export const togglePopup = (popupId: number, isOpen: boolean) => {
    popupStates.update(states => ({
        ...states,
        [popupId]: isOpen
    }));
};

// 특정 팝업이 열려있는지 확인하는 함수
export const isPopupOpen = (popupId: number): boolean => {
    let currentStates: Record<number, boolean> = {};
    popupStates.subscribe(states => {
        currentStates = states;
    })();
    return currentStates[popupId] ?? false;
};

// 모든 팝업 상태를 초기화하는 함수
export const resetPopupStates = () => {
    popupStates.set({});
}; 