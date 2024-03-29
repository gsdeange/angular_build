import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  id: number;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false; 
      }
    );
    this.route.fragment.subscribe();
    this.id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.id);
    //TODO: subscribe to route params to update the id if params changes
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    //logic to decide if we can leave the page or not
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.serverName || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes? ');
    } else {
      return true;
    }
  }

}
