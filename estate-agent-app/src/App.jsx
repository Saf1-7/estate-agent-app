// Import the useState hook from React
import { useState } from 'react'

// Import the JSON data that contains all property information
import propertyData from './data/properties.json'

// Import the CSS file for styling this page
import './App.css'

function App() {
  // Store the array of properties from the JSON file
  const properties = propertyData.properties

  // Store all search/filter values
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('Any')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minBedrooms, setMinBedrooms] = useState('')
  const [maxBedrooms, setMaxBedrooms] = useState('')
  const [postcode, setPostcode] = useState('')

  // Filter properties using all search criteria
  const filteredProperties = properties.filter((property) => {
    const matchesText =
      property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType =
      propertyType === 'Any' || property.type === propertyType

    const matchesMinPrice =
      minPrice === '' || property.price >= Number(minPrice)

    const matchesMaxPrice =
      maxPrice === '' || property.price <= Number(maxPrice)

    const matchesMinBedrooms =
      minBedrooms === '' || property.bedrooms >= Number(minBedrooms)

    const matchesMaxBedrooms =
      maxBedrooms === '' || property.bedrooms <= Number(maxBedrooms)

    const matchesPostcode =
      postcode === '' ||
      property.postcode.toLowerCase().includes(postcode.toLowerCase())

    // Property must pass all checks to appear
    return (
      matchesText &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinBedrooms &&
      matchesMaxBedrooms &&
      matchesPostcode
    )
  })

  return (
    <div className="container">
      <header>
        <h1>Estate Agent Property Search</h1>
        <p>Find houses and flats that match your needs.</p>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by type or location..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
          >
            <option value="Any">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>

          <input
            type="number"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />

          <input
            type="number"
            placeholder="Minimum Bedrooms"
            value={minBedrooms}
            onChange={(event) => setMinBedrooms(event.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum Bedrooms"
            value={maxBedrooms}
            onChange={(event) => setMaxBedrooms(event.target.value)}
          />

          <input
            type="text"
            placeholder="Postcode"
            value={postcode}
            onChange={(event) => setPostcode(event.target.value)}
          />
        </div>
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
              <p>
                <strong>Price:</strong> £{property.price}
              </p>
              <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </p>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <p>
                <strong>Postcode:</strong> {property.postcode}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App