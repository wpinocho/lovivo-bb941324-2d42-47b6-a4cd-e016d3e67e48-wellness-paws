import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white japanese-border ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0E7490] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-[#111827]">PetWell</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-[#111827] hover:text-[#0E7490] transition-colors text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="text-[#111827] hover:text-[#0E7490] transition-colors text-sm font-medium"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Cart */}
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative hover:bg-gray-100 rounded-sm"
            >
              <ShoppingCart className="h-5 w-5 text-[#111827]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0E7490] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-[#111827]">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-[#111827] text-white py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0E7490] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">PetWell</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Premium pet wellness products scientifically formulated for your pet's optimal health. 
              Trusted by thousands of pet parents worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Blog
              </Link>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                About Us
              </a>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2024 PetWell. All rights reserved.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}