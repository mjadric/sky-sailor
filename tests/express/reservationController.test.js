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
    flightId: 1,
    accountId: 1,
    seatId: 1,
    extraBaggage: 0,
    flightInsurance: 0,
  },
];

describe("Reservation controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /reservations", async () => {
    db.query.mockResolvedValueOnce([mockData]);

    const res = await request(app).get("/api/reservations").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      results: mockData.length,
      data: {
        reservations: mockData,
      },
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM RESERVATION");
  });

  it("GET /reservations - no reservations found", async () => {
    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app).get("/api/reservations").send();

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: "failed to get all reservations",
      message: "No reservations found",
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM RESERVATION");
  });

  it("GET /reservations - error during retrieval", async () => {
    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app).get("/api/reservations").send();

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to get all reservations",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM RESERVATION");
  });

  it("GET /reservations/:id", async () => {
    const reservation_ID = 1;
    const mockReservation = mockData[0];

    db.query.mockResolvedValueOnce([mockReservation]);

    const res = await request(app)
      .get(`/api/reservations/${reservation_ID}`)
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      data: {
        reservation: mockReservation,
      },
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM RESERVATION WHERE reservation_ID = ${reservation_ID}`
    );
  });

  it("GET /reservations/:id - reservation not found", async () => {
    const reservation_ID = 666;
    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app)
      .get(`/api/reservations/${reservation_ID}`)
      .send();

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: "failed to get reservation",
      message: "Reservation not found",
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM RESERVATION WHERE reservation_ID = ${reservation_ID}`
    );
  });

  it("GET /reservations/:id - error during retrieval", async () => {
    const reservation_ID = 1;
    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app)
      .get(`/api/reservations/${reservation_ID}`)
      .send();

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to get reservation",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM RESERVATION WHERE reservation_ID = ${reservation_ID}`
    );
  });

  it("POST /reservations", async () => {
    const flightId = 1;
    const accountId = 1;
    const seatId = 1;
    const extraBaggage = 0;
    const flightInsurance = 0;

    const mockReservation = mockData[0];

    db.query.mockResolvedValueOnce([mockReservation]);

    const res = await request(app)
      .post(`/api/reservations`)
      .send(mockReservation);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      status: "success",
      data: {
        reservation: mockReservation,
      },
    });

    expect(db.query).toHaveBeenCalledWith(
      `CALL add_reservation (?, ?, ?, ?, ?)`,
      [flightId, accountId, seatId, extraBaggage, flightInsurance]
    );
  });

  it("POST /reservations - invalid reservation", async () => {
    const mockReservation = {
      flightId: "invalid",
    };

    const res = await request(app)
      .post(`/api/reservations`)
      .send(mockReservation);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      status: "failed to add reservation",
      message: "Invalid reservation data",
    });

    expect(db.query).not.toHaveBeenCalled();
  });

  it("POST /reservations - error during insertion", async () => {
    const flightId = 1;
    const accountId = 1;
    const seatId = 1;
    const extraBaggage = 0;
    const flightInsurance = 0;

    const mockReservation = mockData[0];

    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app)
      .post(`/api/reservations`)
      .send(mockReservation);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to add reservation",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith(
      `CALL add_reservation (?, ?, ?, ?, ?)`,
      [flightId, accountId, seatId, extraBaggage, flightInsurance]
    );
  });
});
