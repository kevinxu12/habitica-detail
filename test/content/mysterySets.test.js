import { each } from 'lodash';
import {
  expectValidTranslationString,
} from '../helpers/content.helper';

import mysterySets from '../../website/common/script/content/mystery-sets';

describe('Mystery Sets', () => {
  it('has a valid text string', () => {
    each(mysterySets, set => {
      expectValidTranslationString(set.text);
    });
  });

  it('should add key, text, and class properties to each value object', () => {
    const inputSets = {
      "202101": { start: "2021-01-01", end: "2021-01-31" },
      "202102": { start: "2021-02-01", end: "2021-02-28" },
      "301703": { start: "3017-03-14", end: "3017-04-02" }
    };

    each(inputSets, (value, key) => {
      value.key = key;
      value.text = `mysterySet${key}`;
      value.class = `shop_set_mystery_${key}`;
    });

    expect(inputSets).to.deep.equal({
      "202101": {
        start: "2021-01-01",
        end: "2021-01-31",
        key: "202101",
        text: "mysterySet202101",
        class: "shop_set_mystery_202101"
      },
      "202102": {
        start: "2021-02-01",
        end: "2021-02-28",
        key: "202102",
        text: "mysterySet202102",
        class: "shop_set_mystery_202102"
      },
      "301703": {
        start: "3017-03-14",
        end: "3017-04-02",
        key: "301703",
        text: "mysterySet301703",
        class: "shop_set_mystery_301703"
      }
    });
  });
});
