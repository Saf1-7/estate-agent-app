// Import the useState hook from React
import { useState } from 'react'

// Import the JSON data that contains all property information
import propertyData from './data/properties.json'

// Import the CSS file for styling this page
import './App.css'

function App() {

  // Store the array of properties from the JSON file
  const properties = propertyData.properties

  // Stores what the user types in the search box
  const [searchTerm, setSearchTerm] = useState('')

  // Filters properties using the search text
  const filteredProperties = properties.filter((property) =>
    property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container">
      <header>
        <h1>Estate Agent Property Search</h1>
        <p>Find houses and flats that match your needs.</p>

        <input
        type="text"
        placeholder="Search by type or location..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
       />
      </header>

      <section className="property-grid">
        {filteredProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <div className="property-image-placeholder">
              No Image Available
            </div>

            <div className="property-info">
              <h2>{property.type}</h2>
              <p>{property.description}</p>
              <p><strong>Price:</strong> £{property.price}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p><strong>Location:</strong> {property.location}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App