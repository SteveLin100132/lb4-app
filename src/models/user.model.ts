import { Entity, hasOne, model, property } from '@loopback/repository';
import { UserCredential } from './user-credential.model';

@model({
  name: 'user'
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    updateOnly: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  realm?: string;

  @hasOne(() => UserCredential)
  userCredential: UserCredential;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
