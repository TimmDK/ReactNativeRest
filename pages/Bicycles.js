import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button, ScrollView} from 'react-native';
import { mainStyles } from '../Stylesheet';

class Homescreen extends Component{
    
    constructor(props){
        super(props)
    
        this.state = {
            data: [],
            isLoading: true
        }
    }

    deleteBicycle(id){
        fetch('https://anbo-bicyclefinder.azurewebsites.net/api/bicycles/' + id, {
			method: 'DELETE'
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
            windows.location.reload(false)
        })
    }

    addBicycle()
    {
        fetch('https://mywebsite.com/endpoint/', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstParam: 'yourValue',
            secondParam: 'yourOtherValue'
        })
        })
    }

    componentDidMount() {
        // try {
        //     const apiCall = await fetch('https://anbo-bicyclefinder.azurewebsites.net/api/bicycles')
        //     const result = await apiCall.json()
        //     this.setState ({ data: result.results, isLoading: false})
        // } catch (error) {
        //     console.error(error)
        // }

        fetch('https://anbo-bicyclefinder.azurewebsites.net/api/bicycles')
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json });
        })
        .catch(e => {
            console.log(e);
        })
        .finally(() => {
            this.setState({ isLoading: false });
        });
      }

    render(){
        const { navigation } = this.props;
        const { data, isLoading } = this.state

        return(
            <View style={mainStyles.container}>
                <View  style={{flex:1, marginBottom: 10}}> 
                    <Text>LIST OF BICYCLES</Text>
                    <Button title="ADD BICYCLE" onPress={() => navigation.navigate('SINGLE BICYCLE', {modeChosen: "Add"})}/>
                </View>
                <View  style={{flex: 9, width: "100%"}}>
                    <ScrollView> 
                        {isLoading ? <ActivityIndicator /> :( 
                            <FlatList data={data} keyExtractor={({ id }, index) => id.toString()} renderItem={({ item }) => (
                                <View style={{padding: 10, marginBottom: 10, borderWidth: 1, alignItems: "center"}}>
                                    <Text style={{fontWeight: "bold", fontSize: 15}}>Framenumber: {item.frameNumber}</Text>
                                    <Text>Kind of bicycle: {item.kindOfBicycle}</Text>
                                    <Text>Brand: {item.brand}</Text>
                                    <Text>Colors: {item.colors}</Text>
                                    <Text>Place: {item.place}</Text>
                                    <Text>Date: {item.date}</Text>
                                    <Text>Missing/Found: {item.missingFound}</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <Button onPress={() => navigation.navigate('SINGLE BICYCLE', 
                                        { idToEdit: item.id, modeChosen: "Edit" })} title="Edit" />
                                        <Button onPress={() => this.deleteBicycle(item.id)} title="Delete" />
                                    </View>
                                </View>    
                                )}
                            />
                        )}
                    </ScrollView>
                </View>
                <StatusBar style="auto" />
            </View>
        );
    }
}

export default Homescreen