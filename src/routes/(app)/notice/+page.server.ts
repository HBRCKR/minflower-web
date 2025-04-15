import type { PageServerLoad, Actions } from './$types.js';
import { error, fail } from '@sveltejs/kit';
import type { BoardCreate, BoardDetail, BoardPage, BoardUpdate } from '$lib/type/board/board.js';

const API_BASE_URL = 'http://localhost:8083/api';

export const load: PageServerLoad = async ({ url, fetch }) => {
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '10';

    try {
        const response = await fetch(
            `${API_BASE_URL}/boards?page=${page}&size=${size}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch boards');
        }

        const boardPage: BoardPage = await response.json();
        return { boardPage };
    } catch (err) {
        console.error('Error loading boards:', err);
        throw error(500, 'Internal server error');
    }
};