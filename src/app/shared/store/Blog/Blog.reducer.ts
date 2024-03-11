import { createReducer, on } from "@ngrx/store";
import { BlogState } from "./Blog.state";
import { addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./Blog.action";

const _blogreducer = createReducer(BlogState,
    on(loadblog,(state)=>{
        return {
            ...state
        };
    }),
    on(loadblogsuccess,(state,action)=>{
        
        return {
            ...state,
            bloglist: [...action.bloglist],
            errorMessage: ''
        }
    }),
    on(loadblogfail,(state,action)=>{
        
        return {
            ...state,
            bloglist: [],
            errorMessage: action.errorText
        }
    }),
    // on(addblog,(state,action)=>{
    //     const _blog = {...action.bloginput};
    //     _blog.id = state.bloglist.length + 1;
    //     return {
    //         ...state,
    //         bloglist: [...state.bloglist,_blog]
    //     }
    // }),
    on(addblogsuccess,(state,action)=>{
        const _blog = {...action.bloginput};
        
        return {
            ...state,
            bloglist: [...state.bloglist,_blog]
        }
    }),
    // on(updateblog,(state,action)=>{
    //     const _blog = {...action.bloginput};
    //     const updatedblog = state.bloglist.map((blog)=>{
    //         return _blog.id===blog.id?_blog:blog;
    //     });
    //     console.log("Update Blog List => ",updateblog);

    //     return {
    //         ...state,
    //         bloglist: updatedblog
    //     }
    // }),
    on(updateblogsuccess,(state,action)=>{
        const _blog = {...action.bloginput};
        const updatedblog = state.bloglist.map((blog)=>{
            return _blog.id===blog.id?_blog:blog;
        });
        console.log("Update Blog List => ",updateblog);

        return {
            ...state,
            bloglist: updatedblog
        }
    }),
    // on(deleteblog,(state,action)=>{
    //     const id = action.id;
    //     const updatedbloglist = state.bloglist.filter((blog)=>{
    //         return blog.id !== id;
    //     });

    //     return {
    //         ...state,
    //         bloglist: updatedbloglist
    //     };
    // }),
    on(deleteblogsuccess,(state,action)=>{
        const id = action.id;
        const updatedbloglist = state.bloglist.filter((blog)=>{
            return blog.id !== id;
        });

        return {
            ...state,
            bloglist: updatedbloglist
        };
    })
)

export function blogReducer(state:any, action:any){
    return _blogreducer(state,action);
}