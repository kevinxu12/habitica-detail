// TODO move to shared tests
import i18n from '../../../../website/common/script/i18n';
import {
  CustomError,
  NotAuthorized,
  BadRequest,
  Forbidden,
  InternalServerError,
  NotFound,
  NotificationNotFound,
} from '../../../../website/server/libs/errors';

describe('Custom Errors', () => {
  describe('CustomError', () => {
    it('is an instance of Error', () => {
      const customError = new CustomError();

      expect(customError).to.be.an.instanceOf(Error);
    });
  });

  describe('NotAuthorized', () => {
    it('is an instance of CustomError', () => {
      const notAuthorizedError = new NotAuthorized();

      expect(notAuthorizedError).to.be.an.instanceOf(CustomError);
    });

    it('it returns an http code of 401', () => {
      const notAuthorizedError = new NotAuthorized();

      expect(notAuthorizedError.httpCode).to.eql(401);
    });

    it('returns a default message', () => {
      const notAuthorizedError = new NotAuthorized();

      expect(notAuthorizedError.message).to.eql('Not authorized.');
    });

    it('allows a custom message', () => {
      const notAuthorizedError = new NotAuthorized('Custom Error Message');

      expect(notAuthorizedError.message).to.eql('Custom Error Message');
    });
  });

  describe('NotFound', () => {
    it('is an instance of CustomError', () => {
      const notAuthorizedError = new NotFound();

      expect(notAuthorizedError).to.be.an.instanceOf(CustomError);
    });

    it('it returns an http code of 404', () => {
      const notAuthorizedError = new NotFound();

      expect(notAuthorizedError.httpCode).to.eql(404);
    });

    it('returns a default message', () => {
      const notAuthorizedError = new NotFound();

      expect(notAuthorizedError.message).to.eql('Not found.');
    });

    it('allows a custom message', () => {
      const notAuthorizedError = new NotFound('Custom Error Message');

      expect(notAuthorizedError.message).to.eql('Custom Error Message');
    });

    describe('NotificationNotFound', () => {
      it('is an instance of NotFound', () => {
        const notificationNotFoundErr = new NotificationNotFound();
        expect(notificationNotFoundErr).to.be.an.instanceOf(NotFound);
      });

      it('it returns an http code of 404', () => {
        const notificationNotFoundErr = new NotificationNotFound();
        expect(notificationNotFoundErr.httpCode).to.eql(404);
      });

      it('returns a standard message', () => {
        const notificationNotFoundErr = new NotificationNotFound();
        expect(notificationNotFoundErr.message).to.eql('Not found.');
      });
    });
  });

  describe('BadRequest', () => {
    it('is an instance of CustomError', () => {
      const badRequestError = new BadRequest();

      expect(badRequestError).to.be.an.instanceOf(CustomError);
    });

    it('it returns an http code of 400', () => {
      const badRequestError = new BadRequest();

      expect(badRequestError.httpCode).to.eql(400);
    });

    it('returns a default message', () => {
      const badRequestError = new BadRequest();

      expect(badRequestError.message).to.eql('Bad request.');
    });

    it('allows a custom message', () => {
      const badRequestError = new BadRequest('Custom Error Message');

      expect(badRequestError.message).to.eql('Custom Error Message');
    });
  });

  describe('Forbidden', () => {
    it('is an instance of CustomError', () => {
      const forbiddenError = new Forbidden();

      expect(forbiddenError).to.be.an.instanceOf(CustomError);
    });

    it('it returns an http code of 403', () => {
      const forbiddenError = new Forbidden();

      expect(forbiddenError.httpCode).to.eql(403);
    });

    it('returns a default message', () => {
      const forbiddenError = new Forbidden();

      expect(forbiddenError.message).to.eql('Access forbidden.');
    });

    it('allows a custom message', () => {
      const forbiddenError = new Forbidden('Custom Error Message');

      expect(forbiddenError.message).to.eql('Custom Error Message');
    });
  });

  describe('InternalServerError', () => {
    it('is an instance of CustomError', () => {
      const internalServerError = new InternalServerError();

      expect(internalServerError).to.be.an.instanceOf(CustomError);
    });

    it('it returns an http code of 500', () => {
      const internalServerError = new InternalServerError();

      expect(internalServerError.httpCode).to.eql(500);
    });

    it('returns a default message', () => {
      const internalServerError = new InternalServerError();

      expect(internalServerError.message).to.eql('An unexpected error occurred.');
    });

    it('allows a custom message', () => {
      const internalServerError = new InternalServerError('Custom Error Message');

      expect(internalServerError.message).to.eql('Custom Error Message');
    });
  });
});

describe('t', () => {
  beforeEach(() => {
    i18n.strings = null;
    i18n.translations = {};
  });
  
  it('should return the localized string with variables applied', () => {
    i18n.translations = {
      en: {
        invalidEmailDomain: 'Email domain <%= domains %> not allowed.'
      }
    };

    const result = i18n.t('invalidEmailDomain', { domains: 'habitica.com, habitrpg.com' }, 'en');

    expect(result).to.equal('Email domain habitica.com, habitrpg.com not allowed.');
  });

  it('returns missing translation error when string not found', () => {
    i18n.translations = {
      en: {
        stringNotFound: 'String "<%= string %>" not found.'
      }
    };

    const result = i18n.t('missingKey', {}, 'en');

    expect(result).to.equal('String "missingKey" not found.');
  });
});
