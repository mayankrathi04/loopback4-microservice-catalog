import {inject, Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {AuthenticateErrorKeys, ILogger, LOGGER} from '@sourceloop/core';
import {verify} from 'jsonwebtoken';
import {VerifyFunction} from 'loopback4-authentication';
import moment from 'moment-timezone';

import {RevokedTokenRepository} from '../../../repositories';
import {AuthUser} from '../models/auth-user.model';

export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn> {
  constructor(
    @repository(RevokedTokenRepository)
    public revokedTokenRepository: RevokedTokenRepository,
    @inject(LOGGER.LOGGER_INJECT) public logger: ILogger,
  ) {}

  value(): VerifyFunction.BearerFn {
    return async (token, req) => {
      const isRevoked = await this.revokedTokenRepository.get(token);
      if (isRevoked?.token) {
        throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.TokenRevoked);
      }

      let user: AuthUser;
      try {
        user = verify(token, process.env.JWT_SECRET as string, {
          issuer: process.env.JWT_ISSUER,
        }) as AuthUser;
      } catch (error) {
        this.logger.error(JSON.stringify(error));
        throw new HttpErrors.Unauthorized('TokenExpired');
      }

      if (
        user.passwordExpiryTime &&
        moment().isSameOrAfter(moment(user.passwordExpiryTime))
      ) {
        throw new HttpErrors.Unauthorized(
          AuthenticateErrorKeys.PasswordExpiryError,
        );
      }
      return user;
    };
  }
}
