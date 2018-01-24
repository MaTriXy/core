import { Component, Input, ViewChild } from '@angular/core';
import { User } from '@rucken/core';
import { Group } from '@rucken/core';
import { UserGroup } from '@rucken/core';
import { translate } from '@rucken/core';

import { BaseModalComponent } from '../../../base/base-modal/base-modal.component';
import { TextInputComponent } from './../../../controls/text-input/text-input.component';
import { UserGroupsGridComponent } from './../../user-groups-grid/user-groups-grid.component';

@Component({
  selector: 'account-profile-form',
  templateUrl: './account-profile-form.component.html'
})

export class AccountProfileFormComponent extends BaseModalComponent {

  @ViewChild('focusElement')
  focusElement: TextInputComponent;
  @ViewChild('userGroups')
  userGroups: UserGroupsGridComponent;

  @Input()
  okTitle = translate('Update');
  @Input()
  class = '';
  @Input()
  readonly?: boolean;
  @Input()
  hideOnClose?: boolean;
  @Input()
  title = '';
  @Input()
  item: any | User = new User();
  @Input()
  modelMeta: any = User.meta();

  init() {
    super.init();
    if (this.userGroups) {
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
  }
  afterCreate() {
    super.afterCreate();
    if (this.readonly === undefined) {
      this.readonly = false;
    }
    if (this.hideOnClose === undefined) {
      this.hideOnClose = true;
    }
  }

  cancel() {
    this.onClose.emit(this);
    return false;
  }
  ok() {
    if (this.userGroups) {
      this.item.groups = this.userGroups.mockedItems ?
        this.userGroups.mockedItems.map((userGroup: UserGroup) => userGroup.group) : [];
    }
    this.onOk.emit(this.item);
    return false;
  }
}
