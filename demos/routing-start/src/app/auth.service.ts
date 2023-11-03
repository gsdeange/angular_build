export class AuthService {
   //might reach out to server, login/logout
   loggedIn = false;

   isAuthenticated() : Promise<any>{
      const promise = new Promise (
         (resolve, reject) => {
            setTimeout(() => {
               resolve(this.loggedIn)
            }, 800);
         }
      );
      return promise;
   }

   login() {
      this.loggedIn = true;
   }
   logout() {
      this.loggedIn = false;
   }
}