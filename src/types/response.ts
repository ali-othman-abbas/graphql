import type { Repeat } from "./utilTypes"

type Table = 'transaction' | 'user' | 'progress' | 'group' | 'groups'
type Operation = 'sum' | 'count'

type Aggregate<T extends Table, Op extends Operation, Shape extends Record<string, any> | undefined = undefined> = {
    [K in T as `${K}_aggregate`]: {
        'aggregate': {
            [K in Op as `${K}`]:
            Op extends 'count'
            ? Shape extends undefined
            ? number
            : "Error: count doesn't have a shape"
            : Shape extends Record<string, any>
            ? Shape
            : "Error: shape wasn't provided for a shapeful operation"
        }
    }
}

type Retrieve<T extends Table, Shape extends Record<string, any>, Limit extends number | undefined = undefined> = {
  [K in T as `${K}`]: Limit extends number ? Repeat<Shape, Limit>: Array<Shape>
}


export type ErrorResponse = {
    error: string
}

export type GraphqlRes<T extends Record<string, any>> = {
    data: T
}

export type User = Retrieve<'user',{
    login: string
    attrs: {
        email: string
        genders: string
    }
}, 1>

export type TotalProjects = Aggregate<"progress", "count">

export type TotalXp = Aggregate<"transaction", "sum", {
    amount: number
}>

export type Level = Retrieve<'transaction', {
    amount: number
}, 1>

export type temp = Retrieve<"groups",{
  group: {
      object: {
          name: string
      }
      members: {
          userLogin: string
      }[]
  }
}, 1>
export type LastProjectCompleted = Retrieve<'user', Retrieve<"groups",{
  group: {
      object: {
          name: string
      }
      members: {
          userLogin: string
      }[]
  }
}, 1>, 1>



export type AuditRatioSum =
  Aggregate<'transaction', 'sum', {
    amount: number
  }>


export type ProgressCount = Aggregate<'progress', 'count'>