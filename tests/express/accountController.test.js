const request = require("supertest");
const app = require("../../app/index");
const db = require("../../app/database");
const bcrypt = require("bcrypt");

jest.mock("../../app/database", () => ({
  promise: jest.fn().mockReturnThis(),
  query: jest.fn(),
  connect: jest.fn(),
}));

jest.mock("bcrypt");

const mockUserData = {
  email: "test@example.com",
  password: "password123",
  firstName: "John",
  lastName: "Doe",
};

const mockAdminData = {
  email: "admin@example.com",
  passwordHash: "$2b$10$N2iPH/HoBJqLMthU6eC0GeaVSxSNSE3jKL.IJqffsJt9RvvvHw/Wm",
};


describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should sign up a new user", async () => {
    db.promise().query
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([{ affectedRows: 1 }]);

    const response = await request(app)
      .post("/api/signup")
      .send(mockUserData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User registered successfully.");
  });

  it("should handle existing user during sign up", async () => {
    db.promise().query.mockResolvedValueOnce([{ length: 1 }]);
  
    const response = await request(app)
      .post("/api/signup")
      .send(mockUserData);
  
    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Email is already registered. Please log in.");
  });

  it("should log in an existing user", async () => {
    const mockUser = {
      email: "test@example.com",
      passwordHash: "$2b$10$N2iPH/HoBJqLMthU6eC0GeaVSxSNSE3jKL.IJqffsJt9RvvvHw/Wm",
    };

    db.promise().query
      .mockResolvedValueOnce([[mockUser]]);
    bcrypt.compare.mockResolvedValueOnce(true);

    const response = await request(app)
      .post("/api/login")
      .send({
        email: mockUserData.email,
        password: mockUserData.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should handle invalid login credentials", async () => {
    const mockUser = {
      email: "test@example.com",
      passwordHash: "$2b$10$N2iPH/HoBJqLMthU6eC0GeaVSxSNSE3jKL.IJqffsJt9RvvvHw/Wm",
    };

    db.promise().query.mockResolvedValueOnce([[mockUser]]);
    bcrypt.compare.mockResolvedValueOnce(false);

    const response = await request(app)
      .post("/api/login")
      .send({
        email: mockUserData.email,
        password: "wrongPassword",
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Invalid login credentials.");
  });

  it("should get all accounts", async () => {
    const mockData = [{ accountId: 1, email: "test1@example.com" }];
    db.promise().query.mockResolvedValueOnce([mockData]);

    const response = await request(app).get("/api/accounts");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.results).toBe(mockData.length);
    expect(response.body.data.accounts).toEqual(mockData);
  });

  it("should get an account by ID", async () => {
    const accountId = 1;
    const mockData = [
      {
        account_ID: 1,
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        passwordHash: "sifra123",
        phoneNumber: "+123456789",
        country_ID: 1,
      },
    ];
    db.promise().query.mockResolvedValueOnce([mockData]);

    const response = await request(app).get(`/api/accounts/${accountId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.account).toEqual(mockData);
  });

  it("should handle account not found by ID", async () => {
    const accountId = 1;
    db.promise().query.mockResolvedValueOnce([[]]);

    const response = await request(app).get(`/api/accounts/${accountId}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("failed to get account");
    expect(response.body.message).toBe("Account not found");
  });

  it("should handle successful account addition", async () => {
    const mockAccountData = {
      email: "newaccount@example.com",
      passwordHash: "$2b$10$N2iPH/HoBJqLMthU6eC0GeaVSxSNSE3jKL.IJqffsJt9RvvvHw/Wm",
      firstName: "New",
      lastName: "Account",
    };

    db.promise().query.mockResolvedValueOnce([]);

    const response = await request(app)
      .post("/api/accounts")
      .send(mockAccountData);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });

  it("should handle failed account addition", async () => {
    const mockAccountData = {
      email: "newaccount@example.com",
      passwordHash: "$2b$10$N2iPH/HoBJqLMthU6eC0GeaVSxSNSE3jKL.IJqffsJt9RvvvHw/Wm",
      firstName: "New",
      lastName: "Account",
    };

    db.promise().query.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .post("/api/accounts")
      .send(mockAccountData);

    expect(response.status).toBe(500);
    expect(response.body.status).toBe("failed to add account");
    expect(response.body.message).toBeDefined();
  });
});

describe("Login Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should login an admin successfully", async () => {
    db.promise().query.mockResolvedValueOnce([[mockAdminData]]);
    bcrypt.compare.mockResolvedValueOnce(true);

    const response = await request(app)
      .post("/api/login")
      .send({
        email: mockAdminData.email,
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should handle inactive admin account", async () => {
    const inactiveAdmin = { ...mockAdminData, active: false };
    db.promise().query.mockResolvedValueOnce([[inactiveAdmin]]);

    const response = await request(app)
        .post("/api/login")
        .send({
            email: inactiveAdmin.email,
            password: "password123",
        });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Invalid login credentials.");
});


  it("should login a user successfully", async () => {
    db.promise().query.mockResolvedValueOnce([[mockUserData]]);
    bcrypt.compare.mockResolvedValueOnce(true);

    const response = await request(app)
      .post("/api/login")
      .send({
      email: "nonexistent@example.com",
      password: "password123",
  });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  it("should handle invalid login credentials", async () => {
    db.promise().query.mockResolvedValueOnce([[mockUserData]]);
    bcrypt.compare.mockResolvedValueOnce(false);

    const response = await request(app)
      .post("/api/login")
      .send({
        email: mockUserData.email,
        password: "wrongPassword",
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Invalid login credentials.");
  });

  it("should handle internal server error", async () => {
    db.promise().query.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app)
      .post("/api/login")
      .send({
        email: mockAdminData.email,
        password: "password123",
      });

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
