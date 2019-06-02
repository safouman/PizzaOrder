import React, { Component } from 'react';
import ToppingSelection from './ToppingSelection';
import PizzaList from './PizzaList';
import Cart from './Cart';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            pizzas: []
        };
        this.setSelected = this.setSelected.bind(this);
        this.setPizza = this.setPizza.bind(this);
        this.deletePizza = this.deletePizza.bind(this);
    }
    deletePizza(i) {
        let pizzas = this.state.pizzas;

        if (i > -1) {
            pizzas.splice(i, 1);
        }
        this.setState({ pizzas });
    }
    setSelected(selected) {
        this.setState({
            selected: selected
        });
    }
    setPizza(pizza) {
        let currentPizzas = this.state.pizzas;
        currentPizzas.push(pizza);
        this.setState({ pizzas: currentPizzas, selected: {} });
    }
    render() {
        const { selected, pizzas } = this.state;

        return (
            <div className="container">
                <h4>This is a pizza order page</h4>
                <div>
                    <Cart pizzas={pizzas} deletePizza={this.deletePizza} />
                    <PizzaList
                        selected={selected}
                        setSelected={this.setSelected}
                    />
                    {Object.entries(selected).length > 0 && (
                        <ToppingSelection
                            onSubmit={this.setPizza}
                            selected={selected}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
