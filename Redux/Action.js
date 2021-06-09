import firebase from 'firebase'
import 'firebase/firestore'


export const getIncome=()=>{
    return (dispatch)=>{
        firebase.firestore()
        .collection('usersIncome')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot(snapshot=>{
            dispatch({
                type:'SET_INCOME',
                income:snapshot.data().income
            })
        })

    }}



export const getItems=()=>{
    return (dispatch,getState)=>{
        
        firebase.firestore()
                .collection('useritems')
                .doc(firebase.auth().currentUser.uid)
                .collection('items')
                .onSnapshot(snapshot=>{
                    let expense=0
                    let data=snapshot.docs.map(item=>{
                        if(item.data().PorL==='loss'){        
                            expense=item.data().cost+expense
                           
                        }
                        return {
                            ...item.data(),
                            id:item.id,                       
                        }
                    })
                    let food=0,clothes=0,funds=0,other=0,tech=0;
                    snapshot.docs.map(item=>{
                       switch (item.data().category) {
                           case 'food':
                               food+=item.data().cost
                               break
                            case 'clothes':
                                clothes+=item.data().cost
                                break
                            case 'funds':
                                funds+=item.data().cost
                                break
                            case 'other':
                                other+=item.data().cost
                                break
                            case 'tech':
                                tech+=item.data().cost
                                break

                           default:
                               break;
                       }
                    })
                    let barData=[{x:'food',y:food},
                    {x:'other',y:other},
                    {x:'tech',y:tech},
                    {x:'clothes',y:clothes},
                    {x:'funds',y:funds}]

                      
                      let pieData=[{label:'food',value:food, color:"grey" },
                      {label:'other',value:other,color: 'orange'},
                      {label:'tech',value:tech,color: 'pink'},
                      {label:'clothes',value:clothes,color:'tomato'},
                      {label:'funds',value:funds,color:'lighblue'}]    
                    
            
                    dispatch({
                        type:"SET_ITEMS",
                        items:data,
                        expense,
                        barData,
                        pieData
                    })
                })
    }
}

export const deleteItem=(id,cost)=>{
    return (dispatch,getState)=>{
        let expense=0
        firebase.firestore()
                .collection('useritems')
                .doc(firebase.auth().currentUser.uid)
                .collection('items')
                .doc(id)
                .delete()

        
               
    }
}

export const getUser=()=>{
    return (dispatch)=>{
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(snapshot=>{
            dispatch({
                type:'GET_USER',
                user:snapshot.data()
            })
        })
    }
}

export const resetData=()=>{
    return (dispatch,getState)=>{
        
        firebase.firestore()
        .collection('usersIncome')
        .doc(firebase.auth().currentUser.uid)
        .update({
            income:null
        })
    }
}

export const LOGOUT=()=>{
    return {
        type:'LOGOUT'
    }
}

export const clearData=()=>{
    return {
        type:'CLEAR'
    }
}