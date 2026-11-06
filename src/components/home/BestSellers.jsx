import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../product/ProductGrid'
import { products } from '../../data/products'

const bestSellers = products.filter((product) => product.bestSeller).slice(0, 4)

function BestSellers() {
  return (
    <section className="border-y border-nx-border bg-nx-surface/50">
      <div className="nx-container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Best Selling"
          title="Customer favorites"
          text="The devices our customers love most, rated and reviewed."
          linkTo="/shop"
          linkLabel="Shop all products"
        />

        <ProductGrid
          products={bestSellers}
          gridClassName="grid-cols-2 lg:grid-cols-4"
        />
      </div>
    </section>
  )
}

export default BestSellers