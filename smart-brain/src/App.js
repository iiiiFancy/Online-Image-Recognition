import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import FaceRecongnition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';

const particlesOptions = { // 背景
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

const initialState = {
    input: '',
    imageUrl: '',
    box: {}, //
    route: 'signin', // 页面的当前应该显示什么
    isSignedIn: false, // 根据route判断有没有sign in
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {
    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    };
    calculateFaceLocation = (data) => { // 提取返回结果中的四个顶点
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage'); // inputimage在FaceRecongnition中
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };
    displayFaceBox = (box) => { // 给状态变量赋值
        this.setState({box: box});
    };
    onInputChange = (event) => {  // 获取输入的字符串存在input
        this.setState({input: event.target.value});
    };
    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3000/imageurl', { // 图像url传给后端
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.outputs[0].data.regions[0].region_info.bounding_box) { // 如果有回应(并且是结果)，再更改计数
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ // image方法用来更新用户使用次数，只需要用户id
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(c => {
                            this.setState(Object.assign(this.state.user, {entries: c}))
                        })
                        .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    };
    onRouteChange = (route) => { // 动态的给route变量赋值（并根据route决定有没有sign in）
        if (route === 'signout') { // 点击sign out时会被置为该值
            this.setState(initialState)
        } else if (route === 'home') { // 点击Signin上的sign in或者Regester组件上regester的按钮后会被置为该值
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };

    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {}, //
            route: 'signin', // 页面的当前应该显示什么
            isSignedIn: false, // 根据route判断有没有sign in
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    render() {
        const {isSignedIn, imageUrl, route, box} = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                {/*Navigation根据当前状态显示右上角的sign in/out，并且调用onRouteChange改变route变量值*/}
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home' // 是否显示主页
                    ? <div>
                        <Logo/>
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecongnition box={box} imageUrl={imageUrl}/>
                    </div>
                    : ( // 不显示主页->判断显示登陆/注册界面
                        route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> // 显示登陆组件
                            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> // 显示注册组件(route=signout)
                    )
                }
            </div>
        );
    }
}

export default App;
