import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateModel } from "./CustomSerializer";

const getrouterstate = createFeatureSelector<RouterReducerState<RouterStateModel>>('router');

export const getrouterinfo = createSelector(getrouterstate, (state)=>{
    return state.state.params['id'];
})