class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count
        }
        this.addCount = this.addCount.bind(this);
        this.subtractCount = this.subtractCount.bind(this);
        this.resetCount = this.resetCount.bind(this);
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('count');
            const count = JSON.parse(json);

            if (count) {
                this.setState(() => ({count: parseInt(count, 10)}));
            }
        } catch (e) {
            //Let count be set to default value
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            const json = JSON.stringify(this.state.count);
            localStorage.setItem('count', json);
        }
    }

    addCount() {
        this.setState(prevState => ({count: prevState.count + 1}));
    };

    subtractCount() {
        this.setState(prevState => ({count: prevState.count - 1}));
    };

    resetCount() {
        this.setState(() => ({count: 0}));
    };

    render() {
        return(
            <div>    
                <Header count={this.state.count}/>
                <Buttons 
                    addCount={this.addCount}
                    subtractCount={this.subtractCount}
                    resetCount={this.resetCount}
                />
            </div>
        )
    };
};

Counter.defaultProps = {
    count : 0
}

const Header = (props) => {
    return (
        <div>
            <h1>Count: {props.count}</h1>
        </div>
    );
};

const Buttons = (props) => {
    return (
        <div>
            <button onClick={props.addCount}>+1</button>
            <button onClick={props.subtractCount}>-1</button>
            <br />
            <button onClick={props.resetCount}>Reset</button>
        </div>
    )

}
ReactDOM.render(<Counter />, document.getElementById('app'));