import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import pizzaSizeByName from '../queries/pizzaSizeByName';

class ToppingSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Toppings: []
        };
        this.selectTopping = this.selectTopping.bind(this);
        this.renderToppings = this.renderToppings.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.loading) {
            this.setDefaultToppings(nextProps);
        }
    }
    componentDidMount() {
        if (!this.props.data.loading) {
            this.setDefaultToppings(this.props);
        }
    }
    setDefaultToppings(props) {
        const { toppings } = props.data.pizzaSizeByName;
        let defaultToppings = [];

        toppings.map(({ defaultSelected, topping }) => {
            if (defaultSelected) {
                defaultToppings.push({
                    name: topping.name,
                    price: topping.price,
                    checked: defaultSelected
                });
            }
        });

        this.setState({ Toppings: defaultToppings });
    }
    selectTopping(event) {
        if (!this.props.data.loading && this.props.data.pizzaSizeByName) {
            const { toppings } = this.props.data.pizzaSizeByName;
            let currenttoppings = this.state.Toppings;
            toppings.map(({ topping }) => {
                if (
                    topping.name === event.target.value &&
                    event.target.checked
                ) {
                    return currenttoppings.push({
                        name: topping.name,
                        price: topping.price,
                        checked: event.target.checked
                    });
                }
                if (
                    topping.name === event.target.value &&
                    !event.target.checked
                ) {
                    for (let i = 0; i < currenttoppings.length; i++) {
                        if (
                            currenttoppings[i].name === event.target.value &&
                            !event.target.checked
                        ) {
                            currenttoppings.splice(i, 1);
                        }
                    }
                }
            });

            this.setState({ Toppings: currenttoppings });
        }
    }

    renderToppings() {
        const { toppings } = this.props.data.pizzaSizeByName;
        return toppings.map(({ defaultSelected, topping }) => {
            return (
                <div key={topping.name}>
                    <li className="collection-item">
                        <input
                            type="checkbox"
                            id={topping.name}
                            value={topping.name}
                            onChange={this.selectTopping}
                            disabled={this.isDisabled(topping.name)}
                            checked={this.isChecked(topping.name)}
                        />
                        <label
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                            for={topping.name}
                        >
                            <div>{topping.name}</div>
                            <div>{topping.price} $</div>
                        </label>
                    </li>
                </div>
            );
        });
    }
    isChecked(id) {
        return this.state.Toppings.filter(item => item.name === id).length === 0
            ? false
            : true;
    }
    isDisabled(id) {
        const { maxToppings } = this.props.data.pizzaSizeByName;

        if (maxToppings === null) {
            return false;
        } else {
            return (
                this.state.Toppings.length > maxToppings - 1 &&
                this.state.Toppings.filter(item => item.name === id).length ===
                    0
            );
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let pizza = {
            pizza: this.props.selected,
            toppings: this.state.Toppings
        };
        this.props.onSubmit(pizza);
        this.setDefaultToppings(this.props);
    }
    render() {
        const { selected } = this.props;

        if (selected === {}) {
            return <div />;
        }
        if (this.props.data.loading) {
            return <div>Loading Toppings</div>;
        } else {
            const { maxToppings } = this.props.data.pizzaSizeByName;
            return (
                <div>
                    <h5>
                        {maxToppings !== null
                            ? `Select up to ${maxToppings} Toppings`
                            : 'Unlimited Toppings Selection'}
                        <form onSubmit={this.onSubmit}>
                            <ul className="collection">
                                {this.renderToppings()}
                            </ul>
                            <button className="btn">Add Pizza</button>
                        </form>
                    </h5>
                </div>
            );
        }
    }
}

export default graphql(pizzaSizeByName, {
    options: props => {
        return { variables: { name: props.selected.name } };
    }
})(ToppingSelection);
