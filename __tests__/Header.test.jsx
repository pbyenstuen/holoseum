import React from "react";
import ReactDOM from "react-dom";
import { act, isDOMComponent, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import Header from "../src/client/components/Header";

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

describe("Header", () => {
    it("renders unauthenticated view", async () => {
        await mountComponent(<Header user={undefined} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(isDOMComponent(container.querySelector("button"))).toEqual(false);
    });

    it("renders authenticated view", async () => {
        const user = {
            username: "tidvis"
        }

        await mountComponent(<Header user={user} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(isDOMComponent(container.querySelector("button"))).toEqual(true);
    });

    it("updates user on logout", async () => {
        const logOut = jest.fn();
        const updateUser = jest.fn();

        let user = {
            username: "tidvis"
        }
        
        const api = {
            auth: {
                logOut
            }
        }

        await mountComponent(<Header api={api} user={user} updateUser={updateUser} />);

        expect(isDOMComponent(container.querySelector("button"))).toEqual(true);
        
        await act(async () => {
            await Simulate.click(container.querySelector("button"));
        });
        
        expect(updateUser).toBeCalled();
    });
});