import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  
  public titulo: string = 'hola';
  public tituloSubs$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { 

    // console.log(route.snapshot.children[0].data)
    this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe( ({titutlo}) => {
                          this.titulo = titutlo;
                          document.title = `AdminPro - ${ titutlo }`;
                        });;
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter( (event:any) => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data ),
    )
    
    // todos argumentos de ruta
    // .subscribe(event => {
    //   console.log(event);
    // })
  }

}
