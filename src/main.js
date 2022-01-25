import React, {Component} from 'react';
import './style/style.css';
var mexp = require("math-expression-evaluator");

document.body.style.backgroundColor="#303030";
var switchParenths = false;

function outText_setState(obj) {
	this.setState(obj);
}
function outText_getState() {
	return this.getState();
}
var f; var getState;
class OutputText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text:this.props.text || "",
			switchParenths:switchParenths,
			equal:false
		}

		f = outText_setState.bind(this);
		getState = outText_getState.bind(this);
	}
	getState() {
		return this.state;
	}
	componentDidUpdate(prevProps, prevState) {
		console.log({
			props:{
				oldProps:prevProps,
				newProps:this.props
			},
			state:{
				oldState:prevState,
				newState:this.state
			}
		})
	}
	render() {
		return(
			<div className={"style"}>
				<p className={"textStyle"}>{this.state.text}</p>
			</div>
		)
	}
}
class OperationButton extends Component {
	onclick(textVal) {
		var stateText = getState().text;
		var stateParenth = getState().switchParenths;
		var stateEqual = getState().equal;

		switch (textVal) {
			case "()":
				(!switchParenths) ? f({text:stateText+="(",switchParenths:!switchParenths,equal:stateEqual}) : f({text:stateText+=")",switchParenths:!switchParenths, equal:stateEqual})
				switchParenths = !switchParenths;
				break;
			case "C":
				f({text:"",switchParenths:stateParenth,equal:stateEqual});
				break;
			case "=":
				if (typeof(mexp.eval(stateText)) == "number") {
					f({text:mexp.eval(stateText),switchParenths:stateParenth,equal:true});
				} else {
					let err_num = mexp.eval(stateText);
					console.warn(`%c @{switch::textVal} -> [calculate] : %c <${err_num + "_" + typeof(err_num)}> !`, "color: gray; font-style: italic", "color: red");
				}
				break;
			default:
				f({text:stateText+=String(textVal),switchParenths:stateParenth});
				break;
		}
	}
	render() {
		return(
			<button className={"opButton"} onClick={() => {this.onclick(this.props.textVal)}}>{this.props.textVal}</button>
		)
	}
}
class NumberButton extends OperationButton {
	onclick(textVal) {
		var stateText = getState().text;
		var stateParenth = getState().switchParenths;
		var stateEqual = getState().equal;

		f({text:stateText+=String(textVal),switchParenths:stateParenth,equal:stateEqual});
	}

	render() {
		return(
			<button className={"numButton"} onClick={() => {this.onclick(this.props.textVal)}}>{this.props.textVal}</button>
		)
	}
}
document.addEventListener("keydown", (e) => {
	var stateText = getState().text;
	var stateParenth = getState().switchParenths;
	var stateEqual = getState().equal;

	var key = e.key.replace("Key", "");

	switch (key) {
		case "C":
			f({text:"",switchParenths:stateParenth,equal:stateEqual});
			break;
		case "=":
			if (typeof(mexp.eval(stateText)) == "number") {
				f({text:mexp.eval(stateText),switchParenths:stateParenth,equal:true});
			} else {
				let err_num = mexp.eval(stateText);
				console.warn(`%c @{switch::e.code} -> [calculate] : %c <${err_num + "_" + typeof(err_num)}> !`, "color: gray; font-style: italic", "color: red");
			}
			break;
		default:
			if (!isNaN(parseInt(key))) {
				f({text:stateText+=key,switchParenths:stateParenth,equal:stateEqual});
				break;
			} else if (key === "(" || key === ")" || key === "%" || key === "/" || key === "*" || key === "-" || key === "+") {
				f({text:stateText+=key,switchParenths:stateParenth,equal:stateEqual});
				break;
			}
			break;
	}
})
class App extends Component {

	render() {
		return(
			<div id={"$pdiv"}>
					<OutputText></OutputText>
				<br/>
					<OperationButton textVal={"C"}/>
					<OperationButton textVal={"()"}/>
					<OperationButton textVal={"%"}/>
					<OperationButton textVal={"/"}/>
				<br/>
					<NumberButton textVal={7}/>
					<NumberButton textVal={8}/>
					<NumberButton textVal={9}/>
					<OperationButton textVal={"*"}/>
				<br/>
					<NumberButton textVal={4}/>
					<NumberButton textVal={5}/>
					<NumberButton textVal={6}/>
					<OperationButton textVal={"-"}/>
				<br/>
					<NumberButton textVal={1}/>
					<NumberButton textVal={2}/>
					<NumberButton textVal={3}/>
					<OperationButton textVal={"+"}/>
				<br/>
					<NumberButton textVal={0}/>
					<OperationButton textVal={"="}/>	
			</div>
		)
	}
}

export default App;