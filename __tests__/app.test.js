const request = require("supertest");
const app = require("../app");

describe("Heating Service", () => {
  test("GET /api/heating - should respond with the temperature ", async () => {
    const { body } = await request(app).get("/api/heating").expect(200);

    expect(body.temperature).toBeGreaterThan(0);
  });

  test("POST /api/heating - should update the heating", async () => {
    const newHeating = { temperature: 35 }; // oooh thats hot!
    const { body } = await request(app)
      .post("/api/heating")
      .send(newHeating)
      .expect(201);

    expect(body.temperature).toEqual(35);
  });

  test("POST /api/lights/switch - should allow to swap the boolean status for a light with each id", async () => {
    const light = { id: 0 };
    const { body } = await request(app)
      .post("/api/lights/switch")
      .send(light)
      .expect(202);

    expect(body.light).toEqual({
      id: 0,
      location: "Living Room",
      status: true,
    });
  });
});

describe("Errors", () => {
  test("POST /api/lights - should return 400 if no location given", async () => {
    const response = await request(app).post("/api/lights").send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("No location included");
  });

  test("POST /api/lights/switch - should return 400 if no id given", async () => {
    const response = await request(app).post("/api/lights/switch").send({});
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("No ID included");
  });
  test("POST /api/lights/switch - should return 400 if id given is not a number", async () => {
    const response = await request(app)
      .post("/api/lights/switch")
      .send({ id: "0" });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("ID must be an integer");
  });
  test("POST /api/lights/switch - should return 404 if ID doesn't exist ", async () => {
    const response = await request(app)
      .post("/api/lights/switch")
      .send({ id: 10 });
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("ID not found");
  });
});
