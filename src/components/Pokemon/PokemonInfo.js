import { Component } from 'react';
// import PokemonDataView from './PokemonDataView';
// import PokemonErrorView from './PokemonErrorView';
// import PokemonPendingView from './PokemonPendingView';
// import pokemonAPI from '../../services/pokemon-api';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default class PokemonInfo extends Component {
  state = {
     pokemon: null,
    // error: null,
    // status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      console.log("Змінилось ім'я покемона");
      // console.log('prevProps.pokemonName:', prevProps.pokemonName);
      // console.log('this.props.pokemonName:', this.props.pokemonName);
      fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`).then(res => res.json()).then(pokemon => this.setState({pokemon}));
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
    return (
      <div>
        <h2>PokemonInfo</h2>
        {/* <p>{this.props.pokemonName}</p> */}
        
        {this.state.pokemon && (<div>{this.state.pokemon.name}</div>)}
      </div>
    );
    // const { pokemon, error, status } = this.state;
    // const { pokemonName } = this.props;
    // if (status === 'idle') {
    //   return <div>Enter the pokemon's name.</div>;
    // }
    // if (status === 'pending') {
    //   return <PokemonPendingView pokemonName={pokemonName} />;
    // }
    // if (status === 'rejected') {
    //   return <PokemonErrorView message={error.message} />;
    // }
    // if (status === 'resolved') {
    //   return <PokemonDataView pokemon={pokemon} />;
    // }
  }
}
