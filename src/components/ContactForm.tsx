'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Input sanitization helper
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim()
  }

  // Form validation
  const validateForm = (): boolean => {
    const errors = {
      name: '',
      phone: '',
      email: '',
      message: '',
    }
    let isValid = true

    // Name validation: letters, spaces, hyphens only, 2-50 characters
    const nameRegex = /^[a-zA-ZÀ-ſ\s'-]{2,50}$/
    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis'
      isValid = false
    } else if (!nameRegex.test(formData.name)) {
      errors.name = 'Nom invalide (2-50 caractères, lettres uniquement)'
      isValid = false
    }

    // Phone validation: French phone format
    const phoneRegex = /^(?:(?:\+|00)33[\s.-]?(?:\(0\)[\s.-]?)?|0)[1-9](?:[\s.-]?\d{2}){4}$/
    if (!formData.phone.trim()) {
      errors.phone = 'Le téléphone est requis'
      isValid = false
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Numéro de téléphone invalide'
      isValid = false
    }

    // Email validation: RFC 5322 compliant
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!formData.email.trim()) {
      errors.email = "L'email est requis"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Adresse email invalide'
      isValid = false
    }

    // Message validation: 10-1000 characters
    if (!formData.message.trim()) {
      errors.message = 'Le message est requis'
      isValid = false
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères'
      isValid = false
    } else if (formData.message.trim().length > 1000) {
      errors.message = 'Le message ne peut pas dépasser 1000 caractères'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Sanitize all inputs before submission
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        phone: sanitizeInput(formData.phone),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
      }

      // Handle form submission
      console.log('Form submitted:', sanitizedData)

      // Reset form on success
      setFormData({ name: '', phone: '', email: '', message: '' })
      setFormErrors({ name: '', phone: '', email: '', message: '' })

      // Show success message (you can implement a toast notification here)
      alert('Message envoyé avec succès !')
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid sm:grid-cols-2 gap-6'>
        <div>
          <input
            type='text'
            placeholder='Votre nom'
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              if (formErrors.name) setFormErrors({ ...formErrors, name: '' })
            }}
            className={`w-full bg-transparent border ${
              formErrors.name ? 'border-red-500' : 'border-gold/30'
            } text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors duration-300`}
            maxLength={50}
          />
          {formErrors.name && <p className='text-red-400 text-xs mt-2 ml-1'>{formErrors.name}</p>}
        </div>
        <div>
          <input
            type='tel'
            placeholder='Téléphone'
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value })
              if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' })
            }}
            className={`w-full bg-transparent border ${
              formErrors.phone ? 'border-red-500' : 'border-gold/30'
            } text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors duration-300`}
          />
          {formErrors.phone && <p className='text-red-400 text-xs mt-2 ml-1'>{formErrors.phone}</p>}
        </div>
      </div>

      <div>
        <input
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value })
            if (formErrors.email) setFormErrors({ ...formErrors, email: '' })
          }}
          className={`w-full bg-transparent border ${
            formErrors.email ? 'border-red-500' : 'border-gold/30'
          } text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors duration-300`}
        />
        {formErrors.email && <p className='text-red-400 text-xs mt-2 ml-1'>{formErrors.email}</p>}
      </div>

      <div>
        <textarea
          placeholder='Votre message (min. 10 caractères)'
          rows={4}
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value })
            if (formErrors.message) setFormErrors({ ...formErrors, message: '' })
          }}
          className={`w-full bg-transparent border ${
            formErrors.message ? 'border-red-500' : 'border-gold/30'
          } text-cream px-4 py-3 placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors duration-300 resize-none`}
          maxLength={1000}
        />
        <div className='flex justify-between items-start mt-2 ml-1'>
          <p className='text-red-400 text-xs'>{formErrors.message}</p>
          <span className='text-cream/30 text-xs'>{formData.message.length}/1000</span>
        </div>
      </div>

      <div>
        <button
          type='submit'
          disabled={isSubmitting}
          className={`group bg-gold hover:bg-white text-navy font-semibold py-4 px-8 w-full transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}>
          {isSubmitting ? (
            <span className='inline-block w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin' />
          ) : (
            <>
              <span>Envoyer le message</span>
              <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
