import React, { Component } from 'react';
import pizzaListQuery from '../queries/pizzaList';

import { graphql } from 'react-apollo';

class PizzaList extends Component {
    renderPizzas() {
        const { pizzaSizes } = this.props.data;
        return pizzaSizes.map(({ basePrice, name }) => {
            return (
                <li
                    onClick={() => {
                        this.props.setSelected({
                            name: name.toUpperCase(),
                            basePrice
                        });
                    }}
                    className="collection-item"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                    key={name}
                >
                    <p> {name} </p>
                    <p>{basePrice}$</p>
                </li>
            );
        });
    }
    render() {
        const { loading } = this.props.data;

        if (loading) {
            return <div> Loading Pizzas ..</div>;
        }
        return (
            <div>
                <h5> Select a Pizza</h5>
                <ul className="collection">{this.renderPizzas()}</ul>
                {Object.entries(this.props.selected).length > 0 && (
                    <h5>
                        {' '}
                        Selected Pizza: {this.props.selected.name}{' '}
                        {this.props.selected.basePrice} $
                    </h5>
                )}
            </div>
        );
    }
}

export default graphql(pizzaListQuery)(PizzaList);
