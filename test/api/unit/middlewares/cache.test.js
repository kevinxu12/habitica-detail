import sinon from 'sinon';
import {
  generateRes,
  generateReq,
  generateNext,
} from '../../../helpers/api-unit.helper';
import {
  disableCache,
} from '../../../../website/server/middlewares/cache';

describe('cache middlewares', () => {
  let res; let req; let
    next;

  beforeEach(() => {
    req = generateReq();
    res = generateRes();
    next = generateNext();
  });

  describe('disableCache', () => {
    it('sets the correct headers', () => {
      disableCache(req, res, next);
      expect(res.set).to.have.been.calledWith('Cache-Control', 'no-store');
      expect(next).to.have.been.calledOnce;
    });

    xit('removes the etag header', () => {
      // @TODO how to stub onHeaders
    });

    it('skips removing the ETag header due to open issue', () => {
      const mockRemoveHeader = sinon.stub();
      res.removeHeader = mockRemoveHeader;

      disableCache(req, res, next);

      expect(mockRemoveHeader).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
  });
});
