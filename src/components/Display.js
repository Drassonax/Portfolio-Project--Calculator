import React from "react"

class Display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayItems: -18
        }
    }
    componentDidMount() {
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Escape') {
                this.props.clearExpression()
            }
        })
        let displayWidth = document.getElementById('display').offsetWidth
        this.setState({ displayItems: 0 - (Math.floor(Number(displayWidth) / 14)) })
    }
    componentWillUnmount() {
        document.removeEventListener('keypress', (e) => {
            if (e.key === 'Escape') {
                this.props.clearExpression()
            }
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row  justify-content-center">
                    <button id="clear" className="col-3 col-md-1" onClick={this.props.clearExpression}>C</button>
                    <div id="display" className="col-9 col-md-3">
                        <div id="display-expression">{this.props.expression.length === 0 ? '---' : this.props.expression.concat([]).join('').slice(this.state.displayItems)}</div>
                        <div id="display-current-item">{this.props.currentExpression}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Display