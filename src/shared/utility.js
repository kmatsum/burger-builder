/*  Utility to return a new Updated Object: ---------------
 *      Returns a new object, based on the 'oldObject', but with the 'updatedProperties' included
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

/*  Validation Check on Inputs: ---------------
 *      Returns a Boolean value dependent on the validity of the passed 'value', dependent on
 *      the 'rules' that are passed into the function
 */
export const checkValidity = (value, rules) => {
    let isValid = true;
    // Rules ----------
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    // END OF: Rules -----

    // Return validity result
    return isValid;
}