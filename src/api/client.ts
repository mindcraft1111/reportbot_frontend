export const get_reviews = async (product_id: number) => {
    const response = await fetch(`http://127.0.0.1:8000/api/reviews?product_id=${product_id}`)
    const data = await response.json()
    return data
}
