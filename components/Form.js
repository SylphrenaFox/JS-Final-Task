import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {
    this.state = {
      amount: ''
    };

    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';
  
    const $label = document.createElement('label');
    $label.className = 'donate-form__input-label';
    $label.textContent = 'Введите сумму в $';

    this.$input = document.createElement('input');
    this.$input.className = 'donate-form__donate-input';
    this.$input.type = 'number';
    this.$input.min = '1';
    this.$input.max = '100';
    this.$input.required = true;

    this.$button = document.createElement('button');
    this.$button.className = 'donate-form__submit-button';
    this.$button.type = 'submit';
    this.$button.disabled = true;
    this.$button.textContent = 'Задонатить';

    $label.append(this.$input);
    this.$rootElement.append($label);
    this.$rootElement.append(this.$button);
    
    this.$input = this.$rootElement.querySelector('input');
    this.$button = this.$rootElement.querySelector('button');

    this.$input.addEventListener('input', this.handleInput.bind(this));
    this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

  get isValid() {
    if (this.state.amount >= 1 && this.state.amount <= 100) {
      return true;
    } else return false;
  }

  handleInput(event) {
    this.state.amount = event.target.value;
    if (this.isValid) {
      this.$button.disabled = false;
    } else {
      this.$button.disabled = true;
      }
    }

  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid) {
      this.props.onSubmit(Number(this.state.amount));
      this.state.amount = '';
      this.$input.value = '';
    }
  }
}