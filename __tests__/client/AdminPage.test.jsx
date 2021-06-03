import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import AdminPage from "../../src/client/components/AdminPage";

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

describe("AdminPage", () => {
    it("shows uploaded files", async () => {
        const api = {
            holo: {
                getHolograms: () => [{
                    _id: 0,
                    metadata: "Skipskranen"
                }]
            }
        }

        await mountComponent(<AdminPage api={api} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("p").textContent).toEqual("Skipskranen");
    });

    it("can upload new file", async () => {
        const uploadHologram = jest.fn();
        const file = new File(["tollvaktboden"], "tollvaktboden.mp4", { type: "video/mp4" });

        const api = {
            holo: {
                uploadHologram,
                getHolograms: () => [{
                    _id: 0,
                    metadata: "Skipskranen"
                }]
            }
        }

        await mountComponent(<AdminPage api={api} />);

        Simulate.change(container.querySelector("input[name='name']"), {
            target: { value: "Tollvaktboden" },
        });

        Simulate.change(container.querySelector("input[name='file']"), {
            target: { files: [file] },
        });

        await act(async () => {
            await Simulate.submit(container.querySelector("form"));
        });

        expect(uploadHologram).toBeCalled();
    });

    it("can show error message on uploading file", async () => {
        const file = new File(["tollvaktboden"], "tollvaktboden.mp4", { type: "video/mp4" });

        const api = {
            holo: {
                getHolograms: () => [{
                    _id: 0,
                    metadata: "Skipskranen"
                }],
                uploadHologram: () => {
                    throw new Error("Error");
                }
            }
        }

        await mountComponent(<AdminPage api={api} />);

        Simulate.change(container.querySelector("input[name='name']"), {
            target: { value: "Tollvaktboden" },
        });

        Simulate.change(container.querySelector("input[name='file']"), {
            target: { files: [file] },
        });

        await act(async () => {
            await Simulate.submit(container.querySelector("form"));
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Error: Error");
    });

    it("can delete file", async () => {
        const deleteHologram = jest.fn();

        const api = {
            holo: {
                deleteHologram,
                getHolograms: () => [{
                    _id: 0,
                    metadata: "Skipskranen"
                }]
            }
        }

        await mountComponent(<AdminPage api={api} />);

        await act(async () => {
            await Simulate.click(container.querySelector("#del-btn"));
        });

        expect(deleteHologram).toBeCalledWith({
            name: "Skipskranen"
        });
    });

    it("can show error message for empty fields", async () => {
        await mountComponent(<AdminPage />);

        Simulate.submit(container.querySelector("form"));

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Fyll inn alle feltene");
    });
});