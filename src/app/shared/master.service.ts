import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BlogModel, Blogs } from './store/Blog/Blog.model';
import { Store } from '@ngrx/store';
import { getblog } from './store/Blog/Blog.selector';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient, private store:Store) { }

  GetAllBlogs():Observable<BlogModel[]>{
    return this.http.get<BlogModel[]>("http://localhost:3000/Blogs");
  }

  CreateBlog(bloginput: BlogModel){
    
    return this.http.post<BlogModel>("http://localhost:3000/Blogs",bloginput).pipe(
      tap(()=>{
        this.http.get<BlogModel>("http://localhost:3000/Blogs?_limit=1&_sort=id&_order=desc");
      })
    );
  }

  UpdateBlog(bloginput:BlogModel){
    console.log(bloginput);
    return this.http.put<BlogModel>("http://localhost:3000/Blogs/"+bloginput.id,bloginput);
  }

  DeleteBlog(blogid: string){
    return this.http.delete<BlogModel>("http://localhost:3000/Blogs/"+blogid);
  }
}
