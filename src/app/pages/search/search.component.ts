import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  term: string;

  constructor(public activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe(params => {
      const term = params['term'];
      this.term = term;
      console.log(this.term);
    })
  }

  ngOnInit() {
  }


}
