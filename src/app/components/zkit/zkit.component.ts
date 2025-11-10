import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZkitService } from '@app/services/zkit.service';

@Component({
  selector: 'app-zkit',
  templateUrl: './zkit.component.html',
  styleUrls: ['./zkit.component.css']
})
export class ZkitComponent implements OnInit {
  zkitItems: String [] = [];
  selectedZkit: String = "";
  loading = false;
  constructor(private zkitService: ZkitService, private router: Router) {
    this.zkitService.getFamilias().subscribe(zk => {
      this.zkitItems = zk;
    });
  }

  ngOnInit(): void {
  }

  enviar(){
    this.loading = true;
    this.router.navigate(["zkitArmado", this.selectedZkit]);
  }

}
