import { Loader } from '@googlemaps/js-api-loader'
import { MapQuery } from '../models/MapQuery'
import { Observer, Subject } from '../models/observer'

export default class ObserverMapElement implements Observer {
  private apiKey: string

  private loader: Loader

  constructor(private mapElement: HTMLElement) {
    this.apiKey = process.env.API_KEY as string
    if (this.apiKey) {
      this.loader = new Loader({
        apiKey: this.apiKey,
      })
    } else {
      throw new Error('no api key detected')
    }
  }

  mapLoad = (mapOptions: google.maps.MapOptions): void => {
    let map: google.maps.Map
    this.loader
      .load()
      .then(() => {
        map = new google.maps.Map(this.mapElement, mapOptions)
      })
      .catch((err) => {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(err.message)
        } else {
          // eslint-disable-next-line no-console
          console.error(String(err))
        }
      })
  }

  onNotify(s: Subject): void {
    if (s instanceof MapQuery && s.addresses.length > 0) {
      const {
        geometry: {
          location: { lat, lng },
        },
      } = s.addresses[0]
      this.mapLoad({ center: { lat, lng }, zoom: 16 })
    }
  }
}
