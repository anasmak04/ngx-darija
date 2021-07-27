import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { EMPTY, map, Observable, tap } from 'rxjs';

// Generated by https://quicktype.io

export interface SearchHit {
  objectID: string;
  title: string;
  start: string;
  end: string;
  tags: string[];
  session: {
    videoId: string;
    title: string;
    subtitle: string;
    tags: string[];
    category: string;
  };
}

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-wigdet.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWidgetComponent
  extends BaseWidget
  implements OnInit, OnDestroy
{
  @Output() searchHit = new EventEmitter<SearchHit>();
  parentIndex: any;
  results$: Observable<any> = EMPTY;
  query = '';
  state: {
    query: string;
    refine: (value: string) => void;
  } = { query: '', refine: () => {} };
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('SearchBox');
    this.createWidget(connectSearchBox as any, {});
  }

  ngOnInit() {
    super.ngOnInit();
    this.results$ = this.instantSearchInstance.change.pipe(
      tap(({ results }) => {
        this.query = this.state.query;
        console.log({ results });
      }),
      map(({ results }: { results: any }) => results?.hits)
    );
  }

  onQuery(query: string) {
    this.state.refine(query);
  }

  onSearchHit(hit: SearchHit) {
    this.searchHit.emit(hit);
    this.query = '';
  }
}
