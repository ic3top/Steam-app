import { BehaviorSubject } from 'rxjs';

interface State<T> {
  entities: {
    [key: string]: T
  },
  isLoading: boolean,
}

export abstract class Store<T extends { [key: string]: any }> {
  protected state$ = new BehaviorSubject<State<T>>({
    entities: {},
    isLoading: false,
  });

  protected getState$() {
    return this.state$.asObservable();
  }

  protected setState(newState: any) {
    this.state$.next({ ...this.state$.getValue(), ...newState });
  }
}
