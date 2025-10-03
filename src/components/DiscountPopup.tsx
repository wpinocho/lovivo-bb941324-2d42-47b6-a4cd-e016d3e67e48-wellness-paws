import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DiscountPopupProps {
  isOpen: boolean
  onClose: () => void
}

export const DiscountPopup = ({ isOpen, onClose }: DiscountPopupProps) => {
  const discountCode = 'WELCOME10'

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode)
    // You could add a toast notification here
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md japanese-border rounded-sm p-0 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="bg-gradient-to-br from-[#0E7490]/5 via-white to-[#FDE68A]/10 p-8">
          <div className="text-center space-y-4">
            {/* Icon/Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FDE68A] rounded-full mb-2">
              <span className="text-3xl">🎁</span>
            </div>

            {/* Title */}
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#111827]">
                ¡Bienvenido a PetWell!
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 mt-2">
                Obtén un 10% de descuento en tu primera compra
              </DialogDescription>
            </DialogHeader>

            {/* Discount Code */}
            <div className="bg-white japanese-border rounded-sm p-4 my-6">
              <p className="text-xs text-gray-500 mb-2">Código de descuento</p>
              <p className="text-2xl font-bold text-[#0E7490] tracking-wider">
                {discountCode}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleCopyCode}
                className="w-full bg-[#0E7490] hover:bg-[#0E7490]/90 text-white rounded-sm"
              >
                Copiar Código
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full japanese-border rounded-sm hover:bg-gray-50"
              >
                Continuar Comprando
              </Button>
            </div>

            {/* Fine Print */}
            <p className="text-xs text-gray-500 mt-4">
              * Válido solo para nuevos clientes. No acumulable con otras ofertas.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}