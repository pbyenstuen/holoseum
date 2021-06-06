import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import HologramView from "../../src/client/components/HologramView";

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

describe("HologramView", () => {
    it("can show error", async () => {
        const api = {
            holo: {
                getHologram: () => {
                    throw new Error("Error");
                }
            }
        }

        await mountComponent(<HologramView api={api} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("p").textContent).toEqual("Noe gikk galt: Error: Error");
    });
});