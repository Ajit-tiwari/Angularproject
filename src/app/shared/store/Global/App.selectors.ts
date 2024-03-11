import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateModel } from "./AppStateModel";

const getAppState = createFeatureSelector<AppStateModel>('app');

export const getspinnerstate = createSelector(getAppState,(state)=>{
    return state.isLoaded;
})