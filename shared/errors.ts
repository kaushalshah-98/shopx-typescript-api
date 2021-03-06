// tslint:disable max-classes-per-file (Many simple inherited classes.)

export abstract class ErrorResult extends Error {
  public constructor(public status: string, public message: string, public messageCode: string) {
    super();
  }
}

export class NoContentResult extends ErrorResult {}

export class BadRequestResult extends ErrorResult {}

export class UnAuthorizedResult extends ErrorResult {}

export class ForbiddenResult extends ErrorResult {}

export class InternalServerErrorResult extends ErrorResult {}

export class NotFoundResult extends ErrorResult {}

export class ConnectionError extends ErrorResult {}

// tslint:enable
