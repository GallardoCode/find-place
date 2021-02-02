import axios from 'axios'
import { GeocodeResults } from './GeocodeResult'
import { Observer, Subject } from './observer'

export class MapQuery implements Subject {
  private static instance: MapQuery

  private addresses: GeocodeResults['results'] = []

  private url: string

  private apiKey: string

  private observers: Observer[] = []

  constructor() {
    this.url = process.env.GEOCODE_URL as string
    this.apiKey = process.env.API_KEY as string
  }

  static getInstance(): MapQuery {
    if (MapQuery.instance) {
      return MapQuery.instance
    }
    MapQuery.instance = new MapQuery()
    return MapQuery.instance
  }

  queryAddress = (address: string): void => {
    const url = `${this.url}?address=${encodeURI(address)}&key=${this.apiKey}`
    axios
      .get<GeocodeResults>(url)
      .then((response) => {
        const { status, results } = response.data
        if (status === 'OK') {
          this.adresses = results
          console.log(this.addresses)
        } else {
          throw Error(`Error status: ${status}
          Response: ${JSON.stringify(response.data)}`)
        }
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }

  // set addresses(addressResults: GeocodeResults['results']){
  //   this.addresses = addressResults
  // }
  set adresses(addressResults: GeocodeResults['results']) {
    this.addresses = addressResults
    console.log('set address')
  }

  addObserver(o: Observer): void {
    const isExist = this.observers.includes(o)
    if (isExist) {
      console.log('Subject: Observer has been attached already.')
    }
    this.observers.push(o)
  }

  removeObserver(o: Observer): void {
    const observerIndex = this.observers.indexOf(o)
    if (observerIndex === -1) {
      console.log('Subject: Nonexistent observer.')
    }

    this.observers.splice(observerIndex, 1)
  }

  notify(): void {
    this.observers.forEach((observer) => {
      observer.onNotify(this)
    })
  }
}

export const mapQuery = MapQuery.getInstance()
