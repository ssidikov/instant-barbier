'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Section, Container } from '@/components'

export default function ReservationPage() {
  useEffect(() => {
    // Initialiser le widget Planity
    const container = document.getElementById('planity-widget-container')

    if (container && typeof window !== 'undefined') {
      // @ts-expect-error - Planity widget API
      window.planity = {
        key: '-NqgBt5OTqKdrZpwAY1y',
        primaryColor: '#AF9778',
        container: container,
        options: {
          headerWidth: '80px', // Hauteur du header fixe
        },
      }

      // Charger les scripts Planity
      const polyfillsScript = document.createElement('script')
      polyfillsScript.src =
        'https://d2skjte8udjqxw.cloudfront.net/widget/production/2/polyfills.latest.js'
      polyfillsScript.async = true
      document.body.appendChild(polyfillsScript)

      const appScript = document.createElement('script')
      appScript.src = 'https://d2skjte8udjqxw.cloudfront.net/widget/production/2/app.latest.js'
      appScript.async = true
      document.body.appendChild(appScript)

      // Cleanup
      return () => {
        if (polyfillsScript.parentNode) {
          polyfillsScript.parentNode.removeChild(polyfillsScript)
        }
        if (appScript.parentNode) {
          appScript.parentNode.removeChild(appScript)
        }
      }
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        /* ═══════════════════════════════════════════════
           Planity Widget – Navy & Gold Theme
           Colors: Navy #07181E | Gold #AF9778 | Cream #f4f1ec
           ═══════════════════════════════════════════════ */

        /* ── Widget container ── */
        #planity-widget-container {
          background-color: #07181e !important;
          color: #f4f1ec !important;
          font-family: 'Mulish', system-ui, sans-serif !important;
        }

        /* ── Main background ── */
        .planity_ui_appointment_background {
          background-color: #07181e !important;
          color: #f4f1ec !important;
          font-family: 'Mulish', system-ui, sans-serif !important;
        }

        /* ── All main containers match section background ── */
        #planity-widget-container > *,
        #planity-widget-container [class*='planity_'],
        #planity-widget-container [class*='appointment_'],
        #planity-widget-container main,
        #planity-widget-container [role='main'] {
          background-color: #07181e !important;
        }

        /* ── Service set module cards (category containers) ── */
        [class*='service_set_module_card'],
        [class*='service_set_module'],
        [class*='service_module'],
        [class*='module_card'],
        [class*='planity_'] > div,
        div[class*='_card'],
        div[class*='_container'],
        div[class*='_wrapper'] {
          background-color: #07181e !important;
          border: none !important;
          border-radius: 6px !important;
          margin: 0 !important;
          transition: all 0.3s ease !important;
        }

        [class*='_wrapper'] {
          padding: 20px !important;
        }

        /* ── Service list rows ── */
        .planity_ui_item-list-element {
          background-color: #07181e !important;
          border: 1px solid rgba(175, 151, 120, 0.25) !important;
          border-radius: 6px !important;
          margin-bottom: 8px !important;
          transition: all 0.3s ease !important;
        }
        .planity_ui_item-list-element:hover {
          border-color: #af9778 !important;
          box-shadow: 0 4px 16px rgba(175, 151, 120, 0.15) !important;
        }
        /* Remove ALL inner borders from options */
        .planity_ui_item-list-element *,
        .planity_ui_item-list-element > *,
        .planity_ui_item-list-element div,
        .planity_ui_item-list-element span,
        .planity_ui_item-list-element p,
        * {
          border: none !important;
          border-top: none !important;
          border-bottom: none !important;
          border-left: none !important;
          border-right: none !important;
        }

        /* ── "Choisir" buttons inside list elements ── */
        .planity_ui_item-list-element button,
        .planity_ui_item-list-element button[class*='button'] {
          background-color: transparent !important;
          background: transparent !important;
          border: 2px solid #af9778 !important;
          color: #af9778 !important;
          padding: 12px 24px !important;
          border-radius: 2px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          font-size: 11px !important;
          transition: all 0.5s ease !important;
        }
        .planity_ui_item-list-element button:hover,
        .planity_ui_item-list-element button[class*='button']:hover {
          background-color: #af9778 !important;
          background: #af9778 !important;
          color: #07181e !important;
          box-shadow: 0 0 30px rgba(175, 151, 120, 0.4) !important;
          letter-spacing: 0.25em !important;
          transform: scale(1.02) !important;
        }

        /* ── Service name ── */
        .planity_appointment_service_cell {
          color: #f4f1ec !important;
          font-weight: 600 !important;
        }

        /* ── Service description/details ── */
        [class*='service-module_details'],
        [class*='service_module_details'],
        [class*='service-details'] {
          color: rgba(244, 241, 236, 0.7) !important;
        }

        /* ── Price & duration ── */
        .planity_appointment_service_small-cell {
          color: #af9778 !important;
          font-weight: 500 !important;
        }

        /* ── "Choisir" button ── */
        .planity_appointment_service_button,
        button.planity_appointment_service_button,
        #planity-widget-container button.planity_appointment_service_button,
        #planity-widget-container .planity_appointment_service_button,
        [class*='button-choose'],
        [class*='button_choose'],
        [class*='button-module_button'],
        button[class*='button-module'],
        #planity-widget-container button[id*='button-choose'] {
          background-color: transparent !important;
          background: transparent !important;
          border: 2px solid #af9778 !important;
          color: #af9778 !important;
          padding: 12px 24px !important;
          border-radius: 2px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          font-size: 11px !important;
          transition: all 0.5s ease !important;
          position: relative !important;
          overflow: hidden !important;
        }
        .planity_appointment_service_button:hover,
        button.planity_appointment_service_button:hover,
        #planity-widget-container button.planity_appointment_service_button:hover,
        [class*='button-choose']:hover,
        [class*='button_choose']:hover,
        [class*='button-module_button']:hover,
        button[class*='button-module']:hover,
        #planity-widget-container button[id*='button-choose']:hover {
          background-color: #af9778 !important;
          background: #af9778 !important;
          color: #07181e !important;
          box-shadow: 0 0 30px rgba(175, 151, 120, 0.4) !important;
          letter-spacing: 0.25em !important;
          transform: scale(1.02) !important;
        }

        /* ── Cancel button ── */
        .planity_ui_action_button_root,
        .planity_ui_action_button_icon-remove {
          background-color: transparent !important;
          color: #af9778 !important;
          border: 1px solid #af9778 !important;
          border-radius: 4px !important;
          transition: all 0.3s ease !important;
        }
        .planity_ui_action_button_root:hover,
        .planity_ui_action_button_icon-remove:hover {
          background-color: #af9778 !important;
          color: #07181e !important;
        }

        /* ── "Ajouter une prestation" button ── */
        .planity_ui_button_root {
          background-color: transparent !important;
          border: 1px solid #af9778 !important;
          color: #af9778 !important;
          border-radius: 4px !important;
          font-weight: 500 !important;
          transition: all 0.3s ease !important;
        }
        .planity_ui_button_root:hover {
          background-color: #af9778 !important;
          color: #07181e !important;
        }

        /* ── "Voir les autres prestations" link ── */
        .planity_ui_showMoreservices {
          background-color: #07181e !important;
          color: #af9778 !important;
          padding: 12px 16px !important;
          border-radius: 6px !important;
          transition: all 0.3s ease !important;
        }
        .planity_ui_showMoreservices:hover {
          color: #f4f1ec !important;
          border-color: #af9778 !important;
        }

        /* ── "Plus de détails" toggle buttons ── */
        [class*='service-module_toggle'],
        [class*='service_module_toggle'],
        [class*='toggle-'],
        button[class*='toggle'] {
          background-color: #07181e !important;
          color: #af9778 !important;
          border: none !important;
        }
        [class*='service-module_toggle']:hover,
        [class*='service_module_toggle']:hover,
        [class*='toggle-']:hover,
        button[class*='toggle']:hover {
          color: #f4f1ec !important;
        }

        /* ── "Choisir avec qui" menu ── */
        .planity_ui_action_action_choose-with,
        #planity-widget-container [class*='choose-with'],
        #planity-widget-container [class*='choose_with'],
        #planity-widget-container [class*='booking_service-module_bottom'],
        #planity-widget-container [class*='booking_service-module'],
        #planity-widget-container div[class*='action_choose'],
        #planity-widget-container div[class*='bottom'] {
          background-color: #07181e !important;
          background: #07181e !important;
          border: none !important;
          color: #f4f1ec !important;
          border-radius: 6px !important;
          padding: 24px !important;
          margin-bottom: 24px !important;
          overflow: visible !important;
        }

        /* ── Worker profiles container ── */
        #planity-widget-container [class*='booking_service-module_profiles'],
        .booking_service-module_bookingService-7YAW3 .booking_service-module_profiles-4lpkR,
        #planity-widget-container div[class*='booking_service-module_profiles'][style] {
          overflow: visible !important;
          max-width: 100% !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: 1fr 1fr 1fr !important;
          grid-auto-flow: dense !important;
          gap: 12px !important;
        }

        /* ── Force 3 columns even in Planity's media queries ── */
        @media (min-width: 1080px) {
          #planity-widget-container [class*='booking_service-module_profiles'],
          .booking_service-module_bookingService-7YAW3 .booking_service-module_profiles-4lpkR,
          #planity-widget-container div[class*='booking_service-module_profiles'][style] {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }

        /* ── Maximize button container ── */
        #planity-widget-container [class*='booking_service-module_maximize'],
        #planity-widget-container div[class*='booking_service-module_maximize'][style] {
          grid-column: 1 / -1 !important;
          width: 100% !important;
          overflow: visible !important;
          display: flex !important;
          justify-content: flex-start !important;
          margin-top: 12px !important;
        }

        #planity-widget-container [class*='booking_service-module_maximize'] button {
          width: auto !important;
          min-width: max-content !important;
        }

        /* ── Worker list items with photos ── */
        .planity_ui_action_worker,
        .planity_ui_action_worker-name,
        #planity-widget-container label[class*='worker'],
        #planity-widget-container label[class*='radio_picture-module_radioPicture'],
        #planity-widget-container [class*='action_worker'] {
          background-color: rgba(20, 34, 51, 0.5) !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 12px !important;
          transition: all 0.3s ease !important;
          padding: 16px 20px !important;
          padding-right: 56px !important;
          margin: 12px 0 !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          gap: 20px !important;
          position: relative !important;
        }
        .planity_ui_action_worker:hover,
        .planity_ui_action_worker-name:hover,
        #planity-widget-container label[class*='worker']:hover,
        #planity-widget-container label[class*='radio_picture-module_radioPicture']:hover {
          border-color: #af9778 !important;
          background-color: rgba(175, 151, 120, 0.1) !important;
          box-shadow: 0 4px 12px rgba(175, 151, 120, 0.2) !important;
          transform: translateY(-2px) !important;
        }

        /* ── Worker selection border element ── */
        #planity-widget-container [class*='radio_picture-module_border'] {
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 12px !important;
        }
        #planity-widget-container label:hover [class*='radio_picture-module_border'] {
          border-color: #af9778 !important;
        }
        /* Selected border element */
        #planity-widget-container label:has(input:checked) [class*='radio_picture-module_border'],
        #planity-widget-container label:has(input[checked]) [class*='radio_picture-module_border'] {
          border-color: #af9778 !important;
          border-width: 2px !important;
          border-style: solid !important;
        }

        /* ── Selected worker state ── */
        .planity_ui_action_worker:has(input:checked),
        .planity_ui_action_worker-name:has(input:checked),
        #planity-widget-container label[class*='worker']:has(input:checked),
        #planity-widget-container label[class*='radio_picture-module_radioPicture']:has(input:checked),
        #planity-widget-container label[class*='radio_picture-module_radioPicture']:has(input[checked]),
        #planity-widget-container label.planity_ui_action_worker-name:has(input:checked),
        #planity-widget-container label.planity_ui_action_worker-name:has(input[checked]),
        #planity-widget-container .planity_ui_action_worker-name:has(input:checked),
        #planity-widget-container [class*='worker'][class*='selected'] {
          border: 2px solid #af9778 !important;
          border-color: #af9778 !important;
          background-color: rgba(175, 151, 120, 0.2) !important;
          box-shadow: 0 0 20px rgba(175, 151, 120, 0.3) !important;
        }

        /* ── Worker selection radio buttons ── */
        #planity-widget-container input[type='radio'],
        #planity-widget-container input[class*='radio_picture-module_input'],
        #planity-widget-container [class*='radio'] input[type='radio'],
        #planity-widget-container label[class*='radio_picture'] input[type='radio'],
        #planity-widget-container label[class*='radio_picture'] input,
        #planity-widget-container [class*='worker'] input[type='radio'] {
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          width: 24px !important;
          height: 24px !important;
          min-width: 24px !important;
          min-height: 24px !important;
          border: 3px solid #af9778 !important;
          border-color: #af9778 !important;
          border-radius: 50% !important;
          cursor: pointer !important;
          position: absolute !important;
          right: 16px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background-color: #07181e !important;
          background: #07181e !important;
          flex-shrink: 0 !important;
          margin: 0 !important;
          outline: none !important;
          z-index: 10 !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
        #planity-widget-container input[type='radio']:checked,
        #planity-widget-container input[class*='radio_picture-module_input']:checked,
        #planity-widget-container label[class*='radio_picture'] input:checked {
          background-color: #af9778 !important;
          background: #af9778 !important;
          border-color: #af9778 !important;
          box-shadow:
            0 0 0 2px #07181e,
            0 0 0 4px #af9778 !important;
        }
        #planity-widget-container input[type='radio']:checked::after {
          content: '' !important;
          display: block !important;
          width: 12px !important;
          height: 12px !important;
          border-radius: 50% !important;
          background: #07181e !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }

        /* ── Radio span elements (actual radio button visual) ── */
        #planity-widget-container span[class*='radio_picture-module_input'] {
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          width: 24px !important;
          height: 24px !important;
          min-width: 24px !important;
          min-height: 24px !important;
          border: 3px solid #af9778 !important;
          border-color: #af9778 !important;
          border-radius: 50% !important;
          cursor: pointer !important;
          position: absolute !important;
          right: 16px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background-color: #07181e !important;
          background: #07181e !important;
          flex-shrink: 0 !important;
          margin: 0 !important;
          outline: none !important;
          z-index: 10 !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        /* ── Radio span when selected (golden fill) ── */
        #planity-widget-container label[aria-checked='true'] span[class*='radio_picture-module_input'],
        #planity-widget-container label[class*='selected'] span[class*='radio_picture-module_input'],
        #planity-widget-container label:has(input:checked) span[class*='radio_picture-module_input'],
        #planity-widget-container label:has(input[checked]) span[class*='radio_picture-module_input'],
        #planity-widget-container label[class*='radio_picture']:has(input:checked) span[class*='radio_picture-module_input'],
        #planity-widget-container .planity_ui_action_worker-name:has(input:checked) span[class*='radio_picture-module_input'],
        #planity-widget-container .planity_ui_action_worker:has(input:checked) span[class*='radio_picture-module_input'] {
          background-color: #af9778 !important;
          background: #af9778 !important;
          border-color: #af9778 !important;
          box-shadow:
            0 0 0 2px #07181e,
            0 0 0 4px #af9778 !important;
        }

        /* ── Inner span (dot) when selected ── */
        #planity-widget-container label[aria-checked='true'] span[class*='radio_picture-module_input'] span,
        #planity-widget-container label[class*='selected'] span[class*='radio_picture-module_input'] span,
        #planity-widget-container label:has(input:checked) span[class*='radio_picture-module_input'] span,
        #planity-widget-container .planity_ui_action_worker-name:has(input:checked) span[class*='radio_picture-module_input'] span {
          display: block !important;
          width: 12px !important;
          height: 12px !important;
          border-radius: 50% !important;
          background: #07181e !important;
        }

        /* ── Worker avatar spacing ── */
        #planity-widget-container [class*='radio_picture-module_image'],
        #planity-widget-container [class*='avatar-module_avatar'] {
          margin-right: 16px !important;
        }

        /* ── Worker names ── */
        .planity_ui_action_worker-name,
        #planity-widget-container [class*='worker-name'],
        #planity-widget-container [class*='worker_name'],
        #planity-widget-container [class*='radio_picture-module_label'],
        #planity-widget-container label[class*='radio_picture'] span {
          color: #f4f1ec !important;
          font-weight: 600 !important;
          font-size: 16px !important;
        }

        /* ── Day steps (date picker) ── */
        .planity_appointment_steps_step {
          background-color: #07181e !important;
          border: none !important;
          color: #f4f1ec !important;
          border-radius: 4px !important;
          transition: all 0.3s ease !important;
        }
        .planity_appointment_steps_step:hover {
          border-color: #af9778 !important;
          background-color: #1a2d3f !important;
        }

        /* ── Hour availability slots ── */
        .planity_appointment_days_slider_hour_avaibility {
          background-color: #07181e !important;
          border: none !important;
          color: #af9778 !important;
          border-radius: 4px !important;
          transition: all 0.3s ease !important;
          font-weight: 500 !important;
        }
        .planity_appointment_days_slider_hour_avaibility:hover {
          background-color: #af9778 !important;
          color: #07181e !important;
          border-color: #af9778 !important;
        }

        /* ── Mon compte links ── */
        .planity_ui_action_cancel-appointment,
        .planity_ui_action_edit-password {
          color: #af9778 !important;
          transition: all 0.3s ease !important;
        }
        .planity_ui_action_cancel-appointment:hover,
        .planity_ui_action_edit-password:hover {
          color: #f4f1ec !important;
        }

        /* ── Selected service summary / Recap section ── */
        [class*='recap'],
        [class*='summary'],
        [class*='selected'],
        [class*='step-'],
        [class*='prestation'],
        [class*='selection'],
        [class*='booking_service'],
        [class*='bookingService'],
        .planity_ui_appointment_recap,
        .planity_ui_appointment_summary,
        div[class*='booking_service-module'],
        div[class*='booking-service'] {
          background-color: #07181e !important;
          background: #07181e !important;
          color: #f4f1ec !important;
        }

        /* ── Force all white cards to navy ── */
        #planity-widget-container [class*='card'],
        #planity-widget-container [class*='panel'],
        #planity-widget-container [class*='box'],
        #planity-widget-container div[style*='rgb(255, 255, 255)'],
        #planity-widget-container div[style*='#FFFFFF'],
        #planity-widget-container div[style*='#ffffff'] {
          background-color: #07181e !important;
          background: #07181e !important;
        }

        /* ── SUPPRIMER and similar action buttons ── */
        #planity-widget-container button[class*='delete'],
        #planity-widget-container button[class*='remove'],
        #planity-widget-container button[class*='supprimer'],
        #planity-widget-container [class*='button'][class*='delete'],
        #planity-widget-container [class*='button'][class*='remove'] {
          background-color: transparent !important;
          background: transparent !important;
          border: 2px solid #af9778 !important;
          color: #af9778 !important;
          padding: 12px 24px !important;
          border-radius: 2px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          font-size: 11px !important;
          transition: all 0.5s ease !important;
        }
        #planity-widget-container button[class*='delete']:hover,
        #planity-widget-container button[class*='remove']:hover,
        #planity-widget-container button[class*='supprimer']:hover,
        #planity-widget-container [class*='button'][class*='delete']:hover,
        #planity-widget-container [class*='button'][class*='remove']:hover {
          background-color: #af9778 !important;
          background: #af9778 !important;
          color: #07181e !important;
          box-shadow: 0 0 30px rgba(175, 151, 120, 0.4) !important;
          letter-spacing: 0.25em !important;
          transform: scale(1.02) !important;
        }

        /* ── AGRANDIR LES PHOTOS and other secondary buttons ── */
        #planity-widget-container button[class*='photo'],
        #planity-widget-container button[class*='image'],
        #planity-widget-container button[class*='agrandir'],
        #planity-widget-container button[class*='maximize'],
        #planity-widget-container button[class*='expand'] {
          background-color: transparent !important;
          background: transparent !important;
          border: 2px solid #af9778 !important;
          color: #af9778 !important;
          padding: 12px 24px !important;
          border-radius: 2px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          font-size: 11px !important;
          transition: all 0.5s ease !important;
          white-space: nowrap !important;
          overflow: visible !important;
          width: auto !important;
          max-width: none !important;
        }
        #planity-widget-container button[class*='photo']:hover,
        #planity-widget-container button[class*='image']:hover,
        #planity-widget-container button[class*='agrandir']:hover,
        #planity-widget-container button[class*='maximize']:hover,
        #planity-widget-container button[class*='expand']:hover {
          background-color: #af9778 !important;
          background: #af9778 !important;
          color: #07181e !important;
          box-shadow: 0 0 30px rgba(175, 151, 120, 0.4) !important;
          letter-spacing: 0.25em !important;
          transform: scale(1.02) !important;
        }

        /* ── All other buttons in widget ── */
        #planity-widget-container button:not([class*='button-module']):not([class*='toggle']) {
          background-color: transparent !important;
          background: transparent !important;
          border: 2px solid #af9778 !important;
          color: #af9778 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          transition: all 0.5s ease !important;
        }
        #planity-widget-container
          button:not([class*='button-module']):not([class*='toggle']):hover {
          background-color: #af9778 !important;
          background: #af9778 !important;
          color: #07181e !important;
          letter-spacing: 0.25em !important;
        }

        /* ── Global overrides inside widget ── */
        #planity-widget-container
          div:not([class*='booking_service-module_profiles']):not(
            [class*='booking_service-module_maximize']
          ),
        #planity-widget-container section,
        #planity-widget-container article,
        #planity-widget-container nav,
        #planity-widget-container aside {
          background-color: inherit !important;
        }

        /* ── Force navy background for all white/light backgrounds ── */
        #planity-widget-container div[style*='background'],
        #planity-widget-container div[style*='#fff'],
        #planity-widget-container div[style*='#FFF'],
        #planity-widget-container div[style*='white'],
        #planity-widget-container [style*='background-color: rgb(255, 255, 255)'],
        #planity-widget-container [style*='background: rgb(255, 255, 255)'],
        #planity-widget-container [style*='background: #fff'],
        #planity-widget-container [style*='background-color: #fff'],
        #planity-widget-container [style*='background-color:#fff'],
        #planity-widget-container [style*='background:#fff'],
        #planity-widget-container [style*='background-color: #FFF'],
        #planity-widget-container [style*='background-color:#FFF'],
        #planity-widget-container [style*='background-color: #FFFFFF'],
        #planity-widget-container [style*='background-color:#FFFFFF'] {
          background-color: #07181e !important;
          background: #07181e !important;
        }

        /* ── Aggressive override for all divs ── */
        #planity-widget-container
          div[style]:not([class*='image']):not([class*='photo']):not([class*='avatar']):not(
            [class*='picture']
          ):not([class*='img']):not([class*='radio']):not([class*='worker']):not(
            .planity_ui_item-list-element
          ),
        #planity-widget-container div[class*='booking_service-module'][style],
        #planity-widget-container div[class*='booking_service-module'] {
          background-color: #07181e !important;
          background: #07181e !important;
        }

        /* ── Keep images and image containers visible ── */
        #planity-widget-container [class*='image'],
        #planity-widget-container [class*='photo'],
        #planity-widget-container [class*='avatar'],
        #planity-widget-container [class*='picture'],
        #planity-widget-container [class*='img'],
        #planity-widget-container [class*='radio'],
        #planity-widget-container [class*='radioPicture'],
        #planity-widget-container [class*='radio_picture'],
        #planity-widget-container [class*='image-module'],
        #planity-widget-container [class*='avatar-module'],
        #planity-widget-container [class*='radio_picture-module'],
        #planity-widget-container img,
        label[class*='radio_picture'],
        div[class*='avatar-module'],
        div[class*='radio_picture-module'] {
          background-color: transparent !important;
          background: none !important;
        }

        /* ── Image containers must show images ── */
        #planity-widget-container img {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* ── Keep service option borders visible ── */
        #planity-widget-container .planity_ui_item-list-element {
          background-color: #07181e !important;
          border: 1px solid rgba(175, 151, 120, 0.25) !important;
        }

        #planity-widget-container h1,
        #planity-widget-container h2,
        #planity-widget-container h3,
        #planity-widget-container h4 {
          color: #af9778 !important;
          font-family: 'Playfair Display', serif !important;
        }

        #planity-widget-container p,
        #planity-widget-container label {
          color: #f4f1ec !important;
        }

        #planity-widget-container span {
          color: inherit !important;
        }

        #planity-widget-container a {
          color: #af9778 !important;
          transition: all 0.3s ease !important;
        }
        #planity-widget-container a:hover {
          color: #f4f1ec !important;
        }

        /* ── Inputs & forms ── */
        #planity-widget-container input,
        #planity-widget-container select,
        #planity-widget-container textarea {
          background-color: #07181e !important;
          border: none !important;
          color: #f4f1ec !important;
          border-radius: 4px !important;
        }
        #planity-widget-container input:focus,
        #planity-widget-container select:focus,
        #planity-widget-container textarea:focus {
          border-color: #af9778 !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(175, 151, 120, 0.2) !important;
        }
        #planity-widget-container input::placeholder {
          color: rgba(244, 241, 236, 0.4) !important;
        }

        /* ── Tab navigation (Prendre un RDV / Mon Compte) ── */
        #planity-widget-container button,
        #planity-widget-container [role='tab'],
        #planity-widget-container [role='button'] {
          transition: all 0.3s ease !important;
        }

        /* ── Scrollbar inside widget ── */
        #planity-widget-container ::-webkit-scrollbar {
          width: 6px;
        }
        #planity-widget-container ::-webkit-scrollbar-track {
          background: #07181e;
        }
        #planity-widget-container ::-webkit-scrollbar-thumb {
          background: #af9778;
          border-radius: 3px;
        }

        /* ── Arrow navigation (< >) in date slider ── */
        #planity-widget-container svg {
          fill: #af9778 !important;
          color: #af9778 !important;
        }
      `}</style>

      <Header />
      <main className='min-h-screen pt-20 grow bg-navy'>
        <Section className='py-12'>
          <Container>
            <div className='text-center mb-12'>
              <h1 className='font-title text-4xl md:text-6xl text-gold mb-6'>
                Prendre rendez-vous
              </h1>
              <p className='font-body text-cream text-lg max-w-2xl mx-auto'>
                Réservez votre créneau en ligne et profitez d&apos;un moment de détente dans notre
                salon. Choisissez votre prestation et votre barbier préféré.
              </p>
            </div>

            {/* Conteneur du widget Planity */}
            <div
              id='planity-widget-container'
              className='w-full rounded-lg shadow-xl overflow-hidden border border-gold/20'
              style={{ minHeight: '600px' }}
            />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
