import tokenService from "./tokenService";

const BASE_URL = "http://localhost:3001/api/follows/";

export function follow(userId) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({ userId })
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to follow user');
    });
}

export function unfollow(userId) {
    return fetch(`${BASE_URL}${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to unfollow user');
    });
}

export function getFollowStatus(userId) {
    return fetch(`${BASE_URL}status/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to get follow status');
    });
}