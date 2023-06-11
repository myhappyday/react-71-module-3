import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    // console.log('e.code:', e.code);
    if (e.code === 'Escape') {
      // console.log('Click ESC, need to close the modal');

      // Викликає метод закриття модалки, переданої як пропс з App
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClick = event => {
    // console.log('Click on backdrop');

    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);
    // Закриття мрдалки при клацанні на backdrop
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    // return (
    //   <div className="Modal__backdrop">
    //     <div className="Modal__content">{this.props.children}</div>
    //   </div>
    // );

    // Виносимо модалку і рендеримо в портал для модалок в #modal-root

    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
