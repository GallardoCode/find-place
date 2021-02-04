import { Loader } from '@googlemaps/js-api-loader'
import { MapQuery } from '../models/MapQuery'
import { Observer, Subject } from '../models/observer'

export default class ObserverMapElement implements Observer {
  private apiKey: string

  private loader: Loader

  private map?: google.maps.Map

  private marker?: google.maps.Marker

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

  mapLoad = async (
    mapOptions: google.maps.MapOptions,
  ): Promise<void | google.maps.Map<Element> | google.maps.StreetViewPanorama | null | undefined> => {
    const value = await this.loader
      .load()
      .then(() => {
        this.map = new google.maps.Map(this.mapElement, mapOptions)
        return this.map
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
    return value
  }

  markerLoad = async (
    markerOptions: google.maps.MarkerOptions,
  ): Promise<void | google.maps.Map<Element> | google.maps.StreetViewPanorama | null | undefined> => {
    const value = this.loader
      .load()
      .then(() => {
        this.marker = new google.maps.Marker(markerOptions)
        return this.marker.getMap()
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(err.message)
        } else {
          // eslint-disable-next-line no-console
          console.error(String(err))
        }
      })
    return value
  }

  async onNotify(
    s: Subject,
  ): Promise<void | google.maps.Map<Element> | google.maps.StreetViewPanorama | null | undefined> {
    if (s instanceof MapQuery && s.addresses.length > 0) {
      const {
        geometry: { location },
        formatted_address: formatedAdress,
      } = s.addresses[0]
      const element = await this.mapLoad({ center: location, zoom: 16 })
      if (element instanceof google.maps.Map || element instanceof google.maps.StreetViewPanorama) {
        this.markerLoad({ label: formatedAdress, position: location, map: element })
      }
      return element
    }
    return undefined
  }
}
