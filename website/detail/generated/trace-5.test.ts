// Autogenerated Detail test, do not edit.

const originalEnvironment = process.env;
process.env.COPYSCAPE_USERNAME = "UNKNOWN";
process.env.COPYSCAPE_KEY = "REDACTED";
process.env.JUNE_KEY = "REDACTED";
process.env.MG_API_KEY = "REDACTED";
process.env.BUGSNAG_KEY = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
process.env.NANGO = "REDACTED";
process.env.SCREENSHOT_ONE_ACCESS_KEY = "REDACTED";
process.env.SCREENSHOT_ONE_SECRET_KEY = "REDACTED";
process.env.__DETAIL_TEST_MODE = "true";

import { libraries, request, utils } from "@detail-dev/replay";
import crypto from "crypto";
import { createClient } from "redis";

jest.mock("crypto", () => {
  const mCrypto = {
    ...jest.requireActual("crypto"),
    randomBytes: jest.fn(),
    randomUUID: jest.fn(),
  };
  return mCrypto;
});
jest.mock("redis", () => libraries.RedisInterceptor.createMock());

describe("POST /api/v4/user/auth/local/register", () => {
  let response: request.Response;
  let httpInterceptor: libraries.HttpInterceptor;

  // Set up crypto fixtures.
  const cryptoCallsExpected = [
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [5],
      },
      output: {
        type: "Buffer",
        data: [8, 248, 113, 25, 236],
      },
      id: "442f2057c1753dc3",
      timestamp: 1715711549203000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          180, 236, 237, 16, 110, 219, 146, 238, 126, 38, 168, 140, 205, 212,
          221, 120,
        ],
      },
      id: "bdd011245180a8fc",
      timestamp: 1715711549215000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          116, 10, 242, 165, 56, 32, 80, 201, 109, 203, 153, 83, 220, 179, 90,
          161,
        ],
      },
      id: "46ef1fcdec824bff",
      timestamp: 1715711549216000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          107, 239, 239, 76, 158, 177, 200, 16, 46, 12, 106, 156, 128, 248, 44,
          17,
        ],
      },
      id: "f062b03a2296796a",
      timestamp: 1715711549217000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          6, 169, 36, 112, 180, 204, 220, 129, 240, 105, 184, 111, 145, 42, 12,
          123,
        ],
      },
      id: "2aba6ea91ed1e9be",
      timestamp: 1715711549219000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          55, 206, 250, 126, 189, 142, 84, 126, 39, 149, 110, 82, 130, 152, 22,
          92,
        ],
      },
      id: "657f01cad6866157",
      timestamp: 1715711549220000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          176, 174, 150, 55, 64, 92, 87, 203, 193, 246, 169, 128, 114, 42, 33,
          239,
        ],
      },
      id: "fb74fa3188b8bd8a",
      timestamp: 1715711549223000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          42, 251, 223, 107, 142, 31, 233, 46, 84, 233, 26, 173, 242, 11, 153,
          5,
        ],
      },
      id: "25a2cdb73fdb71f3",
      timestamp: 1715711549224000,
      startup: true,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomBytes",
        args: [16],
      },
      output: {
        type: "Buffer",
        data: [
          101, 167, 169, 187, 72, 7, 91, 222, 242, 62, 253, 8, 116, 254, 130,
          83,
        ],
      },
      id: "c70fb14199276e1c",
      timestamp: 1715711598032000,
      startup: false,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomUUID",
        args: [],
      },
      output: "78aaed7c-ea3a-4241-9a0f-08f2edf30914",
      id: "d5d3aa5f8e184fd3",
      timestamp: 1715711598101000,
      startup: false,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomUUID",
        args: [],
      },
      output: "6c5b6b18-7027-4ba4-9332-6742104fa499",
      id: "b3d235d0c0f6e7fa",
      timestamp: 1715711598102000,
      startup: false,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomUUID",
        args: [],
      },
      output: "b672ddda-c59f-4d01-8258-db92e65a06c2",
      id: "9dbfebdd965b7596",
      timestamp: 1715711598103000,
      startup: false,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomUUID",
        args: [],
      },
      output: "f9bc955b-53c0-4bf7-9d35-d84ccdd69b9d",
      id: "b605457b04503a48",
      timestamp: 1715711598103000,
      startup: false,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomUUID",
        args: [],
      },
      output: "1c9fa564-bae8-42d7-87e9-52769dbbb154",
      id: "31d9e307e86441bb",
      timestamp: 1715711598103000,
      startup: false,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomUUID",
        args: [],
      },
      output: "b4a0e054-af4c-4470-817e-7b4d3b41d2fd",
      id: "780c57434c167bb8",
      timestamp: 1715711598103000,
      startup: false,
    },
    {
      library: "crypto",
      input: {
        functionName: "randomUUID",
        args: [],
      },
      output: "3814b9b6-37ad-47c0-8dbd-3d736665b751",
      id: "75fc7c83f6204f9f",
      timestamp: 1715711598103000,
      startup: false,
    },
  ];
  let cryptoInterceptor: libraries.CryptoInterceptor;

  const OriginalDate = Date;
  // Set up date fixtures.
  const dateCallsExpected = [
    {
      library: "date",
      input: "now",
      output: "1715711598028",
      id: "a84bf4ab56c1bc2a",
      timestamp: 1715711598028000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:18.029Z",
      id: "b657cc91c5fa9a4a",
      timestamp: 1715711598029000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:18.029Z",
      id: "37aa12885014ed44",
      timestamp: 1715711598029000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598090",
      id: "1ca882851646e327",
      timestamp: 1715711598090000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598090",
      id: "9ca4332cfb729ee3",
      timestamp: 1715711598090000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598091",
      id: "e165170deb28d3e2",
      timestamp: 1715711598091000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598091",
      id: "bfecf96beb0a417f",
      timestamp: 1715711598091000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598092",
      id: "5689740431948918",
      timestamp: 1715711598092000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598092",
      id: "00927ccfa89fe733",
      timestamp: 1715711598092000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598099",
      id: "35fabf3b9646d616",
      timestamp: 1715711598099000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598100",
      id: "486b67d7b23b9cd8",
      timestamp: 1715711598100000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598105",
      id: "a432966dee0b6fce",
      timestamp: 1715711598105000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:18.108Z",
      id: "a619f3d8a65e89dc",
      timestamp: 1715711598108000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:18.108Z",
      id: "1fbcf63f0f03456d",
      timestamp: 1715711598108000,
      startup: false,
    },
    {
      library: "date",
      input: "now",
      output: "1715711598118",
      id: "20ccfa602b8ee808",
      timestamp: 1715711598118000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:18.119Z",
      id: "d9c0fba5c85c3674",
      timestamp: 1715711598119000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:18.119Z",
      id: "1ddc38188362a8ad",
      timestamp: 1715711598119000,
      startup: false,
    },
  ];
  let dateInterceptor: libraries.DateInterceptor;

  let redis: any;
  let redisInterceptor: libraries.RedisInterceptor;

  const EXPECTED_BODY =
    '{"success":true,"data":{"auth":{"local":{"email":"xukevinwork@gmail.com","username":"vinkebot","lowerCaseUsername":"vinkebot","has_password":true},"facebook":{},"google":{},"apple":{},"timestamps":{"created":"2024-05-14T18:33:18.090Z","loggedin":"2024-05-14T18:33:18.090Z","updated":"2024-05-14T18:33:18.091Z"}},"_v":1,"achievements":{"ultimateGearSets":{"healer":false,"wizard":false,"rogue":false,"warrior":false},"streak":0,"challenges":[],"perfect":0,"quests":{}},"backer":{},"contributor":{},"permissions":{},"balance":0,"purchased":{"ads":false,"txnCount":0,"skin":{},"hair":{},"shirt":{},"background":{"violet":true},"plan":{"quantity":1,"extraMonths":0,"perkMonthCount":-1,"gemsBought":0,"consecutive":{"count":0,"offset":0,"gemCapExtra":0,"trinkets":0},"mysteryItems":[]}},"flags":{"verifiedUsername":true,"customizationsNotification":false,"showTour":true,"tour":{"intro":-1,"classes":-1,"stats":-1,"tavern":-1,"party":-1,"guilds":-1,"challenges":-1,"market":-1,"pets":-1,"mounts":-1,"hall":-1,"equipment":-1,"groupPlans":-1},"tutorial":{"common":{"habits":true,"dailies":true,"todos":true,"rewards":true,"party":true,"pets":true,"gems":true,"skills":true,"classes":true,"tavern":true,"equipment":true,"items":true,"mounts":true,"inbox":true,"stats":true},"ios":{"addTask":false,"editTask":false,"deleteTask":false,"filterTask":false,"groupPets":false,"inviteParty":false,"reorderTask":false}},"dropsEnabled":false,"itemsEnabled":false,"lastNewStuffRead":"","rewrite":true,"classSelected":false,"rebirthEnabled":false,"levelDrops":{},"recaptureEmailsPhase":0,"weeklyRecapEmailsPhase":0,"lastWeeklyRecap":"2024-05-14T18:33:18.091Z","communityGuidelinesAccepted":false,"cronCount":0,"welcomed":false,"armoireEnabled":true,"armoireOpened":false,"armoireEmpty":false,"cardReceived":false,"warnedLowHealth":false,"newStuff":false},"history":{"exp":[],"todos":[]},"items":{"gear":{"equipped":{"armor":"armor_base_0","head":"head_base_0","shield":"shield_base_0"},"costume":{"armor":"armor_base_0","head":"head_base_0","shield":"shield_base_0"},"owned":{"headAccessory_special_blackHeadband":true,"headAccessory_special_blueHeadband":true,"headAccessory_special_greenHeadband":true,"headAccessory_special_pinkHeadband":true,"headAccessory_special_redHeadband":true,"headAccessory_special_whiteHeadband":true,"headAccessory_special_yellowHeadband":true,"eyewear_special_blackTopFrame":true,"eyewear_special_blueTopFrame":true,"eyewear_special_greenTopFrame":true,"eyewear_special_pinkTopFrame":true,"eyewear_special_redTopFrame":true,"eyewear_special_whiteTopFrame":true,"eyewear_special_yellowTopFrame":true,"eyewear_special_blackHalfMoon":true,"eyewear_special_blueHalfMoon":true,"eyewear_special_greenHalfMoon":true,"eyewear_special_pinkHalfMoon":true,"eyewear_special_redHalfMoon":true,"eyewear_special_whiteHalfMoon":true,"eyewear_special_yellowHalfMoon":true}},"special":{"snowball":0,"spookySparkles":0,"shinySeed":0,"seafoam":0,"valentine":0,"valentineReceived":[],"nye":0,"nyeReceived":[],"greeting":0,"greetingReceived":[],"thankyou":0,"thankyouReceived":[],"birthday":0,"birthdayReceived":[],"congrats":0,"congratsReceived":[],"getwell":0,"getwellReceived":[],"goodluck":0,"goodluckReceived":[]},"lastDrop":{"count":0,"date":"2024-05-14T18:33:18.092Z"},"currentPet":"","currentMount":"","pets":{},"eggs":{},"hatchingPotions":{},"food":{},"mounts":{},"quests":{"dustbunnies":1}},"_subSignature":"NOT_RUNNING","challenges":[],"invitations":{"guilds":[],"party":{},"parties":[]},"guilds":[],"party":{"quest":{"progress":{"up":0,"down":0,"collectedItems":0,"collect":{}},"RSVPNeeded":false},"order":"level","orderAscending":"ascending"},"preferences":{"language":"en","dayStart":0,"size":"slim","hair":{"color":"red","base":3,"bangs":1,"beard":0,"mustache":0,"flower":1},"hideHeader":false,"skin":"915533","shirt":"blue","timezoneOffset":0,"sound":"rosstavoTheme","chair":"none","allocationMode":"flat","autoEquip":true,"costume":false,"dateFormat":"MM/dd/yyyy","sleep":false,"stickyHeader":true,"disableClasses":false,"newTaskEdit":false,"dailyDueDefaultView":false,"advancedCollapsed":false,"toolbarCollapsed":false,"reverseChatOrder":false,"developerMode":false,"displayInviteToPartyWhenPartyIs1":true,"webhooks":{},"emailNotifications":{"unsubscribeFromAll":false,"newPM":true,"kickedGroup":true,"wonChallenge":true,"giftedGems":true,"giftedSubscription":true,"invitedParty":true,"invitedGuild":true,"questStarted":true,"invitedQuest":true,"importantAnnouncements":true,"weeklyRecaps":true,"onboarding":true,"majorUpdates":true,"subscriptionReminders":true,"contentRelease":true},"pushNotifications":{"unsubscribeFromAll":false,"newPM":true,"wonChallenge":true,"giftedGems":true,"giftedSubscription":true,"invitedParty":true,"invitedGuild":true,"questStarted":true,"invitedQuest":true,"majorUpdates":true,"mentionParty":true,"mentionJoinedGuild":true,"mentionUnjoinedGuild":true,"partyActivity":true,"contentRelease":true},"suppressModals":{"levelUp":false,"hatchPet":false,"raisePet":false,"streak":false},"tasks":{"groupByChallenge":false,"confirmScoreNotes":false,"mirrorGroupTasks":[],"activeFilter":{"habit":"all","daily":"all","todo":"remaining","reward":"all"}},"improvementCategories":[],"background":"violet"},"profile":{"name":"vinkebot"},"stats":{"buffs":{"str":0,"int":0,"per":0,"con":0,"stealth":0,"streaks":false,"snowball":false,"spookySparkles":false,"shinySeed":false,"seafoam":false},"training":{"int":0,"per":0,"str":0,"con":0},"hp":50,"mp":10,"exp":0,"gp":0,"lvl":1,"class":"warrior","points":0,"str":0,"con":0,"int":0,"per":0},"inbox":{"newMessages":0,"optOut":false,"blocks":[]},"tasksOrder":{"habits":[],"dailys":[],"todos":[],"rewards":[]},"loginIncentives":0,"invitesSent":0,"pinnedItemsOrder":[],"apiToken":"99f2973b-fb2a-45da-a585-310c424c7ebc","lastCron":"2024-05-14T18:33:18.092Z","newMessages":{},"notifications":[],"tags":[{"id":"78aaed7c-ea3a-4241-9a0f-08f2edf30914","name":"Work"},{"id":"6c5b6b18-7027-4ba4-9332-6742104fa499","name":"Exercise"},{"id":"b672ddda-c59f-4d01-8258-db92e65a06c2","name":"Health + Wellness"},{"id":"f9bc955b-53c0-4bf7-9d35-d84ccdd69b9d","name":"School"},{"id":"1c9fa564-bae8-42d7-87e9-52769dbbb154","name":"Teams"},{"id":"b4a0e054-af4c-4470-817e-7b4d3b41d2fd","name":"Chores"},{"id":"3814b9b6-37ad-47c0-8dbd-3d736665b751","name":"Creativity"}],"extra":{},"pushDevices":[],"webhooks":[],"pinnedItems":[{"path":"gear.flat.weapon_warrior_0","type":"marketGear"},{"path":"gear.flat.armor_warrior_1","type":"marketGear"},{"path":"gear.flat.shield_warrior_1","type":"marketGear"},{"path":"gear.flat.head_warrior_1","type":"marketGear"},{"path":"potion","type":"potion"},{"path":"armoire","type":"armoire"}],"unpinnedItems":[],"_id":"de2b7530-9d40-4ce7-9a82-210b2ba93564","id":"de2b7530-9d40-4ce7-9a82-210b2ba93564","newUser":true},"appVersion":"5.24.2"}';
  const EXPECTED_RESPONSE_HEADER = {
    "x-dns-prefetch-control": "off",
    "x-frame-options": "SAMEORIGIN",
    "strict-transport-security": "max-age=15552000; includeSubDomains",
    "x-download-options": "noopen",
    "x-content-type-options": "nosniff",
    "x-xss-protection": "0",
    "access-control-allow-methods": "OPTIONS,GET,POST,PUT,HEAD,DELETE",
    "access-control-allow-headers":
      "Authorization,Content-Type,Accept,Content-Encoding,X-Requested-With,x-api-user,x-api-key,x-client",
    "access-control-expose-headers":
      "X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,Retry-After",
    "x-powered-by": "Express",
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
    "content-encoding": "gzip",
  };

  beforeEach(() => {
    redis = createClient({});
  });

  afterEach(async () => {
    global.Date = OriginalDate;
    jest.clearAllMocks();
    process.env = originalEnvironment;

    // Emit test results.
    utils.serializeTestResults("generated/test_results/5.json", {
      traceId: "01085e40df033959164a1b90ebf24645",
      testFile: __filename.split("/").pop() as string,
      request: {
        pathKey: "/api/v4/user/auth/local/register",
        route: "/api/v4/user/auth/local/register",
        method: "POST",
      },
      response: {
        expected: {
          status: 201,
          body: EXPECTED_BODY,
          header: EXPECTED_RESPONSE_HEADER,
        },
        observed: {
          status: response.status,
          body:
            response.headers && response.headers["content-length"] == 0
              ? undefined
              : response.text || JSON.stringify(response.body),
          header: libraries.canonicalizeResHeaders(response.header),
        },
      },
      expectedCalls: [...cryptoCallsExpected, ...dateCallsExpected],
      observedCalls: [
        ...httpInterceptor.getObservedCalls(),
        ...cryptoInterceptor.getObservedCalls(),
        ...dateInterceptor.getObservedCalls(),
        ...redisInterceptor.getObservedCalls(),
      ],
    });
  });

  it("should run as expected with example data", async () => {
    // @ts-expect-error we manage http mocking globally, so that we can reuse a
    // global polly server. We pass in hooks to manage the global state here.
    httpInterceptor = new libraries.HttpInterceptor(global.__HTTP_CALL_HOOKS__);
    httpInterceptor.expectCalls([]);

    cryptoInterceptor = new libraries.CryptoInterceptor(crypto);
    cryptoInterceptor.expectCalls(cryptoCallsExpected);

    dateInterceptor = new libraries.DateInterceptor();
    dateInterceptor.expectCalls(dateCallsExpected);

    redisInterceptor = new libraries.RedisInterceptor(redis);
    redisInterceptor.expectCalls([]);

    // Import the app.
    const { app } = await import("../config");

    // Make the request.
    response = await request(app)
      .post("/api/v4/user/auth/local/register")
      .set("x-forwarded-host", "localhost:8080")
      .set("x-forwarded-proto", "http")
      .set("x-forwarded-port", "8080")
      .set("x-forwarded-for", "127.0.0.1")
      .set("x-client", "habitica-web")
      .set("sec-fetch-dest", "empty")
      .set("connection", "close")
      .set("referer", "http://localhost:8080/static/home")
      .set(
        "user-agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
      )
      .set("origin", "http://localhost:8080")
      .set("content-type", "application/json")
      .set("sec-fetch-mode", "cors")
      .set("accept-encoding", "gzip, deflate")
      .set("accept-language", "en-US,en;q=0.9")
      .set("sec-fetch-site", "same-origin")
      .set("accept", "application/json, text/plain, */*")
      .set(
        "cookie",
        "amp_AMPLIT=a72VKGk7WN8pWK4CuxxiXx...1hts622gu.1hts622gu.0.0.0",
      )
      .set("host", "localhost:3000")
      .set("x-detail-originator", "detail")
      .send({
        username: "vinkebot",
        email: "xukevinwork@gmail.com",
        password: "password",
        confirmPassword: "password",
      });
  });
});
