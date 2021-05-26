const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const initPassport = async (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: "username"
        },
            async (username, password, done) => {
                const user = await User.findOne({ username: username });
                if (!user) {
                    return done(null, false);
                }
                try {
                    if (await bcrypt.compare(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                } catch (e) {
                    return done(e);
                }
            }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = initPassport;