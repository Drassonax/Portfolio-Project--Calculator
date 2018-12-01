import React from 'react'
import Display from './Display'

class MathElements extends React.Component {
    constructor(props) {
        super(props)
        this.currentNum = this.currentNum.bind(this)
        this.currentOperator = this.currentOperator.bind(this)
        this.calculate = this.calculate.bind(this)
        this.state = {
            num: 0
        }
    }

    componentDidMount() {
        document.addEventListener('keypress', (e) => {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
                this.currentNum(e)
            } else if (['+', '-', '*', '/'].includes(e.key)) {
                this.currentOperator(e)
            } else if (e.key === '.') {
                this.placeDecimalPoint(e)
            } else if (e.key === 'Enter') {
                this.calculate(e)
            }
        })
    }
    componentWillUnmount() {
        document.removeEventListener('keypress', (e) => {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
                this.currentNum(e)
            } else if (['+', '-', '*', '/'].includes(e.key)) {
                this.currentOperator(e)
            } else if (e.key === '.') {
                this.placeDecimalPoint(e)
            } else if (e.key === 'Enter') {
                this.calculate(e)
            }
        })
    }

    currentNum = (e) => {
        const btn = document.getElementById(e.key ? e.key : e.target.id)
        btn.setAttribute('class', 'col-3 col-md-1 number activated')
        setTimeout(() => {
            btn.setAttribute('class', 'col-3 col-md-1 number')
        }, 100)
        if (this.props.currentExpression.includes('=')) {
            this.props.clearExpression()
            this.setState({ num: parseInt(btn.value) })
            this.props.setCurrentExpression(btn.value)
        } else if (this.props.currentExpression.includes('.')) {
            this.props.setCurrentExpression(this.state.num.toString().concat(btn.value))
            this.setState({ num: this.state.num.concat(btn.value) })
        } else {
            if (!/\d/.test(this.props.currentExpression) && this.props.expression.length > 0) {
                this.props.pushExpression()
            }
            this.props.setCurrentExpression((this.state.num * 10 + parseInt(btn.value)).toString())
            this.setState({ num: this.state.num * 10 + parseInt(btn.value)})
        }
    }
    currentOperator = (e) => {
        const btn = document.getElementById(e.key ? e.key : e.target.id)
        btn.setAttribute('class', 'col-3 col-md-1 operator activated')
        setTimeout(() => {
            btn.setAttribute('class', 'col-3 col-md-1 operator')
        }, 100)
        if (this.props.currentExpression.includes('=')) {
            this.props.continueCalculating()
            this.setState({ num: 0 })
        } else if (/\d/.test(this.props.currentExpression)) {
            this.props.pushExpression()
            this.setState({ num: 0})
        }
        this.props.setCurrentExpression(btn.value)
    }
    placeDecimalPoint = (e) => {
        const btn = document.getElementById('.')
        btn.setAttribute('class', 'col-3 col-md-1 number activated')
        setTimeout(() => {
            btn.setAttribute('class', 'col-3 col-md-1 number')
        }, 100)
        if (this.props.currentExpression.includes('=')) {
            this.props.clearExpression()
            this.setState({ num: '0.' })
            this.props.setCurrentExpression('0.')
        } else if (!this.props.currentExpression.toString().includes('.')) {
            if (/\d/.test(this.props.currentExpression)) {
                this.props.setCurrentExpression(this.state.num.toString().concat('.'))
                this.setState({ num: this.state.num.toString().concat('.') })
            } else {
                if (this.props.expression.length > 0) {
                    this.props.pushExpression()
                }
                this.props.setCurrentExpression('0.')
                this.setState({ num: '0.' })
            }
        }
    }
    calculate = (e) => {
        const btn = document.getElementById('=')
        btn.setAttribute('class', 'col-3 col-md-1 activated')
        setTimeout(() => {
            btn.setAttribute('class', 'col-3 col-md-1')
        }, 100)
        if (/\d/.test(this.props.currentExpression) && !this.props.currentExpression.includes('=')) {
            this.props.performMath()
        }
    }
    clearExpression = () => {
        this.props.clearExpression()
        this.setState({ num: 0 })
    }

    render() {
        return (
            <div>
                <div>
                    <Display 
                    expression={this.props.expression} 
                    currentExpression={this.props.currentExpression} 
                    clearExpression={this.clearExpression} 
                    />
                </div>
                <div className="container" id="inputs">
                    <div className="row justify-content-center">
                        <button className="col-3 col-md-1 number" id="7" value="7" onClick={this.currentNum}>7</button>
                        <button className="col-3 col-md-1 number" id="8" value="8" onClick={this.currentNum}>8</button>
                        <button className="col-3 col-md-1 number" id="9" value="9" onClick={this.currentNum}>9</button>
                        <button className="col-3 col-md-1 operator" id="/" value="/" onClick={this.currentOperator}>/</button>
                    </div>
                    <div className="row justify-content-center">
                        <button className="col-3 col-md-1 number" id="4" value="4" onClick={this.currentNum}>4</button>
                        <button className="col-3 col-md-1 number" id="5" value="5" onClick={this.currentNum}>5</button>
                        <button className="col-3 col-md-1 number" id="6" value="6" onClick={this.currentNum}>6</button>
                        <button className="col-3 col-md-1 operator" id="*" value="*" onClick={this.currentOperator}>*</button>
                    </div>
                    <div className="row justify-content-center">
                        <button className="col-3 col-md-1 number" id="1" value="1" onClick={this.currentNum}>1</button>
                        <button className="col-3 col-md-1 number" id="2" value="2" onClick={this.currentNum}>2</button>
                        <button className="col-3 col-md-1 number" id="3" value="3" onClick={this.currentNum}>3</button>
                        <button className="col-3 col-md-1 operator" id="-" value="-" onClick={this.currentOperator}>-</button>
                    </div>
                    <div className="row justify-content-center">
                        <button className="col-3 col-md-1 number" id="." value="." onClick={this.placeDecimalPoint}>.</button>
                        <button className="col-3 col-md-1 number" id="0" value="0" onClick={this.currentNum}>0</button>
                        <button className="col-3 col-md-1" id="=" value="=" onClick={this.calculate}>=</button>
                        <button className="col-3 col-md-1 operator" id="+" value="+" onClick={this.currentOperator}>+</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MathElements