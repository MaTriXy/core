import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from '@rucken/core';
import { Group } from '@rucken/core';
import { UserGroup } from '@rucken/core';
import { translate } from '@rucken/core';
import { EndpointStatusEnum } from '@rucken/core';

import { BaseComponent } from './../../../base/base-component/base-component.component';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { UserGroupsGridComponent } from './../../user-groups-grid/user-groups-grid.component';

@Component({
  selector: 'account-profile-form',
  templateUrl: './account-profile-form.component.html',
  styleUrls: ['./account-profile-form.component.scss']
})

export class AccountProfileFormComponent extends BaseComponent {

  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @ViewChild('userGroups')
  userGroups: UserGroupsGridComponent;

  @Input()
  text = translate('Update');
  @Input()
  class = '';
  @Input()
  readonly = false;
  @Input()
  hideOnClose?= true;
  @Input()
  account: any | User = null;
  @Input()
  title = '';
  @Input()
  item: any | User = new User();
  @Input()
  modelMeta: any = User.meta();
  @Input()
  okInProcess = false;
  @Output()
  onCancel: EventEmitter<AccountProfileFormComponent | any> = new EventEmitter();
  @Output()
  onSave: EventEmitter<AccountProfileFormComponent | any> = new EventEmitter();

  init() {
    this.userGroups.user = this.item;
    this.userGroups.mockedItems =
      this.item.groups.map((group: any | Group) => {
        return new UserGroup({
          id: group.pk,
          group: group
        });
      });
    this.userGroups.search();
  }

  cancel() {
    this.onCancel.emit(this);
    return false;
  }
  save() {
    this.item.groups =
      this.userGroups.mockedItems.map((userGroup: UserGroup) => userGroup.group);
    this.onSave.emit(this.item);
    return false;
  }
  okInProcessFromStatus(status: EndpointStatusEnum) {
    this.okInProcess =
      status === EndpointStatusEnum.Creating ||
      status === EndpointStatusEnum.Updating ||
      status === EndpointStatusEnum.Removing ||
      status === EndpointStatusEnum.Processing ||
      status === EndpointStatusEnum.Loading;
  }
}