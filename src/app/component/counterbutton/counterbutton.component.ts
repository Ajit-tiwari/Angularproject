import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../../shared/store/counter.actions';
import { CounterModel } from '../../shared/store/counter.model';


@Component({
  selector: 'app-counterbutton',
  templateUrl: './counterbutton.component.html',
  styleUrl: './counterbutton.component.css'
})
export class CounterbuttonComponent {
  
  //using our store here in constructer
  constructor(private store:Store<{counter:CounterModel}>){

  }
  
  OnIncrement(){
    this.store.dispatch(increment());
  }
  OnDecrement(){
    this.store.dispatch(decrement());
  }
  OnReset(){
    this.store.dispatch(reset());
  }
}
