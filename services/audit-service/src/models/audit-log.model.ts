﻿// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {model, property} from '@loopback/repository';
import {Action} from '@sourceloop/audit-log';
import {CoreEntity} from '@sourceloop/core';

@model({
  name: 'audit_logs',
  settings: {
    strict: false,
  },
})
export class AuditLog extends CoreEntity<AuditLog> {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  action: Action;

  @property({
    name: 'acted_at',
    type: 'date',
    required: true,
  })
  actedAt: Date;

  @property({
    name: 'acted_on',
    type: 'string',
  })
  actedOn?: string;

  @property({
    name: 'action_key',
    type: 'string',
    required: true,
  })
  actionKey: string;

  @property({
    name: 'entity_id',
    type: 'string',
    required: true,
  })
  entityId: string;

  @property({
    type: 'string',
    required: true,
  })
  actor: string;

  @property({
    type: 'object',
  })
  before?: object;

  @property({
    type: 'object',
  })
  after?: object;

  @property({
    name: 'action_group',
    type: 'string',
  })
  actionGroup?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any; //NOSONAR
}
