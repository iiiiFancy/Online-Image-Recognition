import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area:800
            }
        }
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Particles className = 'particles'
                    params = {particlesOptions}
                />
                <Navigation/>
                {/*<Signin />*/}
                <Logo/>
                <Rank/>
                <ImageLinkForm/>
                {/*
                <FaceRecongnition /> */}
            </div>
        );
    }
}

export default App;
