console.log("app.js is running");

//JSX - JavaScript XML (language extention)
//this is in JSX we need to compile it in JS so the browser can understand it
//We use babel which is a JS compiler which converts the JSX code to normal JS code
//So the browser can understand it

// const addOne = () => {
//     count++;
//     renderCounterApp();
// };

// const minusOne = () => {
//     count--;
//     renderCounterApp();
// };

// const reset = () => {
//     count = 0;
//     renderCounterApp();
// };

// let count = 0;

// const renderCounterApp = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>        
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     )
//     ReactDOM.render(templateTwo, appRoot);
// };
// // TemplateTwo is an object
// renderCounterApp();

var appRoot = document.getElementById('app');

const app = {
    title: 'Indecision App',
    subtitle: "Put your life in the hands of a computer",
    options: []
};

const onFormSubmit = (e) => {
    //prevents the form from making the get request
    e.preventDefault(); 
    // option is the name of the input element
    const option = e.target.elements.option.value;
    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
    }

    render();
}

const removeOptions = () => {
    app.options = [];
    render();
}

const renderOptions = () => {
    return app.options.map((option, i) => <li key={i}>{option}</li>);
}

const onMakeDecision = () => {
    const number = Math.floor(Math.random() * app.options.length);
    return <p>app.option[number]</p>
}

const render = () => {
    
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <p>{app.options.length}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What Should I do?</button>
            <button onClick={removeOptions}>Remove All</button> 
            <ol>
                {renderOptions()}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    )

    ReactDOM.render(template, appRoot);
};

render();



