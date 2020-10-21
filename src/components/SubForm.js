import React from 'react'

const SubForm = (props) => {

    const [formData, setFormData] = React.useState(props.subcategory);
console.log(props.subcategory)
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
                <h3>Name</h3>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <h3>List</h3>
                <input
                  type="text"
                  name="list"
                  value={formData.list}
                  onChange={handleChange}
                />
                <input type="submit" value={props.label} />
            </form>
        </div>
    )
}

export default SubForm