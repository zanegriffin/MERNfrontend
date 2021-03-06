import React from 'react'

const Form = (props) => {
 console.log(props)
    const [formData, setFormData] = React.useState(props.category);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent Form from Refreshing
        props.handleSubmit(formData); // Submit to Parents desired function
        props.history.push("/"); //Push back to display page
      };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
              <h3>Title</h3>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <h3>Amount per Day</h3>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
                <h3>Image Url</h3>
                <input
                  type="text"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                />
                <input type="submit" value={props.label} />
            </form>
        </div>
    )
}

export default Form