import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import App from "../src/client/components/App";

require('react-router-dom').BrowserRouter = ({ children }) => <div>{children}</div>

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const mountComponent = async (component, entries) => {
    await act(async () => {
        await ReactDOM.render(<MemoryRouter initialEntries={[entries]}>{component}</MemoryRouter>, container);
    });
}

describe("App", () => {
    it("routes to NotFound component on invalid path", async () => {
        const api = {
            auth: {
                getUser: () => ({
                    username: "tidvis",
                })
            }
        }

        await mountComponent(<App api={api} />, "/nothing");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h1").textContent).toEqual("404");
    });

    it("can route to correct path", async () => {
        const api = {
            auth: {
                getUser: () => ({
                    username: "tidvis",
                })
            }
        }

        await mountComponent(<App api={api} />, "/");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h1").textContent).toEqual("HOLOSEUM");
    });

    it("renders login component on attempt to access protected route while unauthenticated", async () => {
        const api = {
            auth: {
                getUser: () => {
                    return undefined;
                }
            }
        }

        await mountComponent(<App api={api} />, "/admin");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("Admin - Logg Inn");
    });

    it("gives access to protected route while authenticated", async () => {
        const api = {
            auth: {
                getUser: () => {
                    return "tidvis";
                }
            }
        }

        await mountComponent(<App api={api} />, "/admin");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("Last opp hologram");
    });
});