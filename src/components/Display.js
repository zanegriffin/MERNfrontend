import React from 'react'

const Display = (props) => {

    const subcards = props.categories.map((category) => category.foods.map((food) => {
        return (
            <>
                <h5>{food.name}</h5>
                <p>{food.list}</p>
            </>
        )
    }))

    const cards = props.categories.map((category, index) => {
        return(
            <>
            <div>
                <img src={category.img}/>
                <button onClick={() => {
                    props.selectCat(category);
                    props.history.push("/Edit");
                }}>Edit Category</button>
                <button onClick={() => {
                    props.deleteCat(category);
                }}>Delete</button>
                <h3>{category.name}</h3>
                <h5>Amount of total food per day: {category.amount}</h5>
                {subcards[index]}
            </div>
            </>
        )
    })

    return (
        <div>
            {cards}
        </div>
    )
}

export default Display