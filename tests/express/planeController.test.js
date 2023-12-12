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
    plane_ID: 1,
    numberOfSeats: 100,
  },
  {
    plane_ID: 2,
    numberOfSeats: 200,
  },
];

describe("Plane controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /planes", async () => {
    db.query.mockResolvedValueOnce([mockData]);

    const res = await request(app).get("/api/planes").send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      results: mockData.length,
      data: {
        planes: mockData,
      },
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM PLANE");
  });

  it("GET /planes - no planes found", async () => {
    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app).get("/api/planes").send();

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: "failed to get all planes",
      message: "No planes found",
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM PLANE");
  });

  it("GET /planes - error during retrieval", async () => {
    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app).get("/api/planes").send();

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to get all planes",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM PLANE");
  });

  it("GET /planes/:id", async () => {
    const plane_ID = 1;
    const mockPlane = mockData[0];

    db.query.mockResolvedValueOnce([mockPlane]);

    const res = await request(app).get(`/api/planes/${plane_ID}`).send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      data: {
        plane: mockPlane,
      },
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM PLANE WHERE plane_ID = ${plane_ID}`
    );
  });

  it("GET /planes/:id - error during retrieval", async () => {
    const plane_ID = 1;
    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app).get(`/api/planes/${plane_ID}`).send();

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to get plane",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM PLANE WHERE plane_ID = ${plane_ID}`
    );
  });

  it("GET /planes/:id - plane not found", async () => {
    const plane_ID = 2;

    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app).get(`/api/planes/${plane_ID}`).send();

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: "failed to get plane",
      message: "Plane not found",
    });

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM PLANE WHERE plane_ID = ${plane_ID}`
    );
  });

  it("POST /planes", async () => {
    const mockPlane = mockData[0];

    db.query.mockResolvedValueOnce([mockPlane]);

    const res = await request(app).post(`/api/planes`).send(mockPlane);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "success",
      data: {
        plane: mockPlane,
      },
    });

    expect(db.query).toHaveBeenCalledWith("INSERT INTO PLANE SET ?", mockPlane);
  });

  it("POST /planes - invalid plane", async () => {
    const mockPlane = {};

    const res = await request(app).post(`/api/planes`).send(mockPlane);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      status: "failed to add plane",
      message: "Invalid number of seats",
    });

    expect(db.query).not.toHaveBeenCalled();
  });

  it("POST /planes - error during insertion", async () => {
    const mockPlane = mockData[0];

    db.query.mockRejectedValueOnce(new Error("database error"));

    const res = await request(app).post(`/api/planes`).send(mockPlane);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      status: "failed to add plane",
      message: "database error",
    });

    expect(db.query).toHaveBeenCalledWith("INSERT INTO PLANE SET ?", mockPlane);
  });
});
