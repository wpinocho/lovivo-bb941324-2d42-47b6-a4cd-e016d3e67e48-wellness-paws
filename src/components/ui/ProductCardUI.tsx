import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-white japanese-border rounded-sm overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-gray-50 overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {logic.discountPercentage && (
                    <span className="bg-[#0E7490] text-white text-xs px-2 py-1 rounded-sm font-medium">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-[#FDE68A] text-[#111827] text-xs px-2 py-1 rounded-sm font-medium">
                      Featured
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-sm font-medium">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${logic.product.slug}`}>
                <h3 className="text-[#111827] font-medium text-sm mb-2 line-clamp-2 hover:text-[#0E7490] transition-colors">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </Link>

              {logic.hasVariants && logic.options && (
                <div className="mb-3 space-y-2">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-medium text-[#111827] mb-1">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-6 w-6 rounded-full border-2 ${
                                  isSelected ? 'border-[#0E7490]' : 'border-gray-300'
                                } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                                style={{ backgroundColor: swatch }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`japanese-border rounded-sm px-2 py-1 text-xs font-medium transition-colors ${
                                isSelected 
                                  ? 'border-[#0E7490] bg-[#0E7490] text-white' 
                                  : logic.selected[opt.name] && !isSelected
                                    ? 'border-gray-300 bg-white text-gray-700 opacity-40'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                              title={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[#0E7490] font-semibold">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-gray-400 text-xs line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className="japanese-border rounded-sm text-[#111827] hover:bg-[#0E7490] hover:text-white hover:border-[#0E7490] disabled:opacity-50 transition-colors"
                >
                  {logic.inStock ? 'Add' : 'Out of stock'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}