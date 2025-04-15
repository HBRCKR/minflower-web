import type { PageServerLoad } from './$types.js';
import type { BoardDetail } from '$lib/type/board/board.js';
const API_BASE_URL = 'http://localhost:8083/api';

export const load: PageServerLoad = async ({ params, fetch }: { params: { id: string }, fetch: typeof globalThis.fetch }) => {
    const response = await fetch(
        `${API_BASE_URL}/boards/${params.id}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const board:BoardDetail = await response.json();

    return {
        board
    };
};