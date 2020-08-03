/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  CheckBox,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
// import ReactDOM from "react-dom";

export default class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {name: 'Vegetarian', code: '#16a085', status: false},
        {name: 'EMERALD', code: '#2ecc71', status: false},
        {name: 'Non Veg', code: '#3498db', status: false},
        {name: 'AMETHYST', code: '#9b59b6', status: false},
        {name: 'WET ASPHALT', code: '#2ecc71', status: false},
        {name: 'GREEN SEA', code: '#16a085', status: false},
        {name: 'NEPHRITIS', code: '#27ae60', status: false},
        {name: 'BELIZE HOLE', code: '#2980b9', status: false},
      ],
      colors: [
        {color1: '#16a085', color2: 'gray'},
        {color1: '#2ecc71', color2: 'gray'},
        {color1: '#3498db', color2: 'gray'},
        {color1: '#9b59b6', color2: 'gray'},
        {color1: '#2ecc71', color2: 'gray'},
        {color1: '#27ae60', color2: 'gray'},
        {color1: '#2980b9', color2: 'gray'},
        {color1: '#9b59b6', color2: 'gray'},
      ],
    };
  }

  SampleFunction = name => {
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].name === name) {
        let newState = this.state.items;
        if (this.state.colors[i].color1 == this.state.items[i].code) {
          newState[i].code = this.state.colors[i].color2;
        } else {
          newState[i].code = this.state.colors[i].color1;
        }

        this.setState({items: newState});
      }
    }
  };

  render() {
    console.log(this.state.items);
    return (
      <FlatGrid
        itemDimension={130}
        items={this.state.items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({item, index}) => (
          <View>
            <TouchableOpacity onPress={() => this.SampleFunction(item.name)}>
              <View
                style={[styles.itemContainer, {backgroundColor: item.code}]}
                id={item.name}>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
