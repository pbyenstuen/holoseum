import React from "react";
import ReactDOM from "react-dom";
import { act, isDOMComponent } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import ContactPage from "../src/client/components/ContactPage";

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

describe("ContactPage", () => {
    it("renders contact form", async () => {
        await mountComponent(<ContactPage />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("KONTAKT OSS");
        expect(isDOMComponent(container.querySelector("form"))).toEqual(true);
    });
});