import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dog, Cat } from 'lucide-react'

interface PetSelectorProps {
  onSelect?: (petType: 'dog' | 'cat', age: string, breed: string) => void
}

export const PetSelector = ({ onSelect }: PetSelectorProps) => {
  const [petType, setPetType] = useState<'dog' | 'cat' | null>(null)
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')

  const dogBreeds = ['Labrador', 'Golden Retriever', 'German Shepherd', 'Bulldog', 'Poodle', 'Beagle', 'Other']
  const catBreeds = ['Persian', 'Maine Coon', 'Siamese', 'British Shorthair', 'Ragdoll', 'Bengal', 'Other']
  const ageRanges = ['Puppy/Kitten (0-1 year)', 'Adult (1-7 years)', 'Senior (7+ years)']

  const handleBuildBox = () => {
    if (petType && age && breed && onSelect) {
      onSelect(petType, age, breed)
    }
  }

  return (
    <div className="bg-white japanese-border rounded-sm p-8 max-w-2xl mx-auto minimal-shadow">
      <h3 className="text-xl font-medium text-[#111827] mb-6 text-center">
        Build Your Custom Box
      </h3>

      {/* Pet Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#111827] mb-3">
          Select Your Pet
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setPetType('dog')}
            className={`p-6 japanese-border rounded-sm transition-all ${
              petType === 'dog'
                ? 'bg-[#0E7490] text-white border-[#0E7490]'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Dog className="w-8 h-8 mx-auto mb-2" />
            <span className="block text-sm font-medium">Dog</span>
          </button>
          <button
            onClick={() => setPetType('cat')}
            className={`p-6 japanese-border rounded-sm transition-all ${
              petType === 'cat'
                ? 'bg-[#0E7490] text-white border-[#0E7490]'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Cat className="w-8 h-8 mx-auto mb-2" />
            <span className="block text-sm font-medium">Cat</span>
          </button>
        </div>
      </div>

      {/* Age Selection */}
      {petType && (
        <div className="mb-6 animate-fade-in">
          <label className="block text-sm font-medium text-[#111827] mb-3">
            Age Range
          </label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 japanese-border rounded-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
          >
            <option value="">Select age range</option>
            {ageRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Breed Selection */}
      {petType && age && (
        <div className="mb-6 animate-fade-in">
          <label className="block text-sm font-medium text-[#111827] mb-3">
            Breed
          </label>
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full p-3 japanese-border rounded-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
          >
            <option value="">Select breed</option>
            {(petType === 'dog' ? dogBreeds : catBreeds).map((breedOption) => (
              <option key={breedOption} value={breedOption}>
                {breedOption}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Build Box Button */}
      {petType && age && breed && (
        <div className="animate-fade-in">
          <Button
            onClick={handleBuildBox}
            className="w-full bg-[#0E7490] hover:bg-[#0E7490]/90 text-white py-6 text-base font-medium rounded-sm"
          >
            Build Your Box
          </Button>
        </div>
      )}
    </div>
  )
}