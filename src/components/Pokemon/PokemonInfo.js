import { Component } from 'react';
import PokemonDataView from './PokemonDataView';
import PokemonErrorView from './PokemonErrorView';
import PokemonPendingView from './PokemonPendingView';
import pokemonAPI from '../../services/pokemon-api';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'idle',
    // status: Status.IDLE,
    // loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      // console.log("Змінилось ім'я покемона");
      // console.log('prevProps.pokemonName:', prevProps.pokemonName);
      // console.log('this.props.pokemonName:', this.props.pokemonName);

      // this.setState({ loading: true, pokemon: null });
      // setTimeout(() => {
      //   fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
      //     .then(response => {
      //       if (response.ok) {
      //         return response.json();
      //       }

      //       return Promise.reject(
      //         new Error(`Немає покемона з ім'ям ${nextName}`)
      //       );
      //     })
      //     .then(pokemon => this.setState({ pokemon }))
      //     .catch(error => this.setState({ error }))
      //     .finally(() => this.setState({ loading: false }));
      // }, 1000);

      // state machine
      // this.setState({ status: 'pending' });
      // setTimeout(() => {
      //   fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
      //     .then(response => {
      //       if (response.ok) {
      //         return response.json();
      //       }

      //       return Promise.reject(
      //         new Error(`Немає покемона з ім'ям ${nextName}`)
      //       );
      //     })
      //     .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
      //     .catch(error => this.setState({ error, status: 'rejected' }));
      // }, 1000);

    this.setState({ status: 'pending' });
      setTimeout(() => {
        pokemonAPI
          .fetchPokemon(nextName)
          .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);

    }

    // const prevName = prevProps.pokemonName;
    // const nextName = this.props.pokemonName;
    // if (prevName !== nextName) {
    //   this.setState({ status: Status.PENDING });
    //   setTimeout(() => {
    //     pokemonAPI
    //       .fetchPokemon(nextName)
    //       .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
    //       .catch(error => this.setState({ error, status: Status.REJECTED }));
    //   }, 3000);
    // }
  }

  render() {
    // const { pokemon, error, loading } = this.state;
    // return (
    //   <div>
    //     <h2>PokemonInfo</h2>
    //     {/* <p>{this.props.pokemonName}</p> */}
    //     {/* {error && <h3>Все пропало, покемона з ім'ям {pokemonName} немає</h3>} */}
    //     {error && <h3>{error.message}</h3>}
    //     {loading && <h3>Loading...</h3>}
    //     {!pokemonName && <div>Enter the pokemon's name</div>}
    //     {pokemon && (
    //       <div>
    //         <p>{pokemon.name}</p>
    //         <img
    //           src={pokemon.sprites.other['official-artwork'].front_default}
    //           alt={pokemon.name}
    //           width="240"
    //           height="240"
    //         />
    //       </div>
    //     )}
    //   </div>
    // );

    // state machine
    // const { pokemon, error, status } = this.state;

    // if (status === 'idle') {
    //   return <div>Enter the pokemon's name</div>;
    // }
    // if (status === 'pending') {
    //   return <h3>Loading...</h3>;
    // }
    // if (status === 'rejected') {
    //   return <h3>{error.message}</h3>;
    // }
    // if (status === 'resolved') {
    //   return (
    //     <div>
    //       <p>{pokemon.name}</p>
    //       <img
    //         src={pokemon.sprites.other['official-artwork'].front_default}
    //         alt={pokemon.name}
    //         width="240"
    //         height="240"
    //       />
    //     </div>
    //   );
    // }
    // Винесли розмітку в окремі компоненти
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;
    if (status === 'idle') {
      return <div>Enter the pokemon's name.</div>;
    }
    if (status === 'pending') {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }
    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }
    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}
