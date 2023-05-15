import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { balanza } from '@app/models/balanza';
import { BalanzaService } from '@app/services/balanza.service';

@Component({
  selector: 'app-balanza',
  templateUrl: './balanza.component.html',
  styleUrls: ['./balanza.component.css']
})
export class BalanzaComponent implements OnInit {

  loading = false;
  submitted = false;
  balanzas:balanza[];
  public balanza:balanza;
  constructor(private route: ActivatedRoute,private router: Router,private svcBalanzas:BalanzaService) {
    svcBalanzas.todas().subscribe(data => {

      this.balanzas =data;
      var retrievedObject = localStorage.getItem('balanza');
      if(retrievedObject){
        this.balanza=JSON.parse(retrievedObject);
      }

    })
}
  enviar() {
    localStorage.setItem('balanza', JSON.stringify(this.balanza));
    this.loading = true;
    this.router.navigate(["naves"]);
  }
  ngOnInit(): void {
  }

}
