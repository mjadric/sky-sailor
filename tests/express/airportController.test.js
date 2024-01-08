const request = require("supertest");
const app = require("../../app/index");

const db = require("../../app/database");
jest.mock("../../app/database", () => ({
  promise: jest.fn().mockReturnThis(),
  query: jest.fn(),
  connect: jest.fn(),
}));

const mockData = [
  {
    airport_ID: 1,
    town_ID: 1,
  },
];

describe("Airport controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /airports", async () => {
    db.query.mockResolvedValueOnce([mockData]);

    const res = await request(app).get("/api/airports").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      results: mockData.length,
      data: {
        airports: mockData,
      },
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM AIRPORT");
  });

  it("GET /airports - no airports found", async () => {
    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app).get("/api/airports").send();

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: "failed to get all airports",
      message: "No airports found",
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM AIRPORT");
  });

  it("GET /airports - error during retrieval", async () => {
    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app).get("/api/airports").send();

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to get all airports",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM AIRPORT");
  });

  it("GET /airports/:id", async () => {
    const airport_ID = 1;
    const mockAirport = mockData[0];

    db.query.mockResolvedValueOnce([mockAirport]);

    const res = await request(app).get(`/api/airports/${airport_ID}`).send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      data: {
        airport: mockAirport,
      },
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM AIRPORT WHERE airport_ID = ${airport_ID}`
    );
  });

  it("GET /airports/:id - airport not found", async () => {
    const airport_ID = 2;

    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app).get(`/api/airports/${airport_ID}`).send();

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: "failed to get airport",
      message: "Airport not found",
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM AIRPORT WHERE airport_ID = ${airport_ID}`
    );
  });

  it("GET /airports/:id - error during retrieval", async () => {
    const airport_ID = 1;
    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app).get(`/api/airports/${airport_ID}`).send();

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to get airport",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM AIRPORT WHERE airport_ID = ${airport_ID}`
    );
  });

  it("POST /airports", async () => {
    const mockAirport = mockData[0];

    db.query.mockResolvedValueOnce([mockAirport]);

    const res = await request(app).post("/api/airports").send(mockAirport);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      data: {
        airport: mockAirport,
      },
    });

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO AIRPORT SET ?",
      mockAirport
    );
  });

  it("POST /airports - invalid town ID", async () => {
    const mockAirport = mockData[0];
    mockAirport.town_ID = "invalid";

    const res = await request(app).post("/api/airports").send(mockAirport);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      status: "failed to add airport",
      message: "Invalid town ID",
    });

    expect(db.query).not.toHaveBeenCalled();
  });

  it("POST /airports - error during insertion", async () => {
    const mockAirport = {
      town_ID: 3,
    };

    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app).post("/api/airports").send(mockAirport);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to add airport",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO AIRPORT SET ?",
      mockAirport
    );
  });
});
