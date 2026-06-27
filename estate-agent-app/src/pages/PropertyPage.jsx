import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import propertyData from '../data/properties.json'

function PropertyPage() {
  // Get the property ID from the URL
  const { id } = useParams()

  // Store the image currently being displayed
  const [selectedImage, setSelectedImage] = useState(0)

  // Find the matching property
  const property = propertyData.properties.find(
    (property) => property.id === id
  )

  // Show a message if the property doesn't exist
  if (!property) {
    return <h1>Property not found</h1>
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← Back to Search</Link>

      <img
        src={`/${property.pictures[selectedImage]}`}
        alt={property.location}
        className="property-detail-image"
      />

   {/* Display all property images */}
    <div className="thumbnail-gallery">
      {property.pictures.map((picture, index) => (
        <img
          key={index}
          src={`/${picture}`}
          alt={`Property ${index + 1}`}
          className="thumbnail"
          onClick={() => setSelectedImage(index)}
        />
    ))}
   </div>

      <h1>{property.type}</h1>

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
  )
}

export default PropertyPage