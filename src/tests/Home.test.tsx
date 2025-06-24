import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home", () => {
  it("should render heading <h1>", () => {
    render(<Home />);
  });
});
