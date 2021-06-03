const supertest = require("supertest");
const app = require("../../src/server/server");
const request = supertest(app);

const credentials = {
    username: "admin",
    password: "admin123"
};

beforeAll(async () => {
    dbConnect();
    const user = new User(credentials);
    await user.save();
});

afterAll(async () => dbDisconnect());

describe("auth API", () => {
    it("can log in user", async () => {
        await request
            .post("/api/auth/login")
            .send(credentials)
            .expect(200);
    });

//     it("can log out user", async () => {
//         await request(app)
//             .post("/api/auth/signup")
//             .send(credentials)
//             .expect(201);

//         await request(app)
//             .post("/api/auth/login")
//             .send(credentials)
//             .expect(200)

//         await request(app)
//             .post("/api/auth/logout")
//             .expect(204);
//     });

//     it("returns 401 on fetching non-existent user", async () => {
//         await request(app)
//             .get("/api/auth/user")
//             .expect(401);
//     });

//     it("can return user info", async () => {
//         const user = request.agent(app);

//         await user
//             .post("/api/auth/signup")
//             .send(credentials)
//             .expect(201);

//         await user
//             .post("/api/auth/login")
//             .send(credentials)
//             .expect(200);

//         await user
//             .get("/api/auth/user")
//             .then((response) => {
//                 expect(response.body).toMatchObject({
//                     username: "realDonaldTrump",
//                     displayName: "realDonaldTrump"
//                 });
//             });
//     });
});