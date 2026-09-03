
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