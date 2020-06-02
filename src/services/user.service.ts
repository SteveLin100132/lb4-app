import { UserService as BuiltInUserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { CREDENTAIL } from '../constants/credential.constants';
import { User } from '../models';
import { UserRepository } from '../repositories';

export class UserService
  implements BuiltInUserService<User, CREDENTAIL.Credentials> {
  constructor(
    @repository(UserRepository) public readonly userRepository: UserRepository,
  ) { }

  public async verifyCredentials(
    credentials: CREDENTAIL.Credentials
  ): Promise<User> {
    const invalidCrendentialsError = 'Invalid username or password.';

    const foundUser = await this.userRepository.findOne({
      where: { username: credentials.username },
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCrendentialsError);
    }

    const foundCredentials = await this.userRepository.findCrendentials(
      foundUser.id
    );
    if (!foundCredentials) {
      throw new HttpErrors.Unauthorized(invalidCrendentialsError);
    }

    const matchedPassword = credentials.password === foundCredentials.password;
    if (!matchedPassword) {
      throw new HttpErrors.Unauthorized(invalidCrendentialsError);
    }

    return foundUser;
  }

  public convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.username,
      id: user.id,
      email: user.email,
    };
  }
}
