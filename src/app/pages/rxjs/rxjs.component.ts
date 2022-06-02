import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Observable, retry, take, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    // this.retornObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   (err) => console.warn('Error', err),
    //   () => console.info('Obs terminado')
    // );

    // this.retornaIntervalo()
    //   // .subscribe(
    //   //   (valor) => console.log(valor)
    //   // )
    //       .subscribe( console.log )
    
          this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        map( valor => valor + 1),
        filter( valor => ( valor % 2 === 0) ? true: false),
        take(10),
        );
  }

  retornObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>( observer => {
      
      const intervalo = setInterval(() =>{
        i++;
        observer.next(i);
        if( i === 4 ){
          clearInterval( intervalo );
          observer.complete();
        }

        if( i === 2){
          i=0;
          observer.error('i llego a 2');
        }

      }, 1000)
    });

    return obs$;

  }

}
