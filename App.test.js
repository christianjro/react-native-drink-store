import React from 'react';
import {create, act} from 'react-test-renderer';
import {render, fireEvent, within} from '@testing-library/react-native';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    let tree 
    act(() => {
        tree = create(<App />)
    })
    if (tree.toJSON() !== null) {
        expect(tree.toJSON().children.length).toBe(1)
    } else {
        fail('Component did not render any children.')
    }      
  });

  it('adding a drink to the cart updates the cart', () => {
    const { getByText, getByTestId } = render(<App />)

    // aim for the addToCartButton and press it
    const drinkName = 'Modern Plastic Computer Tea'
    const drinkCard = getByTestId(drinkName).parent
    const addToCartButton = within(drinkCard).getByText('Add to Cart')

    fireEvent.press(addToCartButton)

    // navigate to the cart
    const cartLink = getByText('View your shopping cart')
    fireEvent.press(cartLink)

    // aim for the added drink (null if it doesn't exist)
    const cartContainer = getByTestId('cartContainer').parent
    const addedDrink = within(cartContainer).queryByText(drinkName)

    // finalize test
    expect(addedDrink).not.toBeNull()

  })

  it('can add mutlple quantity of the same drink to the cart', () => {
    const { getByText, getByTestId } = render(<App />)

    // aim for the addToCartButton and press it 3 times
    const drinkName = 'Modern Plastic Computer Tea'
    const drinkCard = getByTestId(drinkName).parent
    const addToCartButton = within(drinkCard).getByText('Add to Cart')

    fireEvent.press(addToCartButton)
    fireEvent.press(addToCartButton)
    fireEvent.press(addToCartButton)

    // navigate to the cart
    const cartLink = getByText('View your shopping cart')
    fireEvent.press(cartLink)

    // aim for the added drink (null if it doesn't exist)
    const cartContainer = getByTestId('cartContainer').parent
    const drinkQuantity = within(cartContainer).getByTestId('quantity')
    const drinkQuantityText = drinkQuantity.props.children.join('')

    expect(drinkQuantityText).toBe('Quantity: 3')
  })

});
