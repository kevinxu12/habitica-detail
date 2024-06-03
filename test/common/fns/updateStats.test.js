import updateStats from '../../../website/common/script/fns/updateStats';
import {
  generateUser,
} from '../../helpers/common.helper';

describe('common.fns.updateStats', () => {
  let user;

  beforeEach(() => {
    user = generateUser();
    user.addNotification = sinon.spy();
  });

  context('No Hp', () => {
    it('updates user\'s hp', () => {
      const stats = { hp: 0 };
      expect(user.stats.hp).to.not.eql(0);
      updateStats(user, stats);
      expect(user.stats.hp).to.eql(0);
      updateStats(user, { hp: 2 });
      expect(user.stats.hp).to.eql(2);
    });

    it('does not lower hp below 0', () => {
      const stats = {
        hp: -5,
      };
      updateStats(user, stats);
      expect(user.stats.hp).to.eql(0);
    });
  });

  context('Stat Allocation', () => {
    it('adds only attribute points up to user\'s level', () => {
      const stats = {
        exp: 261,
      };
      expect(user.stats.points).to.eql(0);

      user.stats.lvl = 10;

      updateStats(user, stats);

      expect(user.stats.points).to.eql(11);
    });

    it('adds an attibute point when user\'s stat points are less than max level', () => {
      const stats = {
        exp: 3581,
      };

      user.stats.lvl = 99;
      user.stats.str = 25;
      user.stats.int = 25;
      user.stats.con = 25;
      user.stats.per = 24;

      updateStats(user, stats);

      expect(user.stats.points).to.eql(1);
    });

    it('does not add an attibute point when user\'s stat points are equal to max level', () => {
      const stats = {
        exp: 3581,
      };

      user.stats.lvl = 99;
      user.stats.str = 25;
      user.stats.int = 25;
      user.stats.con = 25;
      user.stats.per = 25;

      updateStats(user, stats);

      expect(user.stats.points).to.eql(0);
    });

    it('does not add an attibute point when user\'s stat points + unallocated points are equal to max level', () => {
      const stats = {
        exp: 3581,
      };

      user.stats.lvl = 99;
      user.stats.str = 25;
      user.stats.int = 25;
      user.stats.con = 25;
      user.stats.per = 15;
      user.stats.points = 10;

      updateStats(user, stats);

      expect(user.stats.points).to.eql(10);
    });

    it('only awards stat points up to level 100 if user is missing unallocated stat points and is over level 100', () => {
      const stats = {
        exp: 5581,
      };

      user.stats.lvl = 104;
      user.stats.str = 25;
      user.stats.int = 25;
      user.stats.con = 25;
      user.stats.per = 15;
      user.stats.points = 0;

      updateStats(user, stats);

      expect(user.stats.points).to.eql(10);
    });

    it('add user notification when the user levels up', () => {
      const initialLvl = user.stats.lvl;
      updateStats(user, {
        exp: 3000,
      });
      expect(user._tmp.leveledUp).to.eql([{
        initialLvl,
        newLvl: user.stats.lvl,
      }]);
    });

    it('add user notification when rebirth is enabled', () => {
      user.stats.lvl = 51;
      updateStats(user, { });
      expect(user.addNotification).to.be.calledOnce;
      expect(user.addNotification).to.be.calledWith('REBIRTH_ENABLED');
    });

    context('assigns flags.levelDrops', () => {
      it('for atom1', () => {
        user.stats.lvl = 16;
        user.flags.levelDrops.atom1 = false;
        expect(user.items.quests.atom1).to.eql(undefined);
        updateStats(user, { atom1: true });
        expect(user.items.quests.atom1).to.eql(1);
        expect(user.flags.levelDrops.atom1).to.eql(true);
        updateStats(user, { atom1: true });
        expect(user.items.quests.atom1).to.eql(1); // no change
      });
      it('for vice1', () => {
        user.stats.lvl = 31;
        user.flags.levelDrops.vice1 = false;
        expect(user.items.quests.vice1).to.eql(undefined);
        updateStats(user, { vice1: true });
        expect(user.items.quests.vice1).to.eql(1);
        expect(user.flags.levelDrops.vice1).to.eql(true);
        updateStats(user, { vice1: true });
        expect(user.items.quests.vice1).to.eql(1);
      });
      it('moonstone', () => {
        user.stats.lvl = 60;
        user.flags.levelDrops.moonstone1 = false;
        expect(user.items.quests.moonstone1).to.eql(undefined);
        updateStats(user, { moonstone1: true });
        expect(user.flags.levelDrops.moonstone1).to.eql(true);
        expect(user.items.quests.moonstone1).to.eql(1);
        updateStats(user, { moonstone1: true });
        expect(user.items.quests.moonstone1).to.eql(1);
      });
      it('for goldenknight1', () => {
        user.stats.lvl = 40;
        user.flags.levelDrops.goldenknight1 = false;
        expect(user.items.quests.goldenknight1).to.eql(undefined);
        updateStats(user, { goldenknight1: true });
        expect(user.items.quests.goldenknight1).to.eql(1);
        expect(user.flags.levelDrops.goldenknight1).to.eql(true);
        updateStats(user, { goldenknight1: true });
        expect(user.items.quests.goldenknight1).to.eql(1);
      });
    });

    // @TODO: Set up sinon sandbox
    xit('auto allocates stats if automaticAllocation is turned on', () => {
      sandbox.stub(user.fns, 'autoAllocate');

      const stats = {
        exp: 261,
      };

      user.stats.lvl = 10;

      user.fns.updateStats(stats);

      expect(user.fns.autoAllocate).to.be.calledOnce;
    });
  });

  context('User levels up multiple times', () => {
    beforeEach(() => {
      user.stats = {
        hp: 50,
        mp: 50,
        exp: 100,
        gp: 20,
        lvl: 2,
        str: 1,
        int: 1, 
        per: 1,
        con: 1,
        points: 0,
      };
      user.flags.rebirthEnabled = false;
      user.flags.levelDrops = {};
      user.items.quests = {};
    });
    
    it('updates user stats and notifications correctly', () => {
      const statsToUpdate = {
        hp: 50, 
        mp: 50,
        exp: 1000,
        gp: 30,
      };
      
      const expectedFinalStats = {
        hp: 50,
        mp: 50,
        exp: 195,
        gp: 30,
        lvl: 8,
        str: 1,
        int: 1,
        per: 1, 
        con: 1,
        points: 4,
      };
      
      updateStats(user, statsToUpdate);
      
      expect(user.stats.hp).to.equal(expectedFinalStats.hp);
      expect(user.stats.mp).to.equal(expectedFinalStats.mp);
      expect(user.stats.exp).to.equal(expectedFinalStats.exp);
      expect(user.stats.gp).to.equal(expectedFinalStats.gp);
      expect(user.stats.lvl).to.equal(expectedFinalStats.lvl);
      expect(user.stats.str).to.equal(expectedFinalStats.str);
      expect(user.stats.int).to.equal(expectedFinalStats.int);
      expect(user.stats.per).to.equal(expectedFinalStats.per);
      expect(user.stats.con).to.equal(expectedFinalStats.con);
      expect(user.stats.points).to.equal(expectedFinalStats.points);
      expect(user.flags.customizationsNotification).to.equal(true);
      expect(user.flags.itemsEnabled).to.equal(true);
      expect(user._tmp.leveledUp).to.have.lengthOf(1);
      expect(user._tmp.leveledUp[0].initialLvl).to.equal(2);
      expect(user._tmp.leveledUp[0].newLvl).to.equal(8);
    });
  });
  
  context('User reaches level 15 for atom quest drop', () => {
    beforeEach(() => {
      user.stats = {
        lvl: 14,
      };
      user.items.quests = {};
      user.flags.levelDrops = {};
    });
    
    it('adds atom1 quest item and updates levelDrops flag', () => {
      updateStats(user, { exp: 1000 });
      
      expect(user.stats.lvl).to.be.at.least(15);
      expect(user.items.quests.atom1).to.equal(1);
      expect(user.flags.levelDrops.atom1).to.equal(true);
    });
  });
  
  context('User reaches level 60 for moonstone quest drop', () => {
    beforeEach(() => {
      user.stats = {
        lvl: 59,
      };
      user.items.quests = {};
      user.flags.levelDrops = {};
    });
    
    it('adds moonstone1 quest item and updates levelDrops flag', () => {
      updateStats(user, { exp: 10000 });
      
      expect(user.stats.lvl).to.be.at.least(60);
      expect(user.items.quests.moonstone1).to.equal(1);
      expect(user.flags.levelDrops.moonstone1).to.equal(true);      
    });
  });
  
  context('User reaches level 50 to enable rebirth', () => {
    beforeEach(() => {
      user.stats = {
        lvl: 49,
      };
      user.flags.rebirthEnabled = false;
    });
    
    it('updates rebirth flag and adds notification', () => {
      updateStats(user, { exp: 10000 });
      
      expect(user.stats.lvl).to.be.at.least(50);
      expect(user.flags.rebirthEnabled).to.equal(true);
      expect(user.addNotification).to.be.calledWith('REBIRTH_ENABLED');
    });
  });
});
