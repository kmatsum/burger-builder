// Standard Imports
import React from 'react';

// Component Function =========================
const asyncComponent = (importComponent) => {
    return (
        // Anonymous Component Class ---------------
        class extends React.Component {
            state = {
                component: null,
            }

            /* When this anonymous component is mounted, then the 'importComponent()' funciton
             * will run, returning a promise, which will then change the state of the anonymous
             * component, forcing a re-render.
             */
            componentDidMount() {
                importComponent()
                    .then((cmp) => {
                        this.setState({ component: cmp.default });
                    });
            }

            // Render Method -----
            render() {
                // The component loaded in the state will be rendered
                const C = this.state.component;
                return C ? <C {...this.props} /> : null;
            }
        }
    )
}; export default asyncComponent;