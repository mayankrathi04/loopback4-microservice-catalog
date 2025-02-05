import {AnyObject, model, property} from '@loopback/repository';
import {CoreEntity} from '@sourceloop/core';

@model({
  name: 'events',
})
export class Event extends CoreEntity<Event> {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    description:
      'An identifier for a particular event queued by a service or a user',
  })
  key: string;

  @property({
    type: 'string',
    required: true,
    description: 'A short description of an event',
  })
  description: string;

  @property({
    type: 'string',
    required: true,
    description: 'Origination of an event- can be a service or from a user',
  })
  source: string;

  @property({
    type: 'object',
    required: true,
    description:
      'A dynamic object that contains information to be run in the workers of a bpmn engine',
  })
  payload: AnyObject;
}
