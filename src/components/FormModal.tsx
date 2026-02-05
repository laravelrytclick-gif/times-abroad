'use client'

import React from 'react'
import { useFormModal } from '@/context/FormModalContext'
import { X, Send, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const FormModal: React.FC = () => {
  const { isOpen, closeModal, formData, updateFormData, resetForm } = useFormModal()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Save to database via API
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit enquiry')
      }

      setSubmitStatus('success')
      setTimeout(() => {
        handleClose()
      }, 2500)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closeModal()
    setTimeout(() => {
      resetForm()
      setSubmitStatus('idle')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl border border-white/20 w-full max-w-xl max-h-[90vh] overflow-hidden my-auto"
          >
            <div className="relative p-4 sm:p-6 bg-linear-to-br from-blue-600 to-indigo-700 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Get in Touch</h2>
                  <p className="text-blue-100 mt-1 text-xs sm:text-sm opacity-90">
                    We’d love to help you plan your future.
                  </p>
                </div>
                <button onClick={handleClose} className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  label="Full Name"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(v) => updateFormData({ name: v })}
                />
                <FormField
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  placeholder="Enter contact number"
                  value={formData.phone}
                  onChange={(v) => updateFormData({ phone: v })}
                />
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(v) => updateFormData({ email: v })}
                />
                <FormField
                  label="City"
                  id="city"
                  type="text"
                  placeholder="Enter your location"
                  value={formData.city}
                  onChange={(v) => updateFormData({ city: v })}
                />
              </div>

              {/* New Field: Interest Dropdown */}
              <FormField
                label="Interested In"
                id="interest"
                type="select"
                value={formData.interest || ""}
                onChange={(v) => updateFormData({ interest: v })}
                options={[
                  { label: "Select an option", value: "" },
                  { label: "Study Abroad", value: "study-abroad" },
                  { label: "MBBS Abroad", value: "mbbs-abroad" },
                ]}
              />

              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 p-3 sm:p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs sm:text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Sent successfully!
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 p-3 sm:p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs sm:text-sm font-medium"
                  >
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Failed to send. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button type="button" onClick={handleClose} className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 text-slate-500 font-semibold hover:bg-slate-50 rounded-2xl transition-all text-sm sm:text-base">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <span className={`flex items-center justify-center gap-1.5 sm:gap-2 transition-transform ${isSubmitting ? 'translate-y-10' : 'translate-y-0'}`}>
                    Submit Request <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

interface FormFieldProps {
  label: string;
  id: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type, placeholder, value, onChange, options }) => (
  <div className="space-y-1 sm:space-y-1.5 flex-1">
    <label htmlFor={id} className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <div className="relative">
      {type === 'select' ? (
        <>
          <select
            id={id}
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 text-xs sm:text-sm appearance-none"
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </>
      ) : (
        <input
          id={id}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm"
        />
      )}
    </div>
  </div>
)