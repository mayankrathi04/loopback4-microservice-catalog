﻿// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {model, property} from '@loopback/repository';
import {CoreEntity} from '@sourceloop/core';

@model({settings: {strict: false}})
export class Queries extends CoreEntity<Queries> {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    name: 'queryType',
  })
  queryType: string;

  @property({
    type: 'object',
    required: true,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any; //NOSONAR

  @property({
    type: 'array',
    itemType: 'number',
    name: 'permittedRoles',
  })
  permittedRoles?: number[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any; //NOSONAR
}

export type QueriesWithRelations = Queries;
