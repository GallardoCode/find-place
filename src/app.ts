import InputForm from './elements/InputForm'
import ObserverMapElement from './elements/MapElement'
import { createElementToggler } from './models/elementToggler'
import ButtonSubject from './elements/ButtonSubject'
import { mapQuery } from './models/MapQuery'

const mapEl = document.getElementById('map') as HTMLElement

const inputForm = new InputForm('searchForm', mapQuery.queryAddress)
inputForm.clearSearch()

const map = new ObserverMapElement(mapEl)
mapQuery.addObserver(map)

const menuButton = new ButtonSubject('menubutton')
const openMenu = createElementToggler('openmenu', ['block', 'hidden'])
const closeMenu = createElementToggler('closemenu', ['block', 'hidden'])
const mobileMenu = createElementToggler('mobile-menu', ['hidden'])
menuButton.addObserver(openMenu)
menuButton.addObserver(closeMenu)
menuButton.addObserver(mobileMenu)
