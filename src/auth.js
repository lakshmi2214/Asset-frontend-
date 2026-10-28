import { Capacitor } from '@capacitor/core';

const hostname = window.location.hostname || 'localhost';
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]' || hostname.startsWith('192.168.');
const isVercel = hostname.includes('vercel.app');

export const API_BASE = isLocalhost
    ? `http://${hostname}:8030`
    : (process.env.REACT_APP_API_URL ||
        (isVercel ? 'https://asset-booking-backend.vercel.app' :
            `https://${hostname.replace('frontend', 'backend')}`));

export function clearTokens() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('standalone_mode');
}

export function getStoredAccessToken() {
    const token = localStorage.getItem('access');
    if (token && typeof token === 'string' && token.includes('.')) {
        return token;
    }
    return null;
}

export function getStoredRefreshToken() {
    const token = localStorage.getItem('refresh');
    if (token && typeof token === 'string' && token.length > 0) {
        return token;
    }
    return null;
}

export async function refreshAccessToken() {
    const refresh = getStoredRefreshToken();
    if (!refresh) return null;

    try {
        const response = await fetch(`${API_BASE}/api/v1/auth/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh }),
        });
        if (!response.ok) {
            clearTokens();
            return null;
        }
        const data = await response.json();
        if (data.access) {
            localStorage.setItem('access', data.access);
            return data.access;
        }
        clearTokens();
        return null;
    } catch (err) {
        clearTokens();
        return null;
    }
}

export async function getValidAccessToken() {
    const current = getStoredAccessToken();
    if (current) return current;
    return await refreshAccessToken();
}

export async function authorizedFetch(url, options = {}, allowRetry = true) {
    const requestOptions = { ...options };
    requestOptions.headers = { ...(options.headers || {}) };

    let token = await getValidAccessToken();
    if (!token) throw new Error('AUTH_REQUIRED');
    requestOptions.headers.Authorization = `Bearer ${token}`;

    let response = await fetch(url, requestOptions);

    if (response.status === 401 && allowRetry) {
        token = await refreshAccessToken();
        if (!token) {
            clearTokens();
            return response;
        }
        requestOptions.headers.Authorization = `Bearer ${token}`;
        response = await fetch(url, requestOptions);
    }
    return response;
}
