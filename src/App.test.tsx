import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

afterEach(() => cleanup());

describe("account settings form", () => {
  it("saves valid settings and announces success", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.clear(screen.getByRole("textbox", { name: "Full name" }));
    await user.type(screen.getByRole("textbox", { name: "Full name" }), "Boni Nxumalo");
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(screen.getByRole("status")).toHaveTextContent("Your settings have been saved.");
  });

  it("rejects a blank or whitespace-only name", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.clear(screen.getByRole("textbox", { name: "Full name" }));
    await user.type(screen.getByRole("textbox", { name: "Full name" }), "   ");
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Full name" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("status")).not.toHaveTextContent("Your settings have been saved.");
  });

  it("rejects a missing email address", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.clear(screen.getByRole("textbox", { name: "Email address" }));
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
  });

  it("rejects a malformed email address", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.clear(screen.getByRole("textbox", { name: "Email address" }));
    await user.type(screen.getByRole("textbox", { name: "Email address" }), "not-an-email");
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
  });

  it("clears the relevant error when the user corrects the field", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.clear(screen.getByRole("textbox", { name: "Full name" }));
    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: "Full name" }), "Boni Nxumalo");
    expect(screen.queryByText("Enter your full name.")).not.toBeInTheDocument();
  });
});
