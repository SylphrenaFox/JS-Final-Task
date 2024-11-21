import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup(props) {
    this.state = {
      total: 0,
      donates: []
    };
    
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const $totalAmountElement = document.createElement('h1');
    $totalAmountElement.className = 'total-amount';
    
    const $totalAmountSpan = document.createElement('span');
    $totalAmountSpan.textContent = this.state.total;

    $totalAmountElement.append($totalAmountSpan);
    this.$rootElement.append($totalAmountElement);

    this.$total = this.$rootElement.querySelector('span');
    
    const donateForm = new Form({onSubmit: this.onItemCreate.bind(this)});
    this.$rootElement.appendChild(donateForm.$rootElement);
    const donateList = new List();
    this.$rootElement.appendChild(donateList.$rootElement);

    this.donateList = donateList;
    this.onItemCreate = this.onItemCreate.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
  }
  
  onItemCreate(amount) {
    const item = new ListItem({
      amount: amount,
      onDelete: this.onItemDelete.bind(this)
    });

    this.state.donates.push(item);
    this.donateList.addItem(item);
    this.state.total += amount;
    this.$total.textContent = this.state.total;
  }

  onItemDelete(id) {
    const index = this.state.donates.findIndex(donate => donate.state.id === id);
    if (index > -1) {
      this.state.total -= this.state.donates[index].state.amount; 
      this.$total.textContent = this.state.total; 
      this.state.donates.splice(index, 1); 
      this.donateList.renderList(this.state.donates); 
    }
  }
}
