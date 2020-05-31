export function signUser(data: FormData) {
  return fetch('api/users/sessions.json', {
    method: 'POST',
    body: data
  }).then((r) => {
    if (r.status === 401) {
      throw {body: "Wrong credentials"};
    }
    return r.json();
  });
}

export function checkAuth() {
  return fetch('/api/users/sessions.json').then((r) => {
    if (r.status === 401) {
      throw {body: "No auth"};
    }
    return r.json();
  });
}

export function logout(){
  return fetch('/api/users/sessions.json', {method: "DELETE"})
}

export function addPost(data: FormData) {
  return fetch('api/posts', {
    method: 'POST',
    body: data
  }).then((r) => {
    if (r.status === 401) {
      throw {body: "Wrong credentials"};
    }
    return r.json();
  });
}

export function getPosts(){
  return fetch('/api/posts.json').then(r => r.json())
}

export function setLike(post_id: number){
  return fetch(`/api/posts/${post_id}/like_it`, {method: "POST"}).then(r => r.json())
}

export function setDisLike(post_id: number){
  return fetch(`/api/posts/${post_id}/dislike_it`, {method: "POST"}).then(r => r.json())
}

export function uploadImage(data: FormData) {
  return fetch('/api/posts.json', {
    method: "POST",
    body: data
  }).then(r => r.json())
}

// export function 