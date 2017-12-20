import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { MetaModel } from '../../models/meta.model';
import { IBaseService } from './../interfaces/base-service.interface';


@Injectable()
export class BaseLocalRepositoryService implements IBaseService {

  items$: Subject<any[]>;
  items: any[];
  meta: MetaModel;

  constructor(
    public injector: Injector
  ) {
    this.items = [];
    this.meta = new MetaModel();
    this.meta.curPage = 1;
  }
  calcMeta(totalResults: number) {
    this.meta.totalResults = totalResults;
    this.meta.totalPages = Math.round(totalResults / this.meta.perPage);
  }
  loadAll() {

  }
  localLoadAll(loadedItems: any[]) {
    this.items = loadedItems;
    this.items$.next(this.items);
  }
  localLoad(loadedItem: any) {
    const loadedItems = _.isArray(loadedItem) ? loadedItem : [loadedItem];
    loadedItems.forEach((currentLoadedItem: any) => {
      let notFound = true;
      this.items.forEach((item, index) => {
        if (item.pk === currentLoadedItem.pk) {
          this.items[index] = currentLoadedItem;
          notFound = false;
        }
      });
      if (notFound) {
        this.items.push(currentLoadedItem);
      }
    });
    this.items$.next(this.items);
  }
  localCreate(createdItem: any) {
    this.localUpdate(createdItem);
  }
  localUpdate(updatedItem: any) {
    const updatedItems = _.isArray(updatedItem) ? updatedItem : [updatedItem];
    updatedItems.forEach((currentUpdatedItem: any) => {
      let founded = false;
      this.items.forEach((eachItem: any, i: number) => {
        if (eachItem.pk === currentUpdatedItem.pk) {
          this.items[i] = currentUpdatedItem;
          founded = true;
        }
      });
      if (!founded) {
        this.calcMeta(_.toNumber(this.meta.totalResults) + 1);
        this.items.unshift(currentUpdatedItem);
      }
    });
    this.items$.next(this.items);
  }
  localSave(item: any) {
    if (item.length === undefined && item.pk) {
      return this.localUpdate(item);
    } else {
      return this.localCreate(item);
    }
  }
  localRemove(items: any[]) {
    let keys: any[];
    keys = items.map(d => d.pk);
    this.items.forEach((t, i) => {
      if (keys.indexOf(t.pk) !== -1) { this.items.splice(i, 1); }
    });
    if (this.meta.totalResults > 1 && this.items.length === 0) {
      this.meta.curPage = this.meta.curPage - 1;
      this.loadAll();
      return;
    }
    if (this.meta.totalResults < this.meta.perPage && this.meta.curPage > 1) {
      this.meta.curPage = 1;
      this.loadAll();
      return;
    }
    this.calcMeta(_.toNumber(this.meta.totalResults) - 1);
    this.items$.next(this.items);
  }
}