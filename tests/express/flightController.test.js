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


});
