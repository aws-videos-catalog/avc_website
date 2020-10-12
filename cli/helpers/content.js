export function flattenServicesList (categoryServices) {
  const servicesPerCategory = Object.values(categoryServices)

  return servicesPerCategory.reduce((result, services) => {
    return [
      ...result,
      ...services
    ]
  }, [])
}
