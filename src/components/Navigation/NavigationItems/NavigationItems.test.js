// React Imports
import React from 'react';
// Enzyme Testing Imports
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// Import the component we are testing
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';



configure({ adapter: new Adapter() });

/*  Jest Method used to define this specific test
 *      describe() will define the test identification name, as well as the testing function
 *      that this test will run.
 */
describe('<NavigationItems />', () => {
    // Define a wrapper variable
    let wrapper;

    // Function which will run before each test ( it() functions )
    beforeEach(() => {
        // Create a new shallow-ly wrapped test component
        wrapper = shallow(<NavigationItems />);
    });

    // Function which will run after each test
    // afterEach(() => {
    //     // Logic...
    // });



    // Test 1 =========================
    it('should render two <NavigationItem /> elements when not authenticated', () => {
        // --- Testing Logic ---

        // Define a test-solution case
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });



    // Test 2 =========================
    it('should render three <NavigationItem /> elements when is authenticated', () => {
        // --- Testing Logic ---

        // Set the props of the componen we are testing
        wrapper.setProps({ isAuthenticated: true });

        // Define a test-solution case
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    


    // Test 2 =========================
    it('should render a logout <NavigationItem /> when is authenticated', () => {
        // --- Testing Logic ---

        // Set the props of the componen we are testing
        wrapper.setProps({ isAuthenticated: true });

        // Define a test-solution case
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});