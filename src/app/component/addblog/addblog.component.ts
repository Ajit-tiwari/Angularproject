import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogModel } from '../../shared/store/Blog/Blog.model';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../shared/store/Global/AppStateModel';
import { addblog, updateblog } from '../../shared/store/Blog/Blog.action';
import { getblogbyid } from '../../shared/store/Blog/Blog.selector';
import { loadspinner } from '../../shared/store/Global/App.action';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrl: './addblog.component.css'
})
export class AddblogComponent implements OnInit {

  pagetitle:string = '';
  editblogid:string = '';
  editdata!: BlogModel;

  constructor(
    private dialogref: MatDialogRef<AddblogComponent>,
    private builder: FormBuilder,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.pagetitle = this.data.title;
    
    if (this.data.isedit) {
      this.editblogid = this.data.id;
      this.store.select(getblogbyid(this.editblogid)).subscribe((data) => {
        this.editdata = data;
        this.blogform.setValue({
          id: this.editdata.id,
          title: this.editdata.title,
          description: this.editdata.description
        });
      });
    }
  }

  SaveBlogs() {
    if (this.blogform.valid) {
      const bloginput: BlogModel = {
        id: this.data.id,
        title: this.blogform.value.title as string,
        description: this.blogform.value.description as string
      }

      this.store.dispatch(loadspinner({ isloaded: true }));
      setTimeout(() => {
        if (this.data.isedit) {
          bloginput.id = this.blogform.value.id as string;
          this.store.dispatch(updateblog({ bloginput: bloginput }))
        } else {
          this.store.dispatch(addblog({ bloginput: bloginput }));
        }
        this.closepopup();
      }, 2000);
    }
  }

  closepopup() {
    this.dialogref.close();
  }

  //creating form
  blogform = this.builder.group({
    id: this.builder.control(''),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  })
}
