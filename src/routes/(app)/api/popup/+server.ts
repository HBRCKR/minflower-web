import { API_BASE_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async () => {
    try {
        const result = await fetch(`${API_BASE_URL}/popups`);
        const data = await result.json();
        console.log("data",data)
        
        return json(data);
    } catch {
        return json({ error: 'Failed to fetch admin data' }, { status: 500 });
    }
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        console.log("POST body", body);
        
        const result = await fetch(`${API_BASE_URL}/popups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        
        const data = await result.json();
        return json(data);
    } catch (error) {
        console.error("POST error", error);
        return json({ error: 'Failed to create admin' }, { status: 500 });
    }
}

export const PUT: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        console.log("PUT body", body);
        
        const result = await fetch(`${API_BASE_URL}/popups`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        
        const data = await result.json();
        return json(data);
    } catch (error) {
        console.error("PUT error", error);
        return json({ error: 'Failed to update popup' }, { status: 500 });
    }
}

export const DELETE: RequestHandler = async ({ request }) => {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    console.log("id",id)
    const result = await fetch(`${API_BASE_URL}/popups/${id}`, {
        method: "DELETE",
    });
    const data = await result.json();
    return json(data);
}