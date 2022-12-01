import {combineReducers} from "redux";
import { cartreducer2 } from "./reducer2";
import { cartreducer } from "./reducer";


const rootred = combineReducers({
    cartreducer,
    cartreducer2
    
});


export default rootred