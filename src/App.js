// React Components
import ParticlesBg from 'particles-bg';
import React, {Component} from "react";
import Clarifai from 'clarifai';

// Components
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/authentication/SignIn/SignIn";
import Register from "./components/authentication/Register/Register";

//Styles
import './App.css';

//You must add your own api key here
const app = new Clarifai.App({
    apiKey: 'YOUR KEY HERE'
});

class App extends Component {

    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    onInputChange = (event) => {
        this.state.input = event.target.value;
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage')
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    identifyFace = (box) => {
        this.setState({box});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(
                response => this.identifyFace(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    }

    onRouteChange = (routeParam) => {
        if (routeParam === 'signout') {
            this.setState({isSignedIn: false})
            this.setState({route: 'singin'});
        } else if (routeParam === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: routeParam});
    }

    render() {
        const {isSignedIn, imageUrl, route, box} = this.state;
        return (
            <div className="App">
                <ParticlesBg className='particles'
                             color="#3CA9D1" num={200} type="cobweb" bg={true}/>

                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                    : (route === 'signin' ? <SignIn onRouteChange={this.onRouteChange}/> :
                        <Register onRouteChange={this.onRouteChange}/>)
                }
            </div>
        );
    }

}

export default App;
