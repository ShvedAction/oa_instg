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