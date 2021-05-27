const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const initPassport = require("./config/passport-config");
const { connectDB } = require("./config/db-config");
const authApi = require("./routes/auth-api");
const hologramApi = require("./routes/hologram-api");
const mongoURI = "mongodb+srv://pbyenstuen:36sEry595qQJajE@cluster0.mkdfd.mongodb.net/smidig-prosjekt?retryWrites=true&w=majority";

initPassport(passport);
connectDB();

const app = express();

app.use(
    session({
        secret: "dfg&546Rytr$%!$#%gfd56fgH&",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: mongoURI })
    })
);

app.use(cookieParser("dfg&546Rytr$%!$#%gfd56fgH&"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authApi)
app.use("/api/holograms", hologramApi)

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
    } else {
        next();
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}`);
});