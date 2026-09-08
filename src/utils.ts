import { navigate } from "./router";
import { getToken, removeToken } from "./store";
import type { Query } from "./types/payload";
import type { GraphqlRes } from "./types/response";

export function must<T>(param: T | null | undefined): T {
  if (param === null || param === undefined) {
    throw new Error("object is null or undefined")
  }
  return param
}

export function htmlify(strEl: string): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = strEl.trim();
  return template.content.firstElementChild as HTMLElement
}

export async function deal<T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> {
    try {
        const res = await promise
        return [res, null]
    } catch (err) {
        return [null, err as Error]
    }
}

export async function fetchGraph<T extends Record<string, any>>(query: string): Promise<[T, null] | [null, Error]> {
    const token = getToken()
    if (!token) {
      navigate("/login")
      return [{} as T, null]
    }
    console.log({
      exists: !!token,
      type: typeof token,
      parts: token?.split(".").length,
      prefix: token?.slice(0, 10),
    })
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
            navigate("/login")
            return [json, null]
        case 200:
          console.log(json)
            return [(json as GraphqlRes<T>).data, null]
        default:
          throw new Error(JSON.stringify(json))
    }
}


export function degreeToRadian(degree: number) {
    return degree * Math.PI/180
}

export function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle)
  };
}