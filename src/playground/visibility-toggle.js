class Toggle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visibility: false
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    
    onButtonClick() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            };
        });
    };

    render() {
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.onButtonClick}>{this.state.visibility ? "Hide Details" : "Show Details"}</button>
                {this.state.visibility && <p>These are all the details</p>}
            </div>
        )
    };
};

ReactDOM.render(<Toggle />, document.getElementById('app'));

