import { createReducer, on } from "@ngrx/store";
import { GlobalState } from "./Global.state";
import { loadspinner } from "./App.action";

const _AppReducer = createReducer(GlobalState,
    on(loadspinner,(state,action)=>{
        return {
            ...state,
            isLoaded: action.isloaded
        }
    })
)

export function AppReducer(state:any, action:any){
    return _AppReducer(state,action);
}