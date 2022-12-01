const INIT_STATE = {
    SearchItems:[]
   
    
};


export const cartreducer2 = (state = INIT_STATE, action) => {
    switch (action.type) {

        case "RMV_SEARCH":

                return {SearchItems:action.payload}
        
       
           
        

        default:
            return state
    }
}