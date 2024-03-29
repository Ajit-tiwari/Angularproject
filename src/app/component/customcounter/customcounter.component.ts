import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { customincrement } from '../../shared/store/counter.actions';
import { CounterModel } from '../../shared/store/counter.model';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrl: './customcounter.component.css'
})
export class CustomcounterComponent {
  constructor(private store: Store<{ counter: CounterModel }>) {

  }
  actiontype: string = 'add';
  counterinput!: number;
  OnCustomIncrement() {
    this.store.dispatch(customincrement({value: +this.counterinput, action: this.actiontype}));
  }
}
