import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { mainStyles, inputStyles } from '../Stylesheet';
// import { TextInput } from 'react-native-gesture-handler';

class SingleBicycle extends Component{
    
    constructor(props){
        super(props)
    
        this.state = {
            selectedValue: "",
            frameNumber: "",
            kindOfBicycle: "",
            brand: "",
            colors: "",
            location: "",
            date: "",
            bikeAdded: false,
            bikeEdited: false,
            idToEdit: null
        }
    }

    handleInput(text, name){
            this.setState({ [name] : text})
    }

    addBicycle()
    {
        let today = new Date().toISOString().slice(0, 10)
        var methodToUse = ""
        var tempId = null

        this.state.idToEdit != null ? methodToUse = "PATCH" : methodToUse = "POST"
        this.state.idToEdit != null ? tempId = this.state.idToEdit : tempId = ""

        console.log("Framenumber: " + this.state.frameNumber)
        console.log("kindOfBicycle: " + this.state.kindOfBicycle)
        console.log("Selected Value: " + this.state.selectedValue)
        console.log("Brand: " + this.state.brand)
        console.log("Colors: " + this.state.colors)
        console.log("location: " + this.state.location)
        
        fetch('https://anbo-bicyclefinder.azurewebsites.net/api/bicycles/'+tempId, {
            method: methodToUse,
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FrameNumber: this.state.frameNumber,
            KindOfBicycle: this.state.kindOfBicycle,
            Brand: this.state.brand,
            Colors: this.state.colors,
            Place: this.state.location,
            Date: today,
            MissingFound: this.state.selectedValue
        })
        })
        .finally(() => {
            this.state.idToEdit != null ? this.setState({bikeEdited: true}) : this.setState({bikeAdded: true})      
        })
    }

    componentDidMount(){
        const route = this.props;
        var tempId = Object.values(route);

        if(tempId[1].params.modeChosen == "Edit"){
            this.setState({idToEdit: JSON.stringify(tempId[1].params.idToEdit)})
            tempId = JSON.stringify(tempId[1].params.idToEdit)
            
            if(tempId != null){
                fetch('https://anbo-bicyclefinder.azurewebsites.net/api/bicycles/id/'+tempId)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    console.log('https://anbo-bicyclefinder.azurewebsites.net/api/bicycles/id/'+tempId)
                    this.setState({ frameNumber: json.frameNumber });
                    this.setState({ kindOfBicycle: json.kindOfBicycle });
                    this.setState({ kindOfBicycle: json.kindOfBicycle });
                    this.setState({ brand: json.brand });
                    this.setState({ colors: json.colors });
                    this.setState({ location: json.place });
                    this.setState({ date: json.date });
                    this.setState({ selectedValue: json.missingFound });
                })
                .catch(e => {
                    console.log(e);
                })
                .finally(() => {
                    this.setState({ isLoading: false });
                });
            }
        }
    }

    render(){
        return(
            <View style={mainStyles.container}>
                <Text style={{flex: 1}}>{this.state.idToEdit != null ? "Editing Bicycle" : "Add Bicycle"}</Text>
                <View style={{flex: 9, width: "100%"}}>
                    <TextInput style={inputStyles.inputField} value={this.state.frameNumber} onChangeText={(text) => { this.handleInput(text, 'frameNumber')}}  placeholder="Framenumber"/>
                    <TextInput style={inputStyles.inputField} value={this.state.kindOfBicycle} onChangeText={(text) => { this.handleInput(text, 'kindOfBicycle')}} placeholder="Kind of bicycle" />
                    <TextInput style={inputStyles.inputField} value={this.state.brand} onChangeText={(text) => { this.handleInput(text, 'brand')}} placeholder="Brand" />
                    <TextInput style={inputStyles.inputField} value={this.state.colors} onChangeText={(text) => { this.handleInput(text, 'colors')}} placeholder="Color(s)" />
                    <TextInput style={inputStyles.inputField} value={this.state.location} onChangeText={(text) => { this.handleInput(text, 'location')}} placeholder="Location" />
                    <Picker
                    style={inputStyles.inputField}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({selectedValue: itemValue})
                    }>
                    <Picker.Item label="Missing" value="Missing" />
                    <Picker.Item label="Found" value="Found" />
                    </Picker>
                    <Button onPress={() => this.addBicycle()} title="Add Bicycle" />
                    <Text>{this.state.bikeAdded ? "Cykel blev tilføjet" : ""}</Text>
                    <Text>{this.state.bikeEdited ? "Cykel blev redigeret" : ""}</Text>
                </View>
            </View>
        );
    }
}

export default SingleBicycle