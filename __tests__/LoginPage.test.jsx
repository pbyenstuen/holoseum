import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import LoginPage from "../src/client/components/LoginPage";

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const mountComponent = async (component) => {
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
    });
}

describe("LoginPage", () => {
    it("can submit username and password", async () => {
        const logIn = jest.fn();
        const updateUser = jest.fn();

        const api = {
            auth: {
                logIn
            }
        }

        await mountComponent(<LoginPage api={api} updateUser={updateUser} />);

        Simulate.change(container.querySelector("input[name='username']"), {
            target: { value: "realDonaldTrump" },
        });

        Simulate.change(container.querySelector("input[name='password']"), {
            target: { value: "yourefired" },
        });

        await act(async () => {
            Simulate.submit(container.querySelector("form"));
        });

        expect(logIn).toBeCalledWith({
            username: "realDonaldTrump",
            password: "yourefired",
        });
    });

    it("can show error message", async () => {
        const api = {
            auth: {
                logIn: () => {
                    throw new Error("Feil brukernavn/passord");
                }
            }
        }

        await mountComponent(<LoginPage api={api} />);

        Simulate.change(container.querySelector("input[name='username']"), {
            target: { value: "realDonaldTrump" },
        });

        Simulate.change(container.querySelector("input[name='password']"), {
            target: { value: "yourehired" },
        });

        await act(async () => {
            await Simulate.submit(container.querySelector("form"));
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Error: Feil brukernavn/passord");
    });

    it("can show error message for empty fields", async () => {
        await mountComponent(<LoginPage />);

        await act(async () => {
            await Simulate.submit(container.querySelector("form"));
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Vennligst fyll inn begge feltene");
    });
});