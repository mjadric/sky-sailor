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
    timeZone: "CET",
    plane_ID: 3,
    departureAirport_ID: 6,
    destinationAirport_ID: 7,
    extraBaggagePrice: "2",
    flightInsurancePrice: "3",
    timezone_ID: 6,
    arrivalTimeZone_ID: 6,
    departureTimeZone_ID: 6,
  },
  {
    flight_ID: 51,
    departureTimeDate: "2023-01-10T17:00:00.000Z",
    arrivalTimeDate: "2023-01-10T21:00:00.000Z",
    timeZone: "CET",
    plane_ID: 4,
    departureAirport_ID: 8,
    destinationAirport_ID: 9,
    extraBaggagePrice: "1",
    flightInsurancePrice: "2",
    timezone_ID: 6,
    arrivalTimeZone_ID: 6,
    departureTimeZone_ID: 6,
  },
  {
    flight_ID: 52,
    departureTimeDate: "2023-01-09T12:02:20.000Z",
    arrivalTimeDate: "2023-01-09T16:03:45.000Z",
    timeZone: "CET",
    plane_ID: 4,
    departureAirport_ID: 6,
    destinationAirport_ID: 7,
    extraBaggagePrice: "2.20",
    flightInsurancePrice: "5",
    timezone_ID: 6,
    arrivalTimeZone_ID: 6,
    departureTimeZone_ID: 6,
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

  it("POST /flights", async () => {
    const newFlight = {
      departureTimeDate: "2023-01-09T12:00:00.000Z",
      arrivalTimeDate: "2023-01-09T16:00:00.000Z",
      timeZone: "CET",
      plane_ID: 3,
      departureAirport_ID: 6,
      destinationAirport_ID: 7,
      extraBaggagePrice: "0.00",
      flightInsurancePrice: "0.00",
      timezone_ID: 6,
      arrivalTimeZone_ID: 6,
      departureTimeZone_ID: 6,
    };

    db.promise().query.mockResolvedValueOnce([newFlight]);

    const response = await request(app).post("/api/flights").send(newFlight);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      data: {
        flight: newFlight,
      },
    });

    expect(db.promise().query).toHaveBeenCalledWith(
      "INSERT INTO FLIGHT SET ?",
      newFlight
    );
  });

  it("GET /search", async () => {
    const departureTownId = 1;
    const destinationTownId = 2;
    const departureDate = "2023-01-09";

    const mockSearchResults = [mockData[0], mockData[2]];

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
});
