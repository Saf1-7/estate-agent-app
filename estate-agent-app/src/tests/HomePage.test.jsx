import { test, expect } from 'vitest'
import propertyData from '../data/properties.json'

const properties = propertyData.properties

test('JSON contains 7 properties', () => {
  expect(properties.length).toBe(7)
})

test('filters properties by type', () => {
  const results = properties.filter((property) => property.type === 'Flat')

  expect(results.length).toBeGreaterThan(0)
  expect(results.every((property) => property.type === 'Flat')).toBe(true)
})

test('filters properties by minimum price', () => {
  const results = properties.filter((property) => property.price >= 500000)

  expect(results.length).toBeGreaterThan(0)
  expect(results.every((property) => property.price >= 500000)).toBe(true)
})

test('filters properties by postcode', () => {
  const results = properties.filter((property) =>
    property.postcode.toLowerCase().includes('br5')
  )

  expect(results.length).toBeGreaterThan(0)
})

test('prevents duplicate favourites', () => {
  const favourites = []
  const property = properties[0]

  const addToFavourites = (propertyToAdd) => {
    const alreadyAdded = favourites.some(
      (fav) => fav.id === propertyToAdd.id
    )

    if (!alreadyAdded) {
      favourites.push(propertyToAdd)
    }
  }

  addToFavourites(property)
  addToFavourites(property)

  expect(favourites.length).toBe(1)
})