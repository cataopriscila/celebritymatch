import "./App.css";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Logo from "./Components/Logo/Logo";
import Navigation from "./Components/Navigaton/Navigation";
import Rank from "./Components/Rank/Rank";
import Particles from "react-particles-js";
import { Component } from "react";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Footer from "./Components/Footer/Footer";
import CelebrityImage from "./Components/CelebrityImage/CelebrityImage";
import TryAgain from "./Components/TryAgain/TryAgain";

const API_KEY =`${process.env.REACT_APP_RAPID_API_KEY}`;

const particlesOptions = {
  particles: {
    number: { value: 90, density: { enable: true, value_area: 1800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "star",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
    },
    size: {
      value: 4,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  nameCelebrity: "",  
  index: 0,
  images: {},
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  loadReset = () => {
    this.setState({
      nameCelebrity: "",
      index: 0,
      images: {},
      box: {},
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };  

  getCelebrityName = (data) => {
     
    let i = this.state.index;     
    const celebrity = data[i].name;
    this.setState({index: i + 1})    
    return celebrity;
  };

  getCelebrityImagesByName = (searchname) => {
    fetch(
      `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${searchname}&pageNumber=1&pageSize=10&autoCorrect=true`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
          "x-rapidapi-key":API_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const imageCelebrity = response.value[0].url;
        const imageCelebrityStep = response.value[1].url;
        this.setState({
          images: {
            imageCelebrity,
            imageCelebrityStep,
          },
          nameCelebrity: searchname, 
                  
        });
      })
      .catch((err) => console.log(err));
  };

  onButtonSubmit = () => {
    
    this.loadReset();
    this.setState({ imageUrl: this.state.input });

    const myInit = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    };

    fetch("http://localhost:3000/faceimage", myInit)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/attempts", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((updatedEntries) => {
              this.setState(
                Object.assign(this.state.user, {
                  entries: updatedEntries,
                })
              );
            })
            .catch((err) => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err)); 

    fetch("http://localhost:3000/celebrity", myInit)
      .then((response) => response.json())      
      .then((response) => {
        if (response) { 
          this.setState({dataCelebrity: response.outputs[0].data.regions[0].data.concepts});        
          this.getCelebrityImagesByName(this.getCelebrityName(this.state.dataCelebrity));          
        }      
      })
      .catch((err) => console.log(err)); 
  };

  onRecall = () => {     
    this.getCelebrityImagesByName(this.getCelebrityName(this.state.dataCelebrity));  
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({
        isSignedIn: true,
        route: route,
      });
    } else if (route === "register") {
      this.setState({ route: route });
    } else if (route === "signin") {
      this.setState({ route: route });
    }
  };

  render() {
    const { isSignedIn, imageUrl, box, route, images, nameCelebrity } =
      this.state;
    return (
      <div className="App">
        <Particles className="Particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              userName={this.state.user.name}
              userEntries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
            <CelebrityImage
              imageCelebrity={images.imageCelebrity}
              imageCelebrityStep={images.imageCelebrityStep}
              nameCelebrity={nameCelebrity}
            />
            <TryAgain
             nameCelebrity={nameCelebrity} 
             onRecall={this.onRecall} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
