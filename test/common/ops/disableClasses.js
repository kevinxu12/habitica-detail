import disableClasses from '../../../website/common/script/ops/disableClasses';
import { generateUser } from '../../helpers/common.helper';
import { MAX_LEVEL } from '../../../website/common/script/constants';

describe('shared.ops.disableClasses', () => {
  let user;

  beforeEach(() => {
    user = generateUser();
  });

  it('disable classes', () => {
    user.stats.lvl = 34;
    user.stats.str = 45;
    user.stats.class = 'healer';
    user.preferences.disableClasses = false;
    user.preferences.autoAllocate = false;
    user.stats.points = 2;

    const [data] = disableClasses(user);
    expect(data).to.eql({
      preferences: user.preferences,
      stats: user.stats,
      flags: user.flags,
    });

    expect(user.stats.class).to.equal('warrior');
    expect(user.flags.classSelected).to.equal(true);
    expect(user.preferences.disableClasses).to.equal(true);
    expect(user.preferences.autoAllocate).to.equal(true);
    expect(user.stats.str).to.equal(34);
    expect(user.stats.points).to.equal(0);
  });

  it('disables classes and allocates points correctly when level exceeds max', () => {
    const maxLevelExceeded = MAX_LEVEL + 5;
    
    user.stats.lvl = maxLevelExceeded;
    user.stats.str = 25;
    user.stats.class = 'rogue';
    user.flags.classSelected = false;
    user.preferences.disableClasses = false;
    user.preferences.autoAllocate = false;
    user.stats.points = 10;

    const [data] = disableClasses(user);
    expect(data).to.eql({
      stats: user.stats,
      flags: user.flags,
      preferences: user.preferences,
    });

    expect(user.stats.lvl).to.equal(maxLevelExceeded);
    expect(user.stats.class).to.equal('warrior');
    expect(user.stats.str).to.equal(MAX_LEVEL);
    expect(user.flags.classSelected).to.equal(true);
    expect(user.preferences.disableClasses).to.equal(true);
    expect(user.preferences.autoAllocate).to.equal(true);
    expect(user.stats.points).to.equal(0);
  });
});
