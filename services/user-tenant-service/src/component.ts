﻿// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {
  Application,
  Binding,
  Component,
  config,
  ContextTags,
  ControllerClass,
  CoreBindings,
  inject,
  injectable,
  ProviderMap,
} from '@loopback/core';
import {Class, Model, Repository} from '@loopback/repository';
import {CoreComponent} from '@sourceloop/core';
import {
  GroupController,
  HomePageController,
  PingController,
  RoleController,
  RoleUserTenantController,
  TenantController,
  TenantUserController,
  UserGroupController,
  UserGroupsController,
  UserSignupController,
  UserTenantController,
  UserTenantPrefsController,
} from './controllers';
import {UserTenantServiceComponentBindings} from './keys';
import {
  AuditLog,
  AuthClient,
  Group,
  GroupUserCountView,
  Role,
  Tenant,
  TenantConfig,
  User,
  UserCredentials,
  UserDto,
  UserGroup,
  UserGroupView,
  UserLevelPermission,
  UserSignupCheckDto,
  UserTenant,
  UserTenantPrefs,
  UserView,
} from './models';
import {
  AuditLogRepository,
  AuthClientRepository,
  GroupRepository,
  NonRestrictedUserViewRepository,
  RoleRepository,
  TenantConfigRepository,
  TenantRepository,
  UserCredentialsRepository,
  UserGroupCountViewRepository,
  UserGroupRepository,
  UserGroupViewRepository,
  UserLevelPermissionRepository,
  UserRepository,
  UserTenantPrefsRepository,
  UserTenantRepository,
  UserViewRepository,
} from './repositories';
import {
  DEFAULT_USER_TENANT_SERVICE_OPTIONS,
  UserTenantServiceComponentOptions,
} from './types';

// Configure the binding for UserTenantServiceComponent
@injectable({
  tags: {[ContextTags.KEY]: UserTenantServiceComponentBindings.COMPONENT},
})
export class UserTenantServiceComponent implements Component {
  repositories?: Class<Repository<Model>>[];

  /**
   * An optional list of Model classes to bind for dependency injection
   * via `app.model()` API.
   */
  models?: Class<Model>[];

  /**
   * An array of controller classes
   */
  controllers?: ControllerClass[];
  bindings?: Binding[] = [];
  providers?: ProviderMap = {};
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private readonly application: Application,
    @config()
    private readonly options: UserTenantServiceComponentOptions = DEFAULT_USER_TENANT_SERVICE_OPTIONS,
  ) {
    this.bindings = [];
    this.application.component(CoreComponent);
    this.models = [
      AuthClient,
      AuditLog,
      GroupUserCountView,
      UserGroupView,
      Group,
      Role,
      TenantConfig,
      Tenant,
      UserCredentials,
      UserDto,
      UserGroup,
      UserLevelPermission,
      UserSignupCheckDto,
      UserTenantPrefs,
      UserTenant,
      UserView,
      User,
    ];
    this.controllers = [
      GroupController,
      HomePageController,
      PingController,
      RoleUserTenantController,
      RoleController,
      TenantUserController,
      TenantController,
      UserGroupController,
      UserGroupsController,
      UserSignupController,
      UserTenantPrefsController,
      UserTenantController,
    ];
    this.repositories = [
      AuthClientRepository,
      AuditLogRepository,
      UserGroupCountViewRepository,
      GroupRepository,
      NonRestrictedUserViewRepository,
      RoleRepository,
      TenantConfigRepository,
      TenantRepository,
      UserCredentialsRepository,
      UserGroupViewRepository,
      UserGroupRepository,
      UserLevelPermissionRepository,
      UserTenantPrefsRepository,
      UserTenantRepository,
      UserViewRepository,
      UserRepository,
    ];
  }
}
