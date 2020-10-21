import React from 'react'

const Display = (props) => {

    const handleOnClick = (event) => {
        event.preventDefault()
        props.history.push('/SubCreate')
    }

    const subcards = props.categories.map((category) => category.foods.map((food) => {
        console.log(food)
        return (
            <div>
                <h5 onClick={() => {
                    props.selectSub(food);
                    props.selectCat(category);
                    props.history.push("/SubEdit");
                }}>{food.name}</h5>
                <p>{food.list}</p>
                <button onClick={() => {props.deleteSub(food);}}>Remove</button> 
            </div>
        )
    }))

    const cards = props.categories.map((category, index) => {
        return(
            <>
            <div className='cards'>
                <div className='img' style={{backgroundImage: "url(" + category.img + ")"}}></div>
                <button onClick={() => {
                    props.selectCat(category);
                    props.history.push("/Edit");}}>Edit Category</button>
                <button onClick={() => {props.deleteCat(category);}}>Delete</button>
                <h3>{category.name}</h3>
                <h5>Amount of total food per day: {category.amount}</h5>
                <button className='add-sub' onClick={() => {
                    props.history.push("/SubCreate")
                    props.selectCat(category)
                }}>Add Subcategory</button>
                {subcards[index]}
            </div>
            </>
        )
    })

    return (
        <div className='container'>
            {cards}
        </div>
    )
}

export default Display