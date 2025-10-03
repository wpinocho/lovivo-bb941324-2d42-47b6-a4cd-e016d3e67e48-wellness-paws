import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const bundles = [
  {
    name: 'Essential Care',
    price: 89,
    originalPrice: 105,
    frequency: 'Monthly',
    items: ['Premium Food (5kg)', 'Probiotic Supplement', 'Dental Chews'],
    savings: '15%',
    popular: false,
  },
  {
    name: 'Complete Wellness',
    price: 129,
    originalPrice: 152,
    frequency: 'Monthly',
    items: ['Premium Food (10kg)', 'Omega-3 Fish Oil', 'Joint Support', 'Probiotic', 'Dental Chews'],
    savings: '15%',
    popular: true,
  },
  {
    name: 'Premium Plus',
    price: 169,
    originalPrice: 199,
    frequency: 'Monthly',
    items: ['Premium Food (15kg)', 'Full Supplement Set', 'Dental Care Kit', 'Calming Support', 'Free Shipping'],
    savings: '15%',
    popular: false,
  },
]

export const SubscriptionBundles = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {bundles.map((bundle) => (
        <Card
          key={bundle.name}
          className={`relative bg-white japanese-border overflow-hidden ${
            bundle.popular ? 'ring-2 ring-[#0E7490]' : ''
          }`}
        >
          {bundle.popular && (
            <div className="absolute top-0 right-0 bg-[#FDE68A] text-[#111827] text-xs font-medium px-3 py-1">
              Most Popular
            </div>
          )}
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#111827] mb-1">
                {bundle.name}
              </h3>
              <p className="text-sm text-gray-600">{bundle.frequency} Delivery</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0E7490]">
                  ${bundle.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${bundle.originalPrice}
                </span>
              </div>
              <p className="text-xs text-[#0E7490] font-medium mt-1">
                Save {bundle.savings} with subscription
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {bundle.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-[#0E7490] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full rounded-sm ${
                bundle.popular
                  ? 'bg-[#0E7490] hover:bg-[#0E7490]/90 text-white'
                  : 'bg-white hover:bg-gray-50 text-[#111827] japanese-border'
              }`}
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}