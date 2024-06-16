import { apiError } from '../../../../website/server/libs/apiError';
import common from '../../../../website/common';

describe('API Messages', () => {
  const message = 'Only public guilds support pagination.';
  const commonErrors = common.errorMessages.common;

  it('returns an API message', () => {
    expect(apiError('guildsOnlyPaginate')).to.equal(message);
  });

  it('throws if the API message does not exist', () => {
    expect(() => apiError('iDoNotExist')).to.throw;
  });

  it('clones the passed variables', () => {
    const vars = { a: 1 };
    sandbox.stub(_, 'clone').returns({});
    apiError('guildsOnlyPaginate', vars);
    expect(_.clone).to.have.been.calledOnce;
    expect(_.clone).to.have.been.calledWith(vars);
  });

  it('pass the message through _.template', () => {
    const vars = { a: 1 };
    const stub = sinon.stub().returns('string');
    sandbox.stub(_, 'template').returns(stub);
    apiError('guildsOnlyPaginate', vars);
    expect(_.template).to.have.been.calledOnce;
    expect(_.template).to.have.been.calledWith(message);
    expect(stub).to.have.been.calledOnce;
    expect(stub).to.have.been.calledWith({});
  });
  
  it('returns a common error message when msgKey is not found in apiErrors', () => {
    expect(() => apiError('notFound')).to.throw();
  });
});
