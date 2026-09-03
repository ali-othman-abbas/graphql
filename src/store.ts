const jwtKey = "token"

export function storeToken(token: string) {
  localStorage.setItem(jwtKey, token)
}

export function getToken() {
  return localStorage.getItem(jwtKey)
}

export function removeToken() {
    localStorage.removeItem(jwtKey)
}
