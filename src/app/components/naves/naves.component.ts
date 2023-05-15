import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Naves } from '@app/models/naves';
import { NavesService } from '@app/services/naves.service';

@Component({
  selector: 'app-naves',
  templateUrl: './naves.component.html',
  styleUrls: ['./naves.component.css']
})
export class NavesComponent implements OnInit {
  loading = false;
  submitted = false;
  naves:Naves[];
  public nave:Naves;
  constructor(private route: ActivatedRoute,private router: Router,private svcNaves:NavesService) {
    svcNaves.getAll().subscribe(na => {

      this.naves =na;
      var retrievedObject = localStorage.getItem('nave');
      this.nave=JSON.parse(retrievedObject);
    })
}
  enviar() {
    localStorage.setItem('nave', JSON.stringify(this.nave));
    this.loading = true;
    this.router.navigate(["viajes"]);
  }
  ngOnInit(): void {
  }

}
