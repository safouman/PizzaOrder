import gql from 'graphql-tag';

export default gql`
    query pizzaSizeByname($name: PizzaSizes) {
        pizzaSizeByName(name: $name) {
            maxToppings
            toppings {
                defaultSelected
                topping {
                    name
                    price
                }
            }
        }
    }
`;
