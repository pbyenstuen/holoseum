import React from "react";
import ReactDOM from "react-dom";
import { act, isDOMComponent, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import ContactPage from "../../src/client/components/landing-page/ContactPage";

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

const mountComponent = async (component) => {
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
    });
}

describe("ContactPage", () => {
    it("renders contact form", async () => {
        await mountComponent(<ContactPage />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("KONTAKT OSS");
        expect(isDOMComponent(container.querySelector("form"))).toEqual(true);
    });

    it("can submit name, email and message", async () => {
        await mountComponent(<ContactPage />);

        Simulate.change(container.querySelector("input[name='name']"), {
            target: { value: "Test" },
        });

        Simulate.change(container.querySelector("input[name='email']"), {
            target: { value: "test@test.no" },
        });

        Simulate.change(container.querySelector("textarea"), {
            target: { value: "Jeg er interessert!" },
        });

        await act(async () => {
            Simulate.submit(container.querySelector("form"));
        });

        expect(container.querySelector("input[name='name']").textContent).toEqual("");
        expect(container.querySelector("input[name='email']").textContent).toEqual("");
        expect(container.querySelector("textarea").textContent).toEqual("");
    });

    it("can show error message for empty fields", async () => {
        await mountComponent(<ContactPage />);

        await act(async () => {
            await Simulate.submit(container.querySelector("form"));
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Vennligst fyll inn alle feltene");
    });
});
