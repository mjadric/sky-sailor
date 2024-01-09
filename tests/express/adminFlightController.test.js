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
    flight_ID: 52,
    departureTimeDate: "2024-12-23 12:02:00",
    arrivalTimeDate: "2024-12-25 16:03:45",
    timeZone: "CET",
    plane_ID: 4,
    departureAirport_ID: 6,
    destinationAirport_ID: 7,
    extraBaggagePrice: 2,
    flightInsurancePrice: 5,
    timezone_ID: 6,
    arrivalTimeZone_ID: 6,
    departureTimeZone_ID: 6,
  },
];

describe("Admin flight controller test cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /flights", async () => {
    const newFlight = mockData[0];

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

  it("POST /flights - insertion failure", async () => {
    const newFlight = {
      flight_ID: 53,
      departureTimeDate: "2023-01-09 12:00:00",
      arrivalTimeDate: "2023-01-09 16:00:00",
      timeZone: "CET",
      plane_ID: 3,
      departureAirport_ID: 6,
      destinationAirport_ID: 7,
      flightInsurancePrice: 0,
      timezone_ID: 6,
      arrivalTimeZone_ID: 6,
      departureTimeZone_ID: 6,
    };

    db.promise().query.mockRejectedValueOnce([
      new Error("Invalid insert flight"),
    ]);

    const response = await request(app).post("/api/flights").send(newFlight);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: "failed",
      message: "Invalid insert flight",
    });
  });
});
