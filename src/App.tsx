import { Component } from 'react'
import './App.css'
import stocks from './stockData.json'

type LocationView = {
  location: string
  collapsed: boolean
}

export default class App extends Component<{}, { locations: LocationView[] }> {
  constructor(props: any) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.getState = this.getState.bind(this)
    this.state = { locations: [] }

    stocks.row.forEach((row) => {
      row.locations.forEach((location) => {
        this.state.locations.push({ location: location.name, collapsed: false })
      })
    })
  }

  getState(location: string) {
    return this.state.locations.find(
      (state: LocationView) => state.location === location
    )
  }

  handleToggle(state: LocationView) {
    const newToggles = this.state.locations.map((data) => {
      if (data.location === state.location) {
        data.collapsed = !data.collapsed
      }
      return data
    })

    this.setState({
      locations: newToggles,
    })
  }

  render() {
    return (
      <div className="App">
        <ul>
          <li>{stocks.label}</li>
          {stocks.row.map((row) => {
            return (
              <ul key={row.level}>
                <li>Level: {row.level}</li>
                {row.locations.map((location) => {
                  return (
                    <ul key={location.name}>
                      <li>
                        <span
                          onClick={() =>
                            this.handleToggle(this.getState(location.name)!)
                          }
                          className={
                            this.getState(location.name)!.collapsed
                              ? 'toggled-off'
                              : 'toggled-on'
                          }
                        >
                          Location: {location.name}
                        </span>
                      </li>
                      {location.stock.map((stock) => {
                        return (
                          <ul
                            className={
                              this.getState(location.name)!.collapsed
                                ? 'collapsed'
                                : 'opened'
                            }
                            key={stock.product}
                          >
                            <li>Product: {stock.product}</li>
                            <li>Quantity: {stock.qty}</li>
                            <li>Replenishment: {stock.replenishment}</li>
                          </ul>
                        )
                      })}
                    </ul>
                  )
                })}
              </ul>
            )
          })}
        </ul>
      </div>
    )
  }
}
