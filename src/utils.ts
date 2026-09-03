import { router } from "./main";
import { getToken, removeToken } from "./store";
import type { Query } from "./types/payload";

export function must<T>(param: T | null | undefined): T {
  if (param === null || param === undefined) {
    throw new Error("object is null or undefined")
  }
  return param
}

export function htmlify(strEl: string): DocumentFragment {
  const template = document.createElement("template");
  template.innerHTML = strEl.trim();
  return template.content
}

export async function deal<T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> {
    try {
        const res = await promise
        return [res, null]
    } catch (err) {
        return [null, err as Error]
    }
}

export async function fetchGraph<T>(query: string): Promise<[T, null] | [null, Error]> {
    const token = getToken()
    if (!token) {
      router()
      return [{} as T, null]
    }
    const [res, err] = await deal(fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: query
        } as Query)
    }))
    if (err) {
        return [null, err]
    }
    const json = await res.json()
    switch (res.status) {
        case 401:
        case 403:
            removeToken()
            router()
            return [json, null]
        case 200:
            return [json, null]
        default:
          throw new Error(JSON.stringify(json))
    }
}