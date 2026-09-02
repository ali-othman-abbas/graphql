import { parser } from "./shared"

export function must<T>(param: T | null | undefined): T {
  if (param === null || param === undefined) {
    throw new Error("object is null or undefined")
  }
  return param
}

export function htmlify<T extends HTMLElement>(strEl: string): T {
  const doc = parser.parseFromString(strEl.trim(), 'text/html')
  if (doc.querySelector('parseerror')) {
    throw new Error("string contains malformed html")
  }

  return doc.body as T
}