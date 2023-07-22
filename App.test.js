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
    const drinkCard = getByTestId(drinkName)
    const addToCartButton = within(drinkCard).getByText('Add to Cart')

    fireEvent.press(addToCartButton)

    // navigate to the cart
    const cartLink = getByText('View your shopping cart')
    fireEvent.press(cartLink)

    // aim for the added drink (null if it doesn't exist)
    const cartContainer = getByTestId('cartContainer')
    const addedDrink = within(cartContainer).queryByText(drinkName)

    // finalize test
    expect(addedDrink).not.toBeNull()

  })

  it('can add mutlple quantity of the same drink to the cart', () => {
    const { getByText, getByTestId } = render(<App />)

    // aim for the addToCartButton and press it 3 times
    const drinkName = 'Modern Plastic Computer Tea'
    const drinkCard = getByTestId(drinkName)
    const addToCartButton = within(drinkCard).getByText('Add to Cart')

    fireEvent.press(addToCartButton)
    fireEvent.press(addToCartButton)
    fireEvent.press(addToCartButton)

    // navigate to the cart
    const cartLink = getByText('View your shopping cart')
    fireEvent.press(cartLink)

    // aim for the added drink (null if it doesn't exist)
    const cartContainer = getByTestId('cartContainer')
    const drinkQuantity = within(cartContainer).getByTestId('quantity')
    const drinkQuantityText = drinkQuantity.props.children.join('')

    expect(drinkQuantityText).toBe('Quantity: 3')
  })

  it('can add multiple drink types to the cart', () => {
    const { getByText, getByTestId } = render(<App />)

    // add first drink to cart
    const drinkNameA = 'Modern Plastic Computer Tea'
    const drinkCardA = getByTestId(drinkNameA)
    const addToCartButtonA = within(drinkCardA).getByText('Add to Cart')

    fireEvent.press(addToCartButtonA)
    fireEvent.press(addToCartButtonA)

    // add second drink to cart
    const drinkNameB = 'Handcrafted Rubber Towels Smoothie'
    const drinkCardB = getByTestId(drinkNameB)
    const addToCartButtonB = within(drinkCardB).getByText('Add to Cart')

    fireEvent.press(addToCartButtonB)

    // navigate to the cart
    const cartLink = getByText('View your shopping cart')
    fireEvent.press(cartLink)

    // check first drink
    const cartContainer = getByTestId('cartContainer')
    const drinkContainerA = within(cartContainer).getByTestId(drinkNameA)
    const drinkQuantityA = within(drinkContainerA).getByTestId('quantity')
    const drinkQuantityTextA = drinkQuantityA.props.children.join('')

    expect(drinkQuantityTextA).toBe('Quantity: 2')

    // check second drink
    const drinkContainerB = within(cartContainer).getByTestId(drinkNameB)
    const drinkQuantityB = within(drinkContainerB).getByTestId('quantity')
    const drinkQuantityTextB = drinkQuantityB.props.children.join('')

    expect(drinkQuantityTextB).toBe('Quantity: 1')
  })

  it('removing a drink from the cart updates the quanity', () => {
    const { getByTestId, getByText, queryByTestId } = render(<App />)

    // add two drinks to the cart
    const drinkName = 'Handcrafted Rubber Towels Smoothie'
    const drinkCard = getByTestId(drinkName)
    const addToCartButton = within(drinkCard).getByText('Add to Cart')

    fireEvent.press(addToCartButton)
    fireEvent.press(addToCartButton)

    // navigate to the cart
    const cartLink = getByText('View your shopping cart')
    fireEvent.press(cartLink)

    // remove one drink
    const cartContainer = getByTestId('cartContainer')
    const drinkContainer = within(cartContainer).getByTestId(drinkName)
    const removeFromCartButton = within(drinkContainer).getByText('Remove from Cart')

    fireEvent.press(removeFromCartButton)

    // check the quantity
    const drinkQuantity = within(drinkContainer).getByTestId('quantity')
    const drinkQuantityText = drinkQuantity.props.children.join('')

    expect(drinkQuantityText).toBe('Quantity: 1')
  })

});
