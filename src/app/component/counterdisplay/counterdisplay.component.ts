import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getcounter } from '../../shared/store/counter.selector';
import { AppStateModel } from '../../shared/store/Global/AppStateModel';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent implements OnInit, OnDestroy{
  countersubscribe!: Subscription;
  counterdisplay!: number;  
  // constructor(private store: Store<{counter:CounterModel}>){}
    constructor(private store:Store<AppStateModel>){}
  ngOnDestroy(): void {
    if(this.countersubscribe){
      this.countersubscribe.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.countersubscribe = this.store.select(getcounter).subscribe(data => {
      this.counterdisplay = data;
    });
  }
    
    
}
