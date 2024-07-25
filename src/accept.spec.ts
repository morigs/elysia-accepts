import { expect, test, describe } from "bun:test";
import Elysia from "elysia";
import { accepts } from ".";

describe("accept context", () => {
  describe("charset", () => {
    test("should return the first accepted charset", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.charset("utf-8"));

      const req = new Request("http://localhost/", {
        headers: { "accept-charset": "*" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("utf-8");
    });

    test("should return false when nothing is accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.charset("utf-8"));

      const req = new Request("http://localhost/", {
        headers: { "accept-charset": "unknown" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("false");
    });

    test("should return list when no params", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.charset);

      const req = new Request("http://localhost/", {
        headers: { "accept-charset": "utf8, win1251" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["utf8", "win1251"]);
    });

    test("should return list", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.charsets);

      const req = new Request("http://localhost/", {
        headers: { "accept-charset": "utf8, win1251" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["utf8", "win1251"]);
    });
  });

  describe("language", () => {
    test("should return the first accepted language", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.language("en"));

      const req = new Request("http://localhost/", {
        headers: { "accept-language": "ru, en" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("en");
    });

    test("should return false when nothing is accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.language("en"));

      const req = new Request("http://localhost/", {
        headers: { "accept-language": "ru" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("false");
    });

    test("should return list when no params", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.language);

      const req = new Request("http://localhost/", {
        headers: { "accept-language": "ru, en" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["ru", "en"]);
    });

    test("should return list", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.languages);

      const req = new Request("http://localhost/", {
        headers: { "accept-language": "ru, en" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["ru", "en"]);
    });
  });

  describe("encoding", () => {
    test("should return the first accepted encoding", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.encoding("gzip"));

      const req = new Request("http://localhost/", {
        headers: { "accept-encoding": "deflate, gzip" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("gzip");
    });

    test("should return false when nothing is accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.encoding("gzip"));

      const req = new Request("http://localhost/", {
        headers: { "accept-encoding": "deflate" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("false");
    });

    test("should return list with identity when no params", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.encoding);

      const req = new Request("http://localhost/", {
        headers: { "accept-encoding": "deflate, gzip" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["deflate", "gzip", "identity"]);
    });

    test("should return list with identity", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.encodings);

      const req = new Request("http://localhost/", {
        headers: { "accept-encoding": "deflate, gzip" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["deflate", "gzip", "identity"]);
    });
  });

  describe("type", () => {
    test("should return the first accepted type", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.type("text/html"));

      const req = new Request("http://localhost/", {
        headers: { accept: "text/html, application/json" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("text/html");
    });

    test("should return the first accepted type for star", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.type("text/html"));

      const req = new Request("http://localhost/", {
        headers: { accept: "*/*" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("text/html");
    });

    test("should return the first accepted type in short form", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.type("json"));

      const req = new Request("http://localhost/", {
        headers: { accept: "text/html, application/json" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("json");
    });

    test("should return false when nothing is accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", (ctx) => ctx.type("xml"));

      const req = new Request("http://localhost/", {
        headers: { accept: "text/html, application/json" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("false");
    });

    test("should return list when no params", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.type);

      const req = new Request("http://localhost/", {
        headers: { accept: "text/html, application/json" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["text/html", "application/json"]);
    });

    test("should return list", async () => {
      const app = new Elysia().use(accepts()).get("/", (ctx) => ctx.types);

      const req = new Request("http://localhost/", {
        headers: { accept: "text/html, application/json" },
      });
      const res = await app.handle(req).then((res) => res.json());

      expect(res).toEqual(["text/html", "application/json"]);
    });
  });
});

describe("guard", () => {
  describe("per route", () => {
    test("passes when type is accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", () => "OK", { types: ["text/plain"] });

      const req = new Request("http://localhost/", {
        headers: { accept: "text/plain, application/json" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("OK");
    });

    test("passes for star", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", () => "OK", { types: ["text/plain"] });

      const req = new Request("http://localhost/", {
        headers: { accept: "*/*" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("OK");
    });

    test("406 when not accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .get("/", () => "OK", { types: ["text/plain"] });

      const req = new Request("http://localhost/", {
        headers: { accept: "application/json" },
      });
      const res = await app.handle(req);

      expect(res.status).toBe(406);
      expect(res.text()).resolves.toBe("Not Acceptable");
    });
  });

  describe("global", () => {
    test("passes when type is accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .guard({ types: ["text/plain"] })
        .get("/", () => "OK");

      const req = new Request("http://localhost/", {
        headers: { accept: "text/plain, application/json" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("OK");
    });

    test("passes for star", async () => {
      const app = new Elysia()
        .use(accepts())
        .guard({ types: ["text/plain"] })
        .get("/", () => "OK");

      const req = new Request("http://localhost/", {
        headers: { accept: "*/*" },
      });
      const res = await app.handle(req).then((res) => res.text());

      expect(res).toBe("OK");
    });

    test("406 when not accepted", async () => {
      const app = new Elysia()
        .use(accepts())
        .guard({ types: ["text/plain"] })
        .get("/", () => "OK");

      const req = new Request("http://localhost/", {
        headers: { accept: "application/json" },
      });
      const res = await app.handle(req);

      expect(res.status).toBe(406);
      expect(res.text()).resolves.toBe("Not Acceptable");
    });
  });
});
