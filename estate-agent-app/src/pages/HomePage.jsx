// Import React hook, property data and CSS
import { useState } from 'react'
import { Link } from 'react-router-dom'
import propertyData from '../data/properties.json'
import '../App.css'


function HomePage() {

  // Get all properties from the JSON file
  const properties = propertyData.properties

  // Store the values entered by the user
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('Any')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minBedrooms, setMinBedrooms] = useState('')
  const [maxBedrooms, setMaxBedrooms] = useState('')
  const [postcode, setPostcode] = useState('')

  // Filter the properties based on the selected search options
  const filteredProperties = properties.filter((property) => {

    // Check if the property matches each search option
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

    // Only show properties that match every filter
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

        {/* Search and filter controls */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by type or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="Any">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>

          <input
            type="number"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Minimum Bedrooms"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
          />

          <input
            type="number"
            placeholder="Maximum Bedrooms"
            value={maxBedrooms}
            onChange={(e) => setMaxBedrooms(e.target.value)}
          />

          <input
            type="text"
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>
      </header>

            {/* Display all matching properties */}
      <section className="property-grid">
        {filteredProperties.map((property) => (
          <Link
            to={`/property/${property.id}`}
            key={property.id}
            className="property-link"
          >
            <div className="property-card">
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
          </Link>
        ))}
      </section>
    </div>
  )
}

export default HomePage