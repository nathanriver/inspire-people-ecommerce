const request = require("supertest");
const app = require("./app");

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

describe("GET /", () => {
  it("responds Hello World!!!", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello World!!!");
  });
});
