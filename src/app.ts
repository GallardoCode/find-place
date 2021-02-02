import InputForm from './elements/InputForm'
import { mapQuery } from './models/MapQuery'

const inputForm = new InputForm('searchForm', mapQuery.queryAddress)
inputForm.clearSearch()
