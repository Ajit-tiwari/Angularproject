import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogModel, Blogs } from '../../shared/store/Blog/Blog.model';
import { getblog, getbloginfo } from '../../shared/store/Blog/Blog.selector';
import { AppStateModel } from '../../shared/store/Global/AppStateModel';
import { MatDialog } from '@angular/material/dialog';
import { AddblogComponent } from '../addblog/addblog.component';
import { deleteblog, loadblog } from '../../shared/store/Blog/Blog.action';
import { loadspinner } from '../../shared/store/Global/App.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  bloglist!:BlogModel[];
  bloginfo!:Blogs;

  // constructor(private store:Store<{blog:BlogModel[]}>){}
  constructor(private store:Store<AppStateModel>, private dialog:MatDialog, private router:Router){}
  
  ngOnInit(): void {
    this.store.dispatch(loadspinner({isloaded:true}));
    setTimeout(()=>{
      this.store.dispatch(loadblog());
      this.store.dispatch(loadspinner({isloaded:false}));
    },1000);

    this.store.select(getbloginfo).subscribe((item)=>{
      this.bloginfo = item;
    });
    
  }

  AddBlog(){
    this.OpenPopup((this.bloginfo.bloglist.length + 1).toString(),'Add Blog');
  }

  EditBlog(id:string){
    console.log(id);
    this.OpenPopup(id,'Edit Blog',true);
  }

  DeleteBlog(id:string){
    if(confirm("Are you sure want to remove?")){
      this.store.dispatch(loadspinner({isloaded:true}));
      setTimeout(()=>{
        this.store.dispatch(deleteblog({id:id}));
      },2000)
      
    }
  }

  OpenPopup(id:string,title: string, isedit:boolean=false){
    this.dialog.open(AddblogComponent,{
      width:'40%',
      data: {
        id:id,
        title: title,
        isedit: isedit
      }
    });
  }
}
