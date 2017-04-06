import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { EndpointHelper } from './helpers/endpoint.helper';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class AppService {
  public component: any;
  public viewContainerRef: ViewContainerRef;
  public currentPageName: string;
  public currentPageTitle: string;
  public endpointHelper: EndpointHelper
  public translate: TranslateService
  private createdModals: any = {};
  constructor(public _router: Router) {
    _router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
  }
  get version() {
    let ver = 'none';
    let metaList = document.getElementsByTagName('meta');
    for (let i = 0; i < metaList.length; i++) {
      let meta = metaList[i];
      if (meta.getAttribute('name') !== null && meta.getAttribute('name').indexOf('version') === 0) {
        ver = meta.getAttribute('content');
      }
    }
    return `${this.translate.instant('Version')}: ${ver}`;
  }
  modals(resolver: ComponentFactoryResolver): any {
    let vm = this;
    return {
      exists(name: string): boolean {
        return vm.createdModals[name] !== undefined;
      },
      create(modal: { new (): any }, name?: string): any {
        let inModal = document.body.classList.contains('modal-open');
        let factory = resolver.resolveComponentFactory(modal);
        let ref = vm.viewContainerRef.createComponent(factory);
        if (name !== undefined) {
          vm.createdModals[name] = ref;
        }
        ref.instance.onClose.subscribe(() => {
          ref.destroy();
          if (name !== undefined) {
            delete vm.createdModals[name];
          }
          if (inModal && !document.body.classList.contains('modal-open')) {
            document.body.classList.add('modal-open');
          }
        });
        ref.instance.modal.config = {};
        return ref.instance;
      }
    };
  }
}
