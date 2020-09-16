// React Import
import React from 'react';
// Enzyme Testing Imports
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// Import the component we are testing
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onFetchIngredients={() => { }} />);
    });

    it('Should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ings: {
                salad: 0
            }
        });

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});