const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const studentRouter = require("../routes/student");
const Student = require("../models/Student");

const app = express();
app.use(express.json());

app.use("/api", studentRouter);

describe("Student Router API testing", () => {
  let mongoServer;

  // connect mongodb in memory
  beforeAll(async () => {
    // create virtual database
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // clear data before each test
  beforeEach(async () => {
    await Student.deleteMany({});
  });

  // disconnect
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("GET /api/index return 200 and empty array when db empty", async () => {
    const res = await request(app).get("/api/index");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("GET /api/index return all students when db not empty", async () => {
    // seed
    await Student.create([
      { first_name: "Peter", last_name: "Parker" },
      { first_name: "Harry", last_name: "Potter" },
    ]);
    const res = await request(app).get("/api/index");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].first_name).toBe("Peter");
    expect(res.body[1].last_name).toBe("Potter");
  });
});
