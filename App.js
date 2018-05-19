import React from 'react';
import { StyleSheet, View} from 'react-native';

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import placeImage from "./src/assets/app.jpg"
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";

export default class App extends React.Component {
  state = {
    places: [],
    selectedPlace: null
  }

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({ 
          key: Math.random(), 
          name: placeName,
          image: {
            uri: "https://www.flickr.com/photos/10113436@N02/42101063332/in/explore-2018-05-16/"
          }
        })
      }
    })
  }

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      }
    })
  }

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    })
  }

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.state.selectedPlace} 
          onItemDeleted={this.placeDeletedHandler} 
          onModalClosed={this.modalClosedHandler} 
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
