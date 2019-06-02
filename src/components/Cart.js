import React, { Component } from 'react';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Total: 0
        };
        this.priceCalculator = this.priceCalculator.bind(this);
    }
    priceCalculator() {
        const { pizzas } = this.props;

        var Total = 0;
        for (let i = 0; i < pizzas.length; i++) {
            Total = Total + pizzas[i].pizza.basePrice;

            for (let j = 0; j < pizzas[i].toppings.length; j++) {
                Total = Total + pizzas[i].toppings[j].price;
            }
        }

        this.setState({ Total });
    }
    componentWillReceiveProps(props) {
        this.priceCalculator();
    }
    onDelete(i) {
        this.props.deletePizza(i);
    }
    renderPizzas() {
        const { pizzas } = this.props;
        return pizzas.map(({ pizza, toppings }, i) => {
            return (
                <li key={i} className="collection-item">
                    <div>
                        <ul className="collection">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                {pizza.name} X {pizza.basePrice} $
                                <i
                                    style={{ cursor: 'pointer' }}
                                    className="material-icons "
                                    onClick={() => this.onDelete(i)}
                                >
                                    delete
                                </i>
                            </div>
                            {toppings.map((item, i) => {
                                return (
                                    <li key={i} className="collection-item">
                                        {item.name} X {item.price} $
                                    </li>
                                );
                            })}{' '}
                        </ul>
                    </div>
                </li>
            );
        });
    }
    render() {
        const { pizzas } = this.props;

        return (
            <div>
                <h5>Cart</h5>
                {pizzas.length === 0 ? (
                    <ul className="collection">
                        <li className="collection-item">
                            <p> Add your Pizzas and they will appear here</p>
                        </li>
                    </ul>
                ) : (
                    <ul className="collection">{this.renderPizzas()}</ul>
                )}
                <h5> Total : {this.state.Total} $</h5>
            </div>
        );
    }
}
export default Cart;
