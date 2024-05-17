import { DomainError } from '../../common/domain.error';

export class AuthError extends DomainError {
  constructor(name: string, message: string) {
    super(name, message);
  }

  public static AuthorizationHeadersNotProvided(): AuthError {
    return new AuthError(
      'AuthorizationHeadersNotProvided',
      'You have not provided authorization headers',
    );
  }

  public static InvalidAuthHeaders(): AuthError {
    return new AuthError(
      'InvalidAuthHeaders',
      'Authorization header has to be "Bearer ${token}"',
    );
  }

  public static UnauthorizedException(): AuthError {
    return new AuthError('UnauthorizedException', 'UnauthorizedException');
  }

  public static Forbidden(): AuthError {
    return new AuthError('Forbidden', 'Forbidden');
  }

  public static WrongLoginOrPassword(): AuthError {
    return new AuthError('WrongLoginOrPassword', 'Wrong login or password');
  }

  public static InvalidConfirmationCodeIdentifier(): AuthError {
    return new AuthError(
      'InvalidConfirmationCodeIdentifier',
      'Invalid confirmation code identifier',
    );
  }

  public static AlreadyExists(): AuthError {
    return new AuthError('AlreadyExists', 'User already exists');
  }

  public static InvalidConfirmationCode(): AuthError {
    return new AuthError(
      'InvalidConfirmationCode',
      'Invalid confirmation code',
    );
  }

  public static MaxConfirmationCodeRequestsReached(): AuthError {
    return new AuthError(
      'MaxConfirmationCodeRequestsReached',
      'Max confirmation code requests reached',
    );
  }
}
