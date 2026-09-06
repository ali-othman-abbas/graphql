export const completedProjectCount = `
  {
    progress_aggregate(
    	where:{
        _and:[
          {path:{_ilike:"%/bh-module/%"}}
          {_not:{path:{_ilike:"%/checkpoint%"}}}
          {_not:{path:{_ilike:"%/piscine-js%"}}}
          {_not:{path:{_ilike:"%/piscine-rust%"}}}
          {isDone:{_eq:true}}
        ]
      }
    ){
      aggregate{
        count
      }
    }
  }
`

export const userInfo = `
  {
    user {
      login
      attrs
    }
  }
`

export const totalXp = `
  {
    transaction_aggregate(
      where: {
        _and:[
          {type:{_eq:"xp"}}
          {path:{_ilike:"%/bh-module/%"}} 	
          {_not:{path:{_ilike:"%/piscine-js/%"}}}
          {_not:{path:{_ilike:"%/piscine-rust/%"}}}
        ]
      }
      order_by:{createdAt:desc}
    ) {
      aggregate{
        sum{amount}
      }
    }
  }
`

export const level = `
  {
    transaction(
      where: {
        _and:[
          {type:{_eq:"level"}}
          {path:{_ilike:"%/bh-module/%"}} 	
          {_not:{path:{_ilike:"%/piscine-js/%"}}}
          {_not:{path:{_ilike:"%/piscine-rust/%"}}}
        ]
      }
      order_by:{
        amount:desc
        createdAt:desc
      }
      limit:1
    ) {
      user {
        login
      }
      path
      amount
    	type
    }
  }
`