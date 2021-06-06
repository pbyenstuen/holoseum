const request = require("supertest");
const bcrypt = require("bcryptjs");
const { app, server } = require("../../src/server/server");
const User = require("../../src/server/models/User")

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

describe("hologram API", () => {
    test("POST /api/holograms/upload returns 401 if not authenticated", async () => {
        const file = new File(["tollvaktboden"], "tollvaktboden.mp4", { type: "video/mp4" });

        const formData = new FormData();
        formData.append("name", "tollvaktboden");
        formData.append("file", file);

        await request(app)
            .post("/api/holograms/upload")
            .send(formData)
            .expect(401);
    });

    test("GET /api/holograms returns 401 if not authenticated", async () => {
        await request(app)
            .get("/api/holograms")
            .expect(401);
    });

    test("DELETE /api/holograms/:name returns 401 if not authenticated", async () => {
        await request(app)
            .delete("/api/holograms/tollvaktboden")
            .send("tollvaktboden")
            .expect(401);
    });
});