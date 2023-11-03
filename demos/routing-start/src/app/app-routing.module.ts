import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
   { path: '', component: HomeComponent},
   { path: 'users', component: UsersComponent, children: [
     { path: ':id/:name', component: UserComponent}, //:id specifies that anything can follow the slash
   ]},
   { path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
     { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
     { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]} //runs the deactivate guard everytime it runs
   ]},
   //{path: 'not-found', component: PageNotFoundComponent},
   {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page Not Found!'}},
   {path: '**', redirectTo: '/not-found'} //catch all paths you don't know w/ wildcard. Make sure at bottom!
 ];

@NgModule({
   imports: [
      //useHash -> true informs the webserver to ignore the part after #, helpful for servers that don't return index.html with 404
      //RouterModule.forRoot(appRoutes, {useHash: false}),
      RouterModule.forRoot(appRoutes),
   ],
   exports: [
      RouterModule
   ]
})
//use this class to contain all the routing logic outside of your app.module
export class AppRoutingModule {

}