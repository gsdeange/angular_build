import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

/* This class here contains an example custom validator. 
   - Make sure that the class contains only STATIC methods because you don't want to instantiate the class.

   You can put the custom validator in the Validators array (CustomValidators.invalidProjectName)
*/

export class CustomValidators {
   static invalidProjectName(control: FormControl) : {[s : string]: boolean} {
      if (control.value === 'Test') {
         return {'invalidProjectName' : true};
      }
      return null;
   }

   static asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise((resolve, reject) => {
         setTimeout(() => {
            if (control.value === 'Testproject'){
               resolve({'invalidProjectName': true});
            } else {
               resolve(null);
            }
         }, 2000);
      })
      return promise;
   }
}