import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PokeDetail from "./PokeDetail";
import { useGetPokemonByIdQuery } from "../../services/pokemonAPI";
import createMockStore from "../PokeList/createMockStore";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn() as jest.Mock,
}));

jest.mock("../../services/pokemonAPI", () => ({
  useGetPokemonByIdQuery: jest.fn(),
  pokemonApi: {
    reducerPath: "pokemonApi",
  },
}));

describe("PokeDetail Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  test("renders loading state initially", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(undefined);
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    act(() => {
      render(
        <Provider store={createMockStore({})}>
          <BrowserRouter>
            <PokeDetail />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(undefined);
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
    });

    act(() => {
      render(
        <Provider store={createMockStore({})}>
          <BrowserRouter>
            <PokeDetail />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(screen.getByText("Error loading data")).toBeInTheDocument();
  });

  test("renders no data state", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(undefined);
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    act(() => {
      render(
        <Provider store={createMockStore({})}>
          <BrowserRouter>
            <PokeDetail />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("renders pokemon details from store", () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
      height: 7,
      weight: 69,
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      sprites: { front_default: "bulbasaur.png" },
    };

    (useSelector as unknown as jest.Mock).mockReturnValue(mockPokemon);
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    act(() => {
      render(
        <Provider store={createMockStore({})}>
          <BrowserRouter>
            <PokeDetail />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(
      screen.getByRole("heading", { name: /bulbasaur/i })
    ).toBeInTheDocument();
  });

  test("renders pokemon details from API", () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
      height: 7,
      weight: 69,
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      sprites: { front_default: "bulbasaur.png" },
    };

    (useSelector as unknown as jest.Mock).mockReturnValue(undefined);
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
    });

    act(() => {
      render(
        <Provider store={createMockStore({})}>
          <BrowserRouter>
            <PokeDetail />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(
      screen.getByRole("heading", { name: /bulbasaur/i })
    ).toBeInTheDocument();
  });
});
