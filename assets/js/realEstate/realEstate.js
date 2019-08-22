import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Filter from './Filter'
import Listings from './Listings'
import listingsData from './data/listingsData'

class App extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Gucci af',
      listingsData,
      city: 'All',
      propertyType: 'All',
      bedrooms: 1,
      bathrooms: 1,
      min_floor_space: 0,
      max_floor_space: 150000,
      min_price: 0,
      max_price: 10000000,
      elevator: false,
      swimming_pool: false,
      finished_basement: false,
      filteredData: listingsData,
      populateFormsData: []
    }
    this.change = this.change.bind(this)
    this.filteredData = this.filteredData.bind(this)
    this.populateForms = this.populateForms.bind(this)
  }

  change(event) {
    const name = event.target.name
    const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value

    this.setState({
      [name]: value
    }, () => {
      this.filteredData()
    })
  }

  filteredData() {
    let newData = this.state.listingsData.filter((listing) => {
      return listing.price >= this.state.min_price && listing.price <= this.state.max_price
      && listing.floorSpace >= this.state.min_floor_space && listing.floorSpace <= this.state.max_floor_space
      && listing.bedrooms >= this.state.bedrooms
      && listing.bathrooms >= this.state.bathrooms
    })

    if (this.state.city != "All") {
      newData = newData.filter((listing) => {
        return listing.city === this.state.city
      })
    }

    if (this.state.propertyType != "All") {
      newData = newData.filter((listing) => {
        return listing.propertyType === this.state.propertyType
      })
    }

    if (this.state.elevator === true) {
      newData = newData.filter((listing) => {
        return listing.extras.elevator === this.state.elevator
      })
    }

    if (this.state.swimming_pool === true) {
      newData = newData.filter((listing) => {
        return listing.extras.swimming_pool === this.state.swimming_pool
      })
    }

    if (this.state.finished_basement === true) {
      newData = newData.filter((listing) => {
        return listing.extras.finished_basement === this.state.finished_basement
      })
    }

    this.setState({
      filteredData: newData
    }, () => {
      console.log(this.state.elevator)
    })
  }

  populateForms() {
    // city
    let cities = this.state.listingsData.map((listing) => {
      return listing.city
    })

    cities = new Set(cities)
    cities = [...cities]
    // property type
    let propertyTypes = this.state.listingsData.map((listing) => {
      return listing.propertyType
    })

    propertyTypes = new Set(propertyTypes)
    propertyTypes = [...propertyTypes]
    // bedrooms
    let bedrooms = this.state.listingsData.map((listing) => {
      return listing.bedrooms
    })

    bedrooms = new Set(bedrooms)
    bedrooms = [...bedrooms]
    // bathrooms
    let bathrooms = this.state.listingsData.map((listing) => {
      return listing.bathrooms
    })

    bathrooms = new Set(bathrooms)
    bathrooms = [...bathrooms]

    this.setState({
      populateFormsData: {
        cities,
        propertyTypes,
        bedrooms,
        bathrooms
      }
    })
  }

  render () {
    return (
      <div>
        <Header />
        <section id="content-area">
          <Filter change={this.change} globalState={this.state} populateAction={this.populateForms}/>
          <Listings listingsData={this.state.filteredData}/>
        </section>
      </div>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<App />, app)
