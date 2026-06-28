import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import propertyData from '../data/properties.json'

function PropertyPage() {
  // Get the property ID from the URL
  const { id } = useParams()

  // Store the image currently being displayed
  const [selectedImage, setSelectedImage] = useState(0)

  const [activeTab, setActiveTab] = useState('description')

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

      {/* Property information displayed using React Tabs */}
      <div className="tabs">
        <div className="tab-list">
          <button
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={activeTab === 'floor-plan' ? 'active' : ''}
            onClick={() => setActiveTab('floor-plan')}
          >
            Floor Plan
          </button>
          <button
            className={activeTab === 'google-map' ? 'active' : ''}
            onClick={() => setActiveTab('google-map')}
          >
            Google Map
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="tab-panel">
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
          )}

          {activeTab === 'floor-plan' && (
            <div className="tab-panel">
              <img
                src={`/${property.pictures[2]}`}
                alt="Floor Plan"
                className="property-detail-image"
              />
            </div>
          )}

          {activeTab === 'google-map' && (
            <div className="tab-panel">
              <img
                src={`/${property.pictures[3]}`}
                alt="Google Map"
                className="property-detail-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyPage