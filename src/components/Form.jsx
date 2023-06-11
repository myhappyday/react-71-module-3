import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class Form extends Component {
  state = {
    name: '',
    tag: '',
    experience: 'junior',
    licence: false,
  };

  nameInputId = nanoid();
  tagInputId = nanoid();

  handleChange = e => {
    // console.log(e.currentTarget);
    // console.log(e.currentTarget.name);
    // console.log(e.currentTarget.value);

    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log('state:', this.state);
    // setTimeout(() => {
    //   console.log('state 1:', this.state);
    // }, 1000);
    this.props.onSubmit(this.state);
    this.reset();
  };

  handleLicenceChange = e => {
    console.log(e.currentTarget.checked);

    this.setState({ licence: e.currentTarget.checked });
  };

  reset = () => {
    this.setState({
      name: '',
      tag: '',
      experience: 'junior',
      licence: false,
    });
  };
  // handleNameChange = event => {
  //   console.log(event.currentTarget.value);
  //   this.setState({
  //     name: event.currentTarget.value,
  //   });
  // };

  // handleTagChange = event => {
  //   console.log(event.currentTarget.value);
  //   this.setState({
  //     tag: event.currentTarget.value,
  //   });
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId}>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            // onChange={this.handleNameChange}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <br />
        <label htmlFor={this.tagInputId}>
          Nickname
          <input
            type="text"
            name="tag"
            value={this.state.tag}
            // onChange={this.handleTagChange}
            onChange={this.handleChange}
            id={this.tagInputId}
          />
        </label>

        <p>Your level:</p>
        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            onChange={this.handleChange}
            checked={this.state.experience === 'junior'}
          />
          Junior
        </label>

        <label>
          <input
            type="radio"
            name="experience"
            value="middle"
            onChange={this.handleChange}
            checked={this.state.experience === 'middle'}
          />
          Middle
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            onChange={this.handleChange}
            checked={this.state.experience === 'senior'}
          />
          Senior
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="licence"
            checked={this.state.licence}
            onChange={this.handleLicenceChange}
          />
          Accept the terms and conditions
        </label>

        <br />
        <button type="submit" disabled={!this.state.licence}>
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
