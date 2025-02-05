﻿// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {model, property} from '@loopback/repository';
import {CoreEntity, ExternalIdentifierEnabledEntity} from '@sourceloop/core';

/**
 * Audit Logs Model
 * @deprecated Use the {@link AuditLog} instead.
 * eg.
 * ```ts
 * class AuditLogRepository extends DefaultCrudRepository<
 * AuditLog,
 * typeof AuditLog.prototype.id
 * >
 * {
 *    // ...
 * }
 * ```
 */

@model({
  name: 'audit_logs',
})
export class AuditLogs
  extends CoreEntity<AuditLogs>
  implements ExternalIdentifierEnabledEntity
{
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  action: string;

  @property({
    type: 'string',
    required: true,
    name: 'action_type',
  })
  actionType: string;

  @property({
    type: 'string',
  })
  actor?: string;

  @property({
    type: 'date',
    name: 'acted_at',
  })
  actedAt?: string;

  @property({
    type: 'string',
    name: 'acted_entity',
  })
  actedEntity: string;

  @property({
    type: 'object',
  })
  before?: object;

  @property({
    type: 'object',
  })
  after?: object;

  @property({
    type: 'string',
  })
  reference?: string;

  @property({
    type: 'string',
    name: 'ext_id',
  })
  extId?: string;

  @property({
    type: 'object',
    name: 'ext_metadata',
  })
  extMetadata?: object;
}
