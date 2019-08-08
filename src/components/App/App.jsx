import React, { Component }  from 'react';
import Info from '../Info';
import Main from '../Main';

class App extends Component {
    state = { page: "info" }

    goToMainPage = () => this.setState({ page: "main" })
    goToInfoPage = () => this.setState({ page: "info" })

    render() {
        const { page } = this.state;
        return (
            page === "info" 
            ? <Info handleClick={this.goToMainPage} /> 
            : <Main handleClick={this.goToInfoPage} />
        );
    }
}

export default App;
