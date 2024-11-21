import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount
    }

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';

    this.$rootElement.textContent = `${this.state.date}`;
    
    const amountElement = document.createElement('b');
    amountElement.textContent = `$${this.state.amount}`;
    
    this.$rootElement.append(amountElement);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Удалить';
    
    deleteButton.addEventListener('click', () => {
      if (props.onDelete) {
        props.onDelete(this.state.id); 
      }
    });
    this.$rootElement.append(deleteButton);
  }
}

