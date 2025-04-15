import type { PageResponse } from "../pagenation/pagenation.js";

export type BoardDetail = {
    id: number;
    title: string;
    content: string;
    author: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export type BoardCreate = {
    title: string;
    content: string;
    author: string;
    isActive: boolean;
}

export type BoardUpdate = {
    title: string;
    content: string;
    isActive: boolean;
}

export type BoardPage = PageResponse<BoardDetail>;
