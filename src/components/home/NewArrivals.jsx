import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../product/ProductGrid'
import { products } from '../../data/products'

const newArrivals = products.filter((product) => product.isNew).slice(0, 4)

function NewArrivals() {
  return (
    <section className="nx-container py-16 sm:py-20">
      <SectionHeading
        eyebrow="New Arrivals"
        title="Just landed"
        text="The latest additions to the NEXORA Smart Series."
        linkTo="/shop"
        linkLabel="Shop all products"
      />

      <ProductGrid
        products={newArrivals}
        gridClassName="grid-cols-2 lg:grid-cols-4"
      />
    </section>
  )
}

export default NewArrivals