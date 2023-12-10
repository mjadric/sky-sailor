const request = require("supertest");
const app = require("../../app/index");

const db = require("../../app/database");
jest.mock("../../app/database", () => ({
  promise: jest.fn().mockReturnThis(),
  query: jest.fn(),
  connect: jest.fn(),
}));

const mockData = [
  { town_ID: 1, name: "Town1" },
  { town_ID: 2, name: "Town2" },
  { town_ID: 3, name: "Town3" },
];

describe("Town controller test cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /towns", async () => {
    const query = "town";
    db.promise().query.mockResolvedValueOnce([mockData]);

    const response = await request(app).get("/api/towns").query({ query });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      results: mockData.length,
      data: {
        towns: mockData,
      },
    });

    expect(db.promise().query).toHaveBeenCalledWith( // don't format query - tests fail if you do
`SELECT town_ID, name
        FROM town 
        WHERE LOWER(name) LIKE LOWER(CONCAT(?, '%'))
        LIMIT 5`,
      [query]
    );
  });

  it("GET /towns - error during retrieval", async () => {
    const query = "town";
    db.promise().query.mockRejectedValueOnce(new Error("database error"));

    const response = await request(app).get("/api/towns").query({ query });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: "failed to get towns",
      message: "database error",
    });

    expect(db.promise().query).toHaveBeenCalledWith( // don't format query - tests fail if you do
`SELECT town_ID, name
        FROM town 
        WHERE LOWER(name) LIKE LOWER(CONCAT(?, '%'))
        LIMIT 5`,
      [query]
    );
  });
});
