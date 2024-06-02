import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { PokemonDetail } from '../../types/pokemon';
import { useGetPokemonByIdQuery } from '../../services/pokemonAPI';

const PokeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pokemonId = Number(id);

  // Check if the Pokemon details are already available in the store
  const storedPokemon = useSelector((state: RootState) =>
    (state.pokemonApi.queries[`getAllPokemonDetails(undefined)`]?.data as PokemonDetail[])?.find(
      (p: PokemonDetail) => p.id === pokemonId
    )
  );

  // Fetch the Pokemon details if not available in the store
  const { data: fetchedPokemon, error, isLoading } = useGetPokemonByIdQuery(pokemonId, {
    skip: !!storedPokemon,
  });

  const pokemon = storedPokemon || fetchedPokemon;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!pokemon) return <div>No data available</div>;

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h1 className="card-title text-capitalize">{pokemon.name}</h1>
      </div>
      <div className="card-body text-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="img-fluid mb-3" />
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Name: </strong> {pokemon.name}
          </li>
          <li className="list-group-item">
            <strong>Height: </strong> {pokemon.height * 10} cm
          </li>
          <li className="list-group-item">
            <strong>Weight: </strong> {pokemon.weight / 10} kg
          </li>
          <li className="list-group-item">
            <strong>Types: </strong>
            {pokemon.types.map((type) => type.type.name).join(', ')}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PokeDetail;
