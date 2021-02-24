/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import { GeocodeResults } from './GeocodeResult'
import { Observer, Subject } from './observer'

export class MapQuery implements Subject {
  private static instance: MapQuery

  private _addresses: GeocodeResults['results'] = []

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
        if (status !== 'OK') {
          throw Error(`Error status: ${status}
          Response: ${JSON.stringify(response.data)}`)
        } else {
          this._addresses = results
          return results
        }
      })
      .then((results) => {
        if (results.length > 0) {
          this.notify()
        } else {
          throw Error('No search results')
        }
      })
      .catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  get addresses(): GeocodeResults['results'] {
    return this._addresses
  }

  addObserver(o: Observer): void {
    const isExist = this.observers.includes(o)
    if (isExist) {
      // eslint-disable-next-line no-console
      console.log('Subject: Observer has been attached already.')
    }
    this.observers.push(o)
  }

  removeObserver(o: Observer): void {
    const observerIndex = this.observers.indexOf(o)
    if (observerIndex === -1) {
      // eslint-disable-next-line no-console
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
