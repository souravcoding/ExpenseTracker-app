initial_state={
    user:null,
    income:null,
    expense:0,
    items:[],
    pieChartData:[],
    barChartData:[]
}

export const Reducer=(state=initial_state,action)=>{
    switch (action.type) {
        case 'SET_INCOME':
            return {
                ...state,
                income:action.income
            }
        case 'SET_ITEMS':
            return {
                ...state,
                items:action.items,
                expense:action.expense,
                pieChartData:action.pieData,
                barChartData:action.barData
            }
        case 'GET_USER':
            return {
                ...state,
                user:action.user
            }
        case 'RESET_DATA':
            return {
                ...state,
                 income:null,
                expense:0,
                items:[],
                pieChartData:[],
                barChartData:[]
            }
        case "LOGOUT":
            return {
                ...state,
                expense:0,
                items:[],
                pieChartData:[],
                barChartData:[]
            }
        case 'CLEAR':
            return initial_state
        default:
            return state
         }
}
