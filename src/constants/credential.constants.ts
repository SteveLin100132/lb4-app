export namespace CREDENTAIL {
  export type Credentials = {
    username: string;
    password: string;
  };

  export const SCHEMA = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  };

  export const REQUEST_BODY = {
    description: 'The input of login function',
    required: true,
    content: {
      'application/json': { schema: SCHEMA },
    },
  };
}
