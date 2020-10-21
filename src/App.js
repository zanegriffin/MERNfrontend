import React, {useState, useEffect} from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom'
import Display from './components/Display'
import Form from './components/Form'

function App() {

//cat=category

  const url = 'https://mernbackendnutrition.herokuapp.com'

  const [categories, setCategories] = useState([])
  const [selectedCat, setSelectedCat] = useState({})
  const emptyCat = {
    name: '',
    img: '',
    amount: '',
    foods: []
  }

  const getCategories = () => {
    fetch(url + '/category')
    .then((response) => response.json())
    .then((data) => setCategories(data))
  }

  const handleCreate = (newCategory) => {
    fetch(url + '/category', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    }).then(response => {
      console.log(response)
      getCategories()
    })
  }

  const handleUpdate = (cat) => {
    fetch(url + '/category/' + cat._id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat)
    }).then(() => {
      getCategories()
    })
  }

  const handleDelete = (cat) => {
    console.log(cat._id)
    fetch(url + '/category/' + cat._id, {
      method: 'delete'
    }).then(() => {
      getCategories()
    })
  }

  const selectCat = (cat) => {
    setSelectedCat(cat)
  }

  useEffect(() => getCategories(), [])

  return (
    <div className="App">
      <h1>Nutrition</h1>
      <Link to='/create'>
        <button>Add Category</button>
      </Link>
      <Switch>
        <Route exact path='/' render={(rp) => <Display {...rp} categories={categories} selectCat={selectCat} deleteCat={handleDelete}/>}/>
        <Route exact path='/Create' render={() => <Form label='Create' handleSubmit={handleCreate} category={emptyCat}/>} />
        <Route exact path='/Edit' render={() => <Form label='Update' handleSubmit={handleUpdate} category={selectedCat}/>} />
      </Switch>
    </div>
  );
}

export default App;
