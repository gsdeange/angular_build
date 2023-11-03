import { Injectable } from "@angular/core";

@Injectable()
export class CountService{
   activeToInactiveCounter: number = 0;
   inactiveToActiveCounter: number = 0;

   incrementActiveToInactive() {
      this.activeToInactiveCounter++;
      console.log("active -> inactive: " + this.activeToInactiveCounter);
   }

   incrementInactiveToActiveCounter() {
      this.inactiveToActiveCounter++;
      console.log("inactive -> active: " + this.inactiveToActiveCounter);
   }

}