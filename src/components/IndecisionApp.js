import React from 'react';

import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    
    //USING NEW CLASS INSTANCE SYNTAX WE DON'T NEED CONSTRUCTOR
    state = {
        options: this.props.options,
        selectedOption: undefined,
        error: undefined
    }
    
    //Arrow functions don't have their own 'this' bindings. The 'this' in arrow function
    //refers to the parent element 'this'
    //hence they are perfect for event handlers and we don't have to manually
    //bind 'this' to them
   
    //EVENT HANDLERS
    handleDeleteOptions = () => {
        this.setState(() => ({
                options: [],
                error: undefined
            }) 
        );
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter(option => optionToRemove !== option)
        }));
    };

    handlePick = () => {
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
        this.setState(() => ({ selectedOption: option }));
    };

    handleAddOption = (option) => {
        if (!option) {
            this.setState(() => ({error: 'Enter valid value'}));
            return true;
        } else if (this.state.options.indexOf(option) > -1) {
            this.setState(() => ({error: 'Value already exists'}));
            return true;
        } else {
            if(this.state.error){
                this.setState((prevState) =>( { 
                    options: prevState.options.concat(option),
                    error: undefined
                }));
            } else {
                this.setState((prevState) =>( { options: prevState.options.concat(option)}));
            }
        } 
    };

    handleSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };
   
    //LIFECYCLE METHODS
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // do nothing let it use default value of options
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json)
        }
    };

    render() {
        const title = "Indecision"
        const subtitle = "Put your life in the hands of a computer";
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}    
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                            error={this.state.error}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleSelectedOption={this.handleSelectedOption}    
                />
            </div>
        );
    };
};

//SETTING DEFAULT PROPS
IndecisionApp.defaultProps = {
    options: []
}

export default IndecisionApp;