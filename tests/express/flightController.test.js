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
    flight_ID: 50,
    departureTimeDate: "2023-01-09T12:00:00.000Z",
    arrivalTimeDate: "2023-01-09T16:00:00.000Z",
    plane_ID: 3,
    departureAirport_ID: 6,
    destinationAirport_ID: 7,
    extraBaggagePrice: 2,
    flightInsurancePrice: 3,
    timezone_ID: 1,
  },
  {
    flight_ID: 51,
    departureTimeDate: "2023-01-10T17:00:00.000Z",
    arrivalTimeDate: "2023-01-10T21:00:00.000Z",
    plane_ID: 4,
    departureAirport_ID: 8,
    destinationAirport_ID: 9,
    extraBaggagePrice: 1,
    flightInsurancePrice: 2,
    timezone_ID: 6,
  },
];

describe("Flight controller test cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /flights", async () => {
    db.promise().query.mockResolvedValueOnce([mockData]);

    const response = await request(app).get("/api/flights").send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      results: mockData.length,
      data: {
        flights: mockData,
      },
    });

    expect(db.promise().query).toHaveBeenCalledWith("SELECT * FROM FLIGHT");
  });

  it("GET /flights - error during retrieval", async () => {
    db.promise().query.mockRejectedValueOnce(new Error("database error"));

    const response = await request(app).get("/api/flights").send();

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: "failed to get all flights",
      message: "database error",
    });

    expect(db.promise().query).toHaveBeenCalledWith("SELECT * FROM FLIGHT");
  });

  it("GET /flights/:id", async () => {
    const flight_ID = 50;
    const mockFlight = mockData[0];

    db.promise().query.mockResolvedValueOnce([mockFlight]);

    const response = await request(app).get(`/api/flights/${flight_ID}`).send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      data: {
        flight: mockFlight,
      },
    });

    expect(db.promise().query).toHaveBeenCalledWith(
      `SELECT * FROM FLIGHT WHERE flight_ID = ${flight_ID}`
    );
  });

  it("GET /flights/:id - flight not found", async () => {
    const flight_ID = 666;
    db.promise().query.mockResolvedValueOnce([[]]);

    const response = await request(app).get(`/api/flights/${flight_ID}`).send();

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "failed to get flight",
      message: "Flight not found",
    });

    expect(db.promise().query).toHaveBeenCalledWith(
      `SELECT * FROM FLIGHT WHERE flight_ID = ${flight_ID}`
    );
  });

  it("GET /flights/:id - error during retrieval", async () => {
    const flight_ID = 50;
    db.promise().query.mockRejectedValueOnce(new Error("database error"));

    const response = await request(app).get(`/api/flights/${flight_ID}`).send();

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: "failed to get flight",
      message: "database error",
    });

    expect(db.promise().query).toHaveBeenCalledWith(
      `SELECT * FROM FLIGHT WHERE flight_ID = ${flight_ID}`
    );
  });

  it("GET /search", async () => {
    const departureTownId = 1;
    const destinationTownId = 2;
    const departureDate = "2023-01-09";

    const mockSearchResults = [mockData[0]];

    db.promise().query.mockResolvedValueOnce([mockSearchResults]);

    const response = await request(app)
      .get("/api/search")
      .query({ departureTownId, destinationTownId, departureDate });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      results: mockSearchResults.length,
      data: {
        flights: mockSearchResults,
      },
    });

    expect(db.promise().query).toHaveBeenCalledWith(
      "CALL flight_search(?, ?, ?)",
      [
        String(departureTownId),
        String(destinationTownId),
        String(departureDate),
      ]
    );
  });

  it("GET /search - missing query params", async () => {
    const response = await request(app)
      .get("/api/search")
      .query({ departureTownId: 1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: "failed",
      message:
        "All parameters (departureTownId, destinationTownId, departureDate) are required.",
    });
  });

  it("GET /search - error during retrieval", async () => {
    const departureTownId = 1;
    const destinationTownId = 2;
    const departureDate = "2023-01-09";

    db.promise().query.mockRejectedValueOnce(new Error("database error"));

    const response = await request(app)
      .get("/api/search")
      .query({ departureTownId, destinationTownId, departureDate });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: "failed to search flights",
      message: "database error",
    });

    expect(db.promise().query).toHaveBeenCalledWith(
      "CALL flight_search(?, ?, ?)",
      [
        String(departureTownId),
        String(destinationTownId),
        String(departureDate),
      ]
    );
  });
});
