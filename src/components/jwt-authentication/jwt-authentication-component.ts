import { registerAuthenticationStrategy } from '@loopback/authentication';
import { Application, Binding, Component, CoreBindings, inject } from '@loopback/core';
import { UserService } from '../../services/user.service';
import { TokenServiceBindings, TokenServiceConstants, UserServiceBindings } from './keys';
import { JwtAuthenticationStrategy } from './services/jwt.auth.strategy';
import { JwtService } from './services/jwt.service';

export class JwtAuthenticationComponent implements Component {
  bindings: Binding[] = [
    Binding.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    ),
    Binding.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    ),
    Binding.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JwtService),
    Binding.bind(UserServiceBindings.USER_SERVICE).toClass(UserService),
  ];
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    registerAuthenticationStrategy(app, JwtAuthenticationStrategy);
  }
}
