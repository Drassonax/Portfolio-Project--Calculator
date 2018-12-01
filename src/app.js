import React from 'react'
import ReactDOM from 'react-dom'
import MathElements from './components/MathElements'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.clearExpression = this.clearExpression.bind(this)
        this.setCurrentExpression = this.setCurrentExpression.bind(this)
        this.pushExpression = this.pushExpression.bind(this)
        this.performMath = this.performMath.bind(this)
        this.state = {
            expression: [],
            currentExpression: '0',
        }
    }
    clearExpression = () => {
        this.setState({
            expression: [],
            currentExpression: '0'
        })
        const clearButton = document.getElementById('clear')
        clearButton.setAttribute('class', 'col-3 col-md-1 clear-activated')
        setTimeout(() => {
            clearButton.setAttribute('class', 'col-3 col-md-1')
        }, 100)
    }
    setCurrentExpression = (exp) => {
        this.setState({ currentExpression: exp })
    }
    pushExpression = () => {
        this.setState({
            expression: this.state.expression.concat([this.state.currentExpression])
        })
    }

    performMath = () => {
        let finalExpression = this.state.expression.map((item) => {
            if (/\d/.test(item)) {
                return parseFloat(item)
            } else {
                return item
            }
        }).concat(parseFloat(this.state.currentExpression))
        const expressionToDisplay = finalExpression.concat([])
        while (finalExpression.length > 1) {
            if (finalExpression.includes('*')) {
                const multiplyIndex = finalExpression.indexOf('*')
                finalExpression.splice(multiplyIndex - 1, 3, finalExpression[multiplyIndex - 1] * finalExpression[multiplyIndex + 1])
            } else if (finalExpression.includes('/')) {
                const divisionIndex = finalExpression.indexOf('/')
                finalExpression.splice(divisionIndex - 1, 3, finalExpression[divisionIndex - 1] / finalExpression[divisionIndex + 1])
            } else if (finalExpression.includes('-')) {
                const additionIndex = finalExpression.indexOf('-')
                finalExpression.splice(additionIndex - 1, 3, finalExpression[additionIndex - 1] - finalExpression[additionIndex + 1])
            } else {
                const subtractionIndex = finalExpression.indexOf('+')
                finalExpression.splice(subtractionIndex - 1, 3, finalExpression[subtractionIndex - 1] + finalExpression[subtractionIndex + 1])
            }
        }
        this.setState({
            expression: expressionToDisplay,
            currentExpression: `=${finalExpression[0]}`
        })
    }
    continueCalculating = () => {
        this.state.expression = [this.state.currentExpression.slice(1)]
    }

    render() {
        return (
            <div id="calculator">
                    <MathElements 
                    expression={this.state.expression}
                    currentExpression={this.state.currentExpression}
                    clearExpression={this.clearExpression}
                    setCurrentExpression={this.setCurrentExpression}
                    pushExpression={this.pushExpression}
                    performMath={this.performMath}
                    continueCalculating={this.continueCalculating}
                    />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))