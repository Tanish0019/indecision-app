import React from 'react';

class AddOption extends React.Component {
    //Arrow functions don't have their own 'this' bindings. The 'this' in arrow function
    //refers to the parent element 'this'
    //hence they are perfect for event handlers and we don't have to manually
    //bind 'this' to them
    handleAddOption = (e) => {
        e.preventDefault();
        let option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        if(!error) {
            e.target.elements.option.value = '';
        }
    };

    render() {
        return (
            <div>
                {this.props.error && <p className="add-option-error">{this.props.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    };
};

export default AddOption;