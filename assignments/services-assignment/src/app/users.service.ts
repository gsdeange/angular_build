import { Injectable } from '@angular/core';
import { CountService } from './count.service';

@Injectable()
export class UsersService{
   activeUsers = ['Max', 'Anna'];
   inactiveUsers = ['Chris', 'Manu'];

   constructor(private countService: CountService){}

   setToActive(id: number){
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
      //log count here
      this.countService.incrementInactiveToActiveCounter();
   }

   setToInactive(id: number) {
      this.inactiveUsers.push(this.activeUsers[id]);
      this.activeUsers.splice(id, 1);
      //log count here
      this.countService.incrementActiveToInactive();
   }
}