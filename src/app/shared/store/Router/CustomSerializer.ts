import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

export interface RouterStateModel{
    url: string,
    params: Params,
    queryParams: Params
}

export class Customserializer implements RouterStateSerializer<RouterStateModel>{
     serialize(routerState: RouterStateSnapshot): RouterStateModel {
        let route = routerState.root;

        while(route.firstChild){
            route=route.firstChild;
        }

        const {
            url,
            root: {queryParams}
        } = routerState;
        const {params}=route;

        return {url,queryParams,params};
    }
    
}