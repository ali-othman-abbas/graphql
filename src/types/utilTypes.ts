export type Repeat<T, N extends number, R extends T[] = []> = 
  R['length'] extends N ? R : Repeat<T, N, [T, ...R]>;