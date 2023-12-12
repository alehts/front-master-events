import React from 'react';
import './main.scss';
import ComponentCarousel from '../Carousel/ComponentCarousel';
import Card from '../Card/Card';


class Main extends React.Component {
  render() {
    return (
      <div className="mainPage">
        <div className="AppGlassMain">
          <ComponentCarousel />
          <Card />
        </div>

      </div>

    )
  }
}

export default Main;