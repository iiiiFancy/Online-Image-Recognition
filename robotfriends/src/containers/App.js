import React, {Component} from 'react';
import CardList from '../components/CardList';
//import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import'./App.css'
import Scroll from '../components/Scroll'

// props 静态
// state 动态
// parent send state to child，then it becomes props（child can never changes it）eg：{robots}
class App extends Component { 
	constructor() {
		super()
		this.state = {
			robots: [], // 保存供输出的全部信息
			searchField: '' // 搜索框输入的字符串
		}
	}

	componentDidMount() { // make request here
		fetch('http://jsonplaceholder.typicode.com/users')
		.then(response => response.json()) // 接受回应
		.then(users => this.setState({robots:users}));
	}

	//onSearchChange(event) { 这样写this会指向event 即SearchBox中的<input>
	onSearchChange = (event) => {
		this.setState({searchField: event.target.value}) // 必须用React内建方法修改state
	}

	render(){
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
		})
		return !this.state.robots.length ? <h1> loading </h1> :
		(
			<div className = 'tc'>
				<h1 className = 'f1'> Cat Friends</h1>
				<SearchBox searchChange = {this.onSearchChange} /> {/* searchChange触发onSearchChange()修改state */}
				<Scroll>
					<CardList robots = {filteredRobots}  />  {/* 以cardlist形式返回输入变量中所有元素 */}
				</Scroll>
			</div>
		);		
	}
}

export default App;