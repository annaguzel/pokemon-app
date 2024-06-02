import React from "react";
import { useGetAllPokemonDetailsQuery } from "../../services/pokemonAPI";
import { Link } from "react-router-dom";

const PokeList: React.FC = () => {
  const { data, error, isLoading } = useGetAllPokemonDetailsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h1 className="card-title text-capitalize">PokeReact</h1>
      </div>
      <div className="list-group">
        {data!.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.name}
            className="list-group-item list-group-item-action d-flex align-items-center"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="img-fluid mr-3"
              style={{ width: "50px" }}
            />
            <span className="text-capitalize">{pokemon.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokeList;
