import tokenService from "./tokenService";

const BASE_URL = "http://localhost:3001/api/posts/";

export function create(post){
    return fetch(BASE_URL, {
        method: 'POST',
        body: post,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad Credentials');
    })
}

export function getAll() {
    return fetch (BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad Credentials');
    })
}

export function deletePost(postId) {
    return fetch(`${BASE_URL}delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({ id: postId })
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to delete post');
    })
}

