import React, {useState, useEffect} from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom'
import Display from './components/Display'
import Form from './components/Form'
import SubForm from './components/SubForm'
import axios from 'axios'

function App() {

//cat=category

  const url = 'https://mernbackendnutrition.herokuapp.com'

  const [categories, setCategories] = useState([])
  const [selectedSub, setSelectedSub] = useState({})
  const [selectedCat, setSelectedCat] = useState({})
  const emptySub = {
    name: '',
    list: ''
  }
  const emptyCat = {
    name: '',
    img: '',
    amount: '',
    foods: []
  }
  //GET categories
  const getCategories = () => {
    axios(url + '/category')
    .then((response) => setCategories(response.data))
  }
  //POST create categories
  const handleCreate = (newCategory) => {
    axios({
      url: url + '/category', 
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(newCategory)
    }).then(response => {
      console.log(response)
      getCategories()
    })
  }
//Sub creation
  const handleSubCreate = (newSubCategory) => {
    let cat = selectedCat._id
    console.log('this is current cat', selectedCat)
    axios({
      url: url + '/food/' + cat, 
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(newSubCategory)
    }).then(response => {
      console.log(response)
      getCategories()
    })
  }

//PUT update category
  const handleUpdate = (cat) => {
    axios({
      url: url + '/category/' + cat._id, 
      method: 'put',
      headers: {'Content-Type': 'application/json',},
      data: JSON.stringify(cat)
    }).then(() => {
      getCategories()
    })
  }
//sub cat update
  const handleSubUpdate = (sub) => {
    axios({
      url: url + '/food/' + sub._id, 
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(sub)
    }).then(() => {
      getCategories()
    })
  }
//Delete category
  const handleDelete = (cat) => {
    console.log(cat._id)
    axios({ 
      url:url + '/category/' + cat._id, 
      method: 'delete'
    }).then(() => {
      getCategories()
    })
  }
//Delete sub food
  const handleSubDelete = (sub) => {
    console.log(sub._id)
    axios({
      url: url + '/food/' + sub._id, 
      method: 'delete'
    }).then(() => {
      getCategories()
    })
  }

  const selectCat = (cat) => {
    setSelectedCat(cat)
  }

  const selectSub = (sub) => {
    console.log('this i ssub',sub)
    setSelectedSub(sub)
  }

  useEffect(() => getCategories(), [])

  return (
    <div className="App">
      <header><h1>Nutrition Plate</h1></header>
      <br/>
      <Link to='/create'>
        <button className='cat-create'>Add Category</button>
      </Link>
      <Switch>
        <Route exact path='/' render={(rp) => <Display {...rp} categories={categories} selectCat={selectCat} deleteCat={handleDelete} selectSub={selectSub} deleteSub={handleSubDelete}/>}/>
        <Route exact path='/Create' render={(rp) => <Form {...rp} label='Create' handleSubmit={handleCreate} category={emptyCat}/>} />
        <Route exact path='/Edit' render={(rp) => <Form {...rp} label='Update' handleSubmit={handleUpdate} category={selectedCat}/>} />
        <Route exact path ='/SubCreate' render={(rp) => <SubForm label='Create' {...rp} handleSubmit={handleSubCreate} subcategory={emptySub} />} />
        <Route exact path ='/SubEdit' render={(rp) => <SubForm label='Update' {...rp} handleSubmit={handleSubUpdate} subcategory={selectedSub} />} />
      </Switch>
    </div>
  );
}

export default App;
