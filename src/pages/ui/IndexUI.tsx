import { ProductCard } from '@/components/ProductCard'
import { CollectionCard } from '@/components/CollectionCard'
import { FloatingCart } from '@/components/FloatingCart'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { PetSelector } from '@/components/PetSelector'
import { SubscriptionBundles } from '@/components/SubscriptionBundles'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex'

interface IndexUIProps {
  logic: UseIndexLogicReturn
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    searchTerm,
    selectedCollectionId,
    filteredProducts,
    setSearchTerm,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic

  const handlePetSelection = (petType: 'dog' | 'cat', age: string, breed: string) => {
    console.log('Pet selected:', { petType, age, breed })
    // Scroll to products section
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0E7490]/5 via-white to-[#FDE68A]/10 py-20 border-b japanese-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="text-xs font-medium text-[#0E7490] bg-[#FDE68A]/30 px-3 py-1 rounded-full">
                  Premium Pet Wellness
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#111827] leading-tight">
                Nourish Your
                <br />
                <span className="text-[#0E7490]">Best Friend</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Scientifically formulated nutrition and supplements tailored to your pet's unique needs. 
                Premium ingredients, delivered monthly.
              </p>
              <div className="flex gap-4">
                <Button 
                  className="bg-[#0E7490] hover:bg-[#0E7490]/90 text-white px-8 py-6 text-base rounded-sm"
                  onClick={() => document.getElementById('pet-selector')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Build Your Box
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="japanese-border px-8 py-6 text-base rounded-sm hover:bg-gray-50"
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Now
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in">
              <div className="aspect-square rounded-sm overflow-hidden minimal-shadow">
                <img
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=800&fit=crop"
                  alt="Happy dog and cat"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white japanese-border rounded-sm p-4 minimal-shadow">
                <p className="text-sm font-medium text-[#111827]">
                  Trusted by 10,000+ pet parents
                </p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#FDE68A] text-lg">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Selector Section */}
      <section id="pet-selector" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-3">
              Personalized Nutrition
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tell us about your pet and we'll recommend the perfect products for their age, breed, and lifestyle
            </p>
          </div>
          <PetSelector onSelect={handlePetSelection} />
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#111827] mb-3">
                Shop by Category
              </h2>
              <p className="text-gray-600">
                Premium products for every aspect of your pet's health
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.slice(0, 3).map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscription Bundles Section */}
      <section className="py-20 bg-gradient-to-br from-[#0E7490]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-3">
              Subscription Bundles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Save 15% with monthly delivery. Cancel anytime, no commitments.
            </p>
          </div>
          <SubscriptionBundles />
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Products'}` 
                  : 'Featured Products'
                }
              </h2>
              <p className="text-gray-600">
                Premium quality, scientifically formulated
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="japanese-border rounded-sm"
              >
                View All Products
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-sm h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchTerm 
                  ? 'No products found matching your search.' 
                  : 'No products available.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FDE68A] mb-2">100%</div>
              <p className="text-gray-300">Natural Ingredients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FDE68A] mb-2">10K+</div>
              <p className="text-gray-300">Happy Pet Parents</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FDE68A] mb-2">24/7</div>
              <p className="text-gray-300">Veterinary Support</p>
            </div>
          </div>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  )
}