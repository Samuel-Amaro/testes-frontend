import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renderiza titulo app", () => {
  render(<App />);
  const titleElement = screen.getByText(/Testes Front-End/i);
  expect(titleElement).toBeInTheDocument;
});
