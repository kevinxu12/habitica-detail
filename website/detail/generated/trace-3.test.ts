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
  };
  return mCrypto;
});
jest.mock("redis", () => libraries.RedisInterceptor.createMock());

describe("POST /api/v4/user/auth/verify-username", () => {
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
  ];
  let cryptoInterceptor: libraries.CryptoInterceptor;

  const OriginalDate = Date;
  // Set up date fixtures.
  const dateCallsExpected = [
    {
      library: "date",
      input: "now",
      output: "1715711588064",
      id: "9c243dceb77adc8f",
      timestamp: 1715711588063000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:08.065Z",
      id: "522ccef2778cc925",
      timestamp: 1715711588065000,
      startup: false,
    },
    {
      library: "date",
      input: "Date.new",
      output: "2024-05-14T18:33:08.066Z",
      id: "86a99946c3f88a65",
      timestamp: 1715711588066000,
      startup: false,
    },
  ];
  let dateInterceptor: libraries.DateInterceptor;

  let redis: any;
  let redisInterceptor: libraries.RedisInterceptor;

  const EXPECTED_BODY =
    '{"success":true,"data":{"isUsable":true},"appVersion":"5.24.2"}';
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
  };

  beforeEach(() => {
    redis = createClient({});
  });

  afterEach(async () => {
    global.Date = OriginalDate;
    jest.clearAllMocks();
    process.env = originalEnvironment;

    // Emit test results.
    utils.serializeTestResults("generated/test_results/3.json", {
      traceId: "22271c956fc751ad17ea88156c866384",
      testFile: __filename.split("/").pop() as string,
      request: {
        pathKey: "/api/v4/user/auth/verify-username",
        route: "/api/v4/user/auth/verify-username",
        method: "POST",
      },
      response: {
        expected: {
          status: 200,
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
      .post("/api/v4/user/auth/verify-username")
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
      .send({ username: "vinekbot" });
  });
});
