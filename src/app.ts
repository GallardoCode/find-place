import InputForm from './elements/InputForm'
import ObserverMapElement from './elements/MapElement'
import { mapQuery } from './models/MapQuery'

const mapEl = document.getElementById('map') as HTMLElement

const inputForm = new InputForm('searchForm', mapQuery.queryAddress)
inputForm.clearSearch()

const map = new ObserverMapElement(mapEl)
mapQuery.addObserver(map)
