export const completedProjectCount = `
  {
    progress_aggregate(
    	where:{
        _and:[
          {path:{_ilike:"%/bh-module/%"}}
          {_not:{path:{_ilike:"%/checkpoint%"}}}
          {_not:{path:{_ilike:"%/piscine-js%"}}}
          {_not:{path:{_ilike:"%/piscine-rust%"}}}
          {grade:{_gte:1}}
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

export const lastCompletedProject = `
  {
    user{
      groups(
        where: {
          _and:[
            {group:{status:{_eq: finished}}}
            {path:{_ilike:"%/bh-module/%"}} 	
            {_not:{path:{_ilike:"%/piscine-js/%"}}}
            {_not:{path:{_ilike:"%/piscine-rust/%"}}}
          ]
        }
        order_by:{createdAt:desc}
        limit:1
      ){
        group{
          object{
            name
          }
          members{
            userLogin
          }
        }
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

export const totalAuditRatioUp = `
  {
    transaction_aggregate(
      where: {type:{_eq:"up"}}
      order_by:{createdAt:desc}
    ) {
    	aggregate {
      	sum {
        	amount
      	}
    	}
    }
  }
`

export const totalAuditRatioDown = `
  {
    transaction_aggregate(
      where: {type:{_eq:"down"}}
      order_by:{createdAt:desc}
    ) {
    	aggregate {
      	sum {
        	amount
      	}
    	}
    }
  }
`

export const totalFails = `
  {
    progress_aggregate(
    	where:{
        _and:[
          {path:{_ilike:"%/bh-module/%"}}
          {_not:{path:{_ilike:"%/checkpoint%"}}}
          {_not:{path:{_ilike:"%/piscine-js%"}}}
          {_not:{path:{_ilike:"%/piscine-rust%"}}}
          {grade:{_eq:0}}
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