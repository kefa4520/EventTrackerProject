import { Component, OnInit } from '@angular/core';
import { CycleService } from 'src/app/services/cycle.service';
import { NgForm } from '@angular/forms';
import { Cycle } from 'src/app/models/cycle';

@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.css']
})
export class CycleListComponent implements OnInit {
  cycles = [];
newCycle: Cycle = new Cycle();
updatedCycle: Cycle = null;


  constructor(private cycleService: CycleService) { }

  ngOnInit(): void {
    this.loadCycles();
  }

  loadCycles(){
this.cycleService.index().subscribe(
cycles => {
  this.cycles = cycles;
},
fail => {
  console.error('loadCycles() method failed in component' + fail);

}
);

  }


  create(cycle: Cycle){
console.log(cycle);

this.cycleService.create(cycle).subscribe(
data => {
  this.newCycle = new Cycle();
  console.log('Successfully created a new log');
  this.loadCycles();
},
fail => {
  console.error('problem with creation in the component level');
}

);

  }

  deleteCycle(id: number){
this.cycleService.destroy(id).subscribe(
  cycles => {
    this.loadCycles();
  },
  fail => {
    console.error('CycleService.deleteCycle()');
    console.error(fail);
  }

);

  }

  edit(cycle: Cycle){
    this.updatedCycle = cycle;
  }

  update(cycle: Cycle){
this.cycleService.update(cycle).subscribe(
  updated => {
    this.loadCycles();
    this.updatedCycle = null;
   },
   failed => {
console.error('CycleListComponent.updateCycle()');
console.error(failed);
   }


);

  }

}
