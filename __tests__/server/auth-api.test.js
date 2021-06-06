const request = require("supertest");
const bcrypt = require("bcryptjs");
const { app, server } = require("../../src/server/server");
const User = require("../../src/server/models/User")
const agent = request.agent(app);

const credentials = {
    username: "admin",
    password: "admin123"
};

beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const user = new User({
        username: credentials.username,
        password: hashedPassword
    });
    await user.save();
});

afterAll(async () => {
    User.deleteOne({ username: credentials.username }, (err) => {
        if (err) console.log(err);
    });

    try {
        await server.close();
    } catch (error) {
        console.error(error);
        throw error;
    }
});

describe("auth API", () => {
    it("can log in user", async () => {
        await agent
            .post("/api/auth/login")
            .send(credentials)
            .expect(200);
    });

    it("can log out user", async () => {
        await agent
            .post("/api/auth/login")
            .send(credentials)
            .expect(200);

        await agent
            .post("/api/auth/logout")
            .expect(204);
    });

    it("returns 401 on fetching non-existent user", async () => {
        await request(app)
            .get("/api/auth/user")
            .expect(401);
    });

    it("can return user info", async () => {
        await agent
            .post("/api/auth/login")
            .send(credentials)
            .expect(200);

        await agent
            .get("/api/auth/user")
            .then((response) => {
                expect(response.body).toMatch("admin");
            });
    });
});