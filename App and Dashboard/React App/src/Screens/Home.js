/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';


export default class Home extends Component {
  constructor({navigation}) {
    // console.log("hello   "+navigation);
    super();
    this.navigation = navigation
}
  render() {
    return(
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container>
            {/* <Navbar left={left} right={right} title="MY STORE" /> */}
            <Content>
              {this.renderCategories()}
            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }

  renderCategories = () => {
    console.log(this);
    let cat = [];
    for(var i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image} title={categories[i].title} page={categories[i].page} navigation={this.navigation} />
      );
    }
    return cat;
  }

}

var categories = [
  {
    id: 1,
    title: 'Chat',
    image: 'https://cdn.pixabay.com/photo/2016/08/08/15/08/ship-1578528_960_720.jpg',
    page: 'Yoru',
  },
  {
    id: 2,
    title: 'Cruise Map',
    image: 'https://i2.wp.com/www.khabrainabhitak.org/wp-content/uploads/2019/06/navigate.jpg?resize=750%2C394&ssl=1',
    page: 'Cruise Map',
  },
  {
    id: 3,
    title: 'Chat with Crew',
    image: 'https://cdn.images.express.co.uk/img/dynamic/135/590x/cruises-cruise-ship-holidays-2019-crew-code-1042151.jpg?r=1541661135456',
    // page: 'preferences'
  },
  {
    id: 4,
    title: 'Preferences',
    image: 'https://cms-static.wehaacdn.com/documentmedia-com/images/5-Questions-to-Ask-for-Your-Customer-Preference-Ma__1.1786.jpg',
    page: 'preferences'
  },
  {
    id: 5,
    title: 'Take a Tour',
    image: 'https://www.picnicwale.com/special-offers/assets/images/family-tour-packages.jpg',
    page: 'namepage'
  }
];
