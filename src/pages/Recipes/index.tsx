import React, { Component } from 'react'
import Sandwich from '../../components/Sandwich'

export default class Recipes extends Component {
  render() {
    return (
      <>
        <div className="content">
          <Sandwich 
            ingredients={['rice', 'rice', 'rice', 'herbed sausage', 'herbed sausage', 'herbed sausage']} 
            seasonings={['whipped cream', 'horseradish', 'horseradish', 'chili sauce']} 
            powers={['Raid Power: Fighting, Lv. 2', 'Encounter Power: Ground, Lv. 1', 'Exp. Power: Water, Lv. 1']} 
          />
        </div>
      </>
    )
  }
}