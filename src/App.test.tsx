import React from "react";
import { render, screen } from "@testing-library/react";
import { AssetSearchCard } from "./components/AssetSearchCard";
import { AssetSearchResultModal } from "./modal/Asset";
import { BrowserRouter as Router } from "react-router-dom";

test("renders AssetSearchCard", () => {
  const mockAsset: AssetSearchResultModal = {
    data: [
      {
        nasa_id: "test_id",
        title: "Test title",
        media_type: "",
      },
    ],
    links: [],
  };
  render(
    <Router>
      <AssetSearchCard asset={mockAsset} />
    </Router>,
  );
  const titleElement = screen.getByTestId("asset-search-card-title");

  expect(titleElement.textContent).toEqual("Test title");
});
