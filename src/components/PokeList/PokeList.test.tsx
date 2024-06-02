import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PokeList from './PokeList';
import { useGetAllPokemonDetailsQuery } from '../../services/pokemonAPI';
import createMockStore from './createMockStore';

jest.mock('../../services/pokemonAPI', () => ({
  useGetAllPokemonDetailsQuery: jest.fn(),
  pokemonApi: {
    reducerPath: 'pokemonApi',
  },
}));

describe('PokeList Component', () => {
  test('renders loading state initially', () => {
    (useGetAllPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(
      <Provider store={createMockStore({})}>
        <BrowserRouter>
          <PokeList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useGetAllPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
    });

    render(
      <Provider store={createMockStore({})}>
        <BrowserRouter>
          <PokeList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  test('renders pokemon list', async () => {
    (useGetAllPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: 'bulbasaur', sprites: { front_default: 'bulbasaur.png' } },
        { id: 2, name: 'ivysaur', sprites: { front_default: 'ivysaur.png' } },
      ],
      error: undefined,
      isLoading: false,
    });

    render(
      <Provider store={createMockStore({})}>
        <BrowserRouter>
          <PokeList />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  test('renders pokemon images', async () => {
    (useGetAllPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: 'bulbasaur', sprites: { front_default: 'bulbasaur.png' } },
        { id: 2, name: 'ivysaur', sprites: { front_default: 'ivysaur.png' } },
      ],
      error: undefined,
      isLoading: false,
    });

    render(
      <Provider store={createMockStore({})}>
        <BrowserRouter>
          <PokeList />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findAllByRole('img')).toHaveLength(2);
    expect(screen.getByAltText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByAltText('ivysaur')).toBeInTheDocument();
  });
});
