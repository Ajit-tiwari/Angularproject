import { Injectable } from "@angular/core";
import { MasterService } from "../../master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOAD_BLOG, addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./Blog.action";
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { BlogModel } from "./Blog.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SHOW_ALERT, emptyaction, loadspinner, showalert } from "../Global/App.action";

@Injectable()
export class BlogEffects{
    constructor(
        private actions:Actions,
        private service: MasterService,
        private snackbar:MatSnackBar
        ){}

    _loadblog = createEffect(()=>
        this.actions.pipe(
            ofType(loadblog),
            exhaustMap((action)=>{
                return this.service.GetAllBlogs().pipe(
                    map((data)=>{
                        return loadblogsuccess({bloglist:data});
                    }),
                    catchError((_error)=>of(loadblogfail({errorText: _error.message}),loadspinner({isloaded: false})))
                )
            })
        )
    );
    
    _addblog = createEffect(()=>
        this.actions.pipe(
            ofType(addblog),
            switchMap(action=>{
                return this.service.CreateBlog(action.bloginput).pipe(
                    switchMap((data)=> of(
                        addblogsuccess({bloginput:data as BlogModel}),
                        loadspinner({isloaded:false}),
                        showalert({message: 'Record Updated',actionresult: 'pass'})
                    )),
                    catchError((_error)=>of(showalert({message: 'Error Occured :' + _error.message,actionresult:'fail'}),loadspinner({isloaded: false})))
                )
            })
        )
    );
    
    // if we have to execute one action at a time we can go with exhaustMap else we have to use switchMap for dispatching multiple actions
    // _updateblog = createEffect(()=>
    //     this.actions.pipe(
    //         ofType(updateblog),
    //         exhaustMap(action=>{
    //             return this.service.UpdateBlog(action.bloginput).pipe(
    //                 map((data)=>{
    //                     return updateblogsuccess({bloginput: action.bloginput});
    //                 }),
    //                 catchError((_error)=>of(loadblogfail({errorText:_error}),loadspinner({isloaded: false})))
    //             )
    //         })
    //     )
    // );

    _updateblog = createEffect(()=>
        this.actions.pipe(
            ofType(updateblog),
            switchMap(action=>{
                return this.service.UpdateBlog(action.bloginput).pipe(
                    switchMap((data)=>of(
                        updateblogsuccess({bloginput: action.bloginput}),
                        loadspinner({isloaded:false}),
                        showalert({message: 'Updated Successfully.',actionresult: 'pass'})
                    )),
                    catchError((_error)=>of(showalert({message: 'Update failed due to : '+_error.message, actionresult: 'fail'}),loadspinner({isloaded: false})))
                )
            })
        )
    );
    
    _deleteblog = createEffect(()=>
        this.actions.pipe(
            ofType(deleteblog),
            switchMap(action=>{
                return this.service.DeleteBlog(action.id).pipe(
                    switchMap((data)=>of(
                        deleteblogsuccess({id:action.id}),
                        loadspinner({isloaded:false}),
                        showalert({message: 'Deleted Successfully',actionresult: 'pass'})
                        
                    )),
                    catchError((_error)=>of(showalert({message: 'Failed to delete due to : '+_error.message,actionresult: 'fail'}),loadspinner({isloaded: false})))
                )
            })
        )
    );

    
}