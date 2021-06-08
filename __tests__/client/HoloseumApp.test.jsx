import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import HoloseumApp from "../../src/client/components/HoloseumApp";

require('react-router-dom').BrowserRouter = ({ children }) => <div>{children}</div>

let container;

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }))
    });
});

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

describe("HoloseumApp", () => {
    it("routes to NotFound component on invalid path", async () => {
        const api = {
            auth: {
                getUser: () => ({
                    username: "tidvis",
                })
            }
        }

        await mountComponent(<HoloseumApp api={api} />, "/nothing");

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

        await mountComponent(<HoloseumApp api={api} />, "/");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h1").textContent).toEqual("HOLOSEUM");
    });

    it("renders login component on attempt to access protected route unauthenticated", async () => {
        const api = {
            auth: {
                getUser: () => {
                    return undefined;
                }
            }
        }

        await mountComponent(<HoloseumApp api={api} />, "/admin");

        expect(container.querySelector("h2").textContent).toEqual("Admin - Logg Inn");
    });

    it("gives access to protected route if authenticated", async () => {
        const api = {
            auth: {
                getUser: () => {
                    return "tidvis";
                }
            }
        }

        await mountComponent(<HoloseumApp api={api} />, "/admin");

        expect(container.querySelector("h2").textContent).toEqual("Last opp hologram");
    });
});