const request = require("supertest");
const app = require("./app");

describe("Node.js Express API", () => {
    
    // Test GET /
    describe("GET /", () => {
        it("should return application information", async () => {
            const response = await request(app)
                .get("/");

            expect(response.statusCode).toBe(200);

            expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("environment");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("hostname");
        });
    });


    // Test GET /health
    describe("GET /health", () => {
        it("should return healthy status", async () => {
            const response = await request(app)
                .get("/health");

            expect(response.statusCode).toBe(200);

            expect(response.body).toEqual({
                status: "healthy"
            });
        });
    });


    // Test POST /message
    describe("POST /message", () => {
        it("should create a new message", async () => {
            const response = await request(app)
                .post("/message")
                .send({
                    text: "Hello Jest"
                });

            expect(response.statusCode).toBe(201);

            expect(response.body).toEqual({
                id: expect.any(Number),
                text: "Hello Jest",
                createdAt: expect.any(String)
            });
        });
    });


    // Test GET /messages
    describe("GET /messages", () => {
        it("should return messages", async () => {
            const response = await request(app)
                .get("/messages");

            expect(response.statusCode).toBe(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });


    // Test POST + GET together
    describe("Message API", () => {
        it("should save and retrieve a message", async () => {

            await request(app)
                .post("/message")
                .send({
                    text: "Testing message"
                });

            const response = await request(app)
                .get("/messages");

            expect(response.statusCode).toBe(200);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        text: "Testing message"
                    })
                ])
            );
        });
    });
});