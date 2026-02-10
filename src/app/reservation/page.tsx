'use client'

import { useEffect } from 'react'
import Footer from '@/components/Footer'
import { Section, Container } from '@/components'
import { PLANITY_KEY } from '@/lib/constants'

export default function ReservationPage() {
  useEffect(() => {
    // Initialiser le widget Planity
    const container = document.getElementById('planity-widget-container')

    if (container && typeof window !== 'undefined') {
      // @ts-expect-error - Planity widget API
      window.planity = {
        key: PLANITY_KEY,
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
        #planity-widget-container
          label[class*='radio_picture-module_radioPicture']:has(input:checked),
        #planity-widget-container
          label[class*='radio_picture-module_radioPicture']:has(input[checked]),
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
        #planity-widget-container
          label[aria-checked='true']
          span[class*='radio_picture-module_input'],
        #planity-widget-container
          label[class*='selected']
          span[class*='radio_picture-module_input'],
        #planity-widget-container
          label:has(input:checked)
          span[class*='radio_picture-module_input'],
        #planity-widget-container
          label:has(input[checked])
          span[class*='radio_picture-module_input'],
        #planity-widget-container
          label[class*='radio_picture']:has(input:checked)
          span[class*='radio_picture-module_input'],
        #planity-widget-container
          .planity_ui_action_worker-name:has(input:checked)
          span[class*='radio_picture-module_input'],
        #planity-widget-container
          .planity_ui_action_worker:has(input:checked)
          span[class*='radio_picture-module_input'] {
          background-color: #af9778 !important;
          background: #af9778 !important;
          border-color: #af9778 !important;
          box-shadow:
            0 0 0 2px #07181e,
            0 0 0 4px #af9778 !important;
        }

        /* ── Inner span (dot) when selected ── */
        #planity-widget-container
          label[aria-checked='true']
          span[class*='radio_picture-module_input']
          span,
        #planity-widget-container
          label[class*='selected']
          span[class*='radio_picture-module_input']
          span,
        #planity-widget-container
          label:has(input:checked)
          span[class*='radio_picture-module_input']
          span,
        #planity-widget-container
          .planity_ui_action_worker-name:has(input:checked)
          span[class*='radio_picture-module_input']
          span {
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

        /* ── Hour availability slots (AVAILABLE ONLY) ── */
        .planity_appointment_days_slider_hour_avaibility:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']),
        .planity_appointment_days_slider_hour_availability:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']),
        #planity-widget-container
          button[id*='availabilities']:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']),
        #planity-widget-container
          button[class*='page-module_item']:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']),
        #planity-widget-container
          [class*='appointment_days']
          button:not(:disabled):not([disabled]):not([aria-disabled='true']):not([class*='isStale']),
        #planity-widget-container
          [class*='days_slider']
          button:not(:disabled):not([disabled]):not([aria-disabled='true']):not([class*='isStale']),
        #planity-widget-container
          [class*='hour']
          button:not(:disabled):not([disabled]):not([aria-disabled='true']):not(
            [class*='isStale']
          ) {
          background-color: #af9778 !important;
          background: #af9778 !important;
          border: 2px solid #af9778 !important;
          color: #07181e !important;
          border-radius: 4px !important;
          transition: all 0.3s ease !important;
          font-weight: 600 !important;
        }
        .planity_appointment_days_slider_hour_avaibility:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']):hover,
        .planity_appointment_days_slider_hour_availability:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']):hover,
        #planity-widget-container
          button[id*='availabilities']:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']):hover,
        #planity-widget-container
          button[class*='page-module_item']:not(:disabled):not([disabled]):not(
            [aria-disabled='true']
          ):not([class*='isStale']):hover,
        #planity-widget-container
          [class*='appointment_days']
          button:not(:disabled):not([disabled]):not([aria-disabled='true']):not(
            [class*='isStale']
          ):hover,
        #planity-widget-container
          [class*='days_slider']
          button:not(:disabled):not([disabled]):not([aria-disabled='true']):not(
            [class*='isStale']
          ):hover,
        #planity-widget-container
          [class*='hour']
          button:not(:disabled):not([disabled]):not([aria-disabled='true']):not(
            [class*='isStale']
          ):hover {
          background-color: #c9ad8c !important;
          background: #c9ad8c !important;
          color: #07181e !important;
          border-color: #c9ad8c !important;
          box-shadow: 0 4px 12px rgba(175, 151, 120, 0.3) !important;
          transform: translateY(-2px) !important;
        }

        /* ── Unavailable/disabled time slots ── */
        .planity_appointment_days_slider_hour_avaibility:disabled,
        .planity_appointment_days_slider_hour_availability:disabled,
        #planity-widget-container button[id*='availabilities']:disabled,
        #planity-widget-container button[class*='page-module_item']:disabled,
        #planity-widget-container button[id*='availabilities'][disabled],
        #planity-widget-container button[class*='page-module_item'][disabled],
        #planity-widget-container button[id*='availabilities'][aria-disabled='true'],
        #planity-widget-container button[class*='page-module_item'][aria-disabled='true'],
        #planity-widget-container button[class*='page-module_item'][class*='isStale'],
        #planity-widget-container .page-module_item-80\+np.page-module_isStale-yZzRz,
        #planity-widget-container [class*='page-module_item'][class*='page-module_isStale'] {
          background-color: #07181e !important;
          background: #07181e !important;
          border: 2px solid rgba(175, 151, 120, 0.3) !important;
          color: rgba(244, 241, 236, 0.4) !important;
          text-decoration-line: line-through !important;
          cursor: not-allowed !important;
          opacity: 0.5 !important;
        }
        .planity_appointment_days_slider_hour_avaibility:disabled:hover,
        .planity_appointment_days_slider_hour_availability:disabled:hover,
        #planity-widget-container button[id*='availabilities']:disabled:hover,
        #planity-widget-container button[class*='page-module_item']:disabled:hover,
        #planity-widget-container button[class*='page-module_item'][class*='isStale']:hover {
          background-color: #07181e !important;
          background: #07181e !important;
          transform: none !important;
          box-shadow: none !important;
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

        /* ── Business popup info text (lighter) ── */
        #planity-widget-container [class*='business_popup-module_message'],
        #planity-widget-container p[class*='business_popup-module_message'],
        [class*='business_popup-module_message'],
        p[class*='business_popup-module_message'],
        p.business_popup-module_message-njVs4 {
          color: rgba(244, 241, 236, 0.6) !important;
          font-weight: 300 !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }

        /* ── Business popup container ── */
        [class*='business_popup-module_businessPopup'],
        div.business_popup-module_businessPopup-sxgz3 {
          background-color: #07181e !important;
          background: #07181e !important;
          color: #f4f1ec !important;
          border: 1px solid rgba(175, 151, 120, 0.3) !important;
          border-radius: 12px !important;
        }

        /* ── Business popup title ── */
        [class*='business_popup-module_title'],
        p.business_popup-module_title-s8L8E {
          color: #af9778 !important;
          font-family: 'Playfair Display', serif !important;
          font-weight: 600 !important;
        }

        /* ── Identification / Authentication section ── */
        [class*='appointment_user-module'],
        [class*='signed_out-module'],
        [class*='authentication-module'],
        [class*='booking_auth-module'],
        [class*='authentication-module_form'],
        [class*='authentication-module_fields'],
        .authentication-module_form-Efik3,
        .authentication-module_fields-OEmif {
          background-color: #07181e !important;
          background: #07181e !important;
          color: #f4f1ec !important;
        }

        /* ── Step title (3. Identification) ── */
        [class*='title-module_title'] {
          color: #f4f1ec !important;
        }
        [class*='title-module_index'] {
          color: #af9778 !important;
        }

        /* ── Auth headings ── */
        [class*='booking_auth-module_title'],
        h1[class*='booking_auth-module_title'],
        h2[class*='booking_auth-module_title'] {
          color: #af9778 !important;
          font-family: 'Playfair Display', serif !important;
        }

        /* ── "ou" separator ── */
        [class*='booking_auth-module_or'] {
          color: rgba(244, 241, 236, 0.5) !important;
        }

        /* ── Auth form inputs ── */
        [class*='booking_auth-module'] input,
        [class*='authentication-module'] input,
        [class*='appointment_user-module'] input,
        [class*='signed_out-module'] input,
        [class*='input-module_container'] input,
        [class*='input_password-module_container'] input,
        .planity-inputs input,
        input[id*='signup-comp'],
        input[id*='input-phone'],
        input[type='email'],
        input[type='tel'] {
          background-color: transparent !important;
          border: none !important;
          color: #f4f1ec !important;
          -webkit-text-fill-color: #f4f1ec !important;
          border-radius: 0 !important;
          padding: 12px 16px !important;
        }
        [class*='booking_auth-module'] input:focus,
        [class*='authentication-module'] input:focus,
        [class*='appointment_user-module'] input:focus,
        [class*='signed_out-module'] input:focus,
        [class*='input-module_container'] input:focus,
        [class*='input_password-module_container'] input:focus,
        .planity-inputs input:focus {
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
          color: #f4f1ec !important;
          -webkit-text-fill-color: #f4f1ec !important;
        }
        [class*='booking_auth-module'] input::placeholder,
        [class*='authentication-module'] input::placeholder,
        [class*='appointment_user-module'] input::placeholder,
        [class*='signed_out-module'] input::placeholder,
        [class*='input-module_container'] input::placeholder,
        [class*='input_password-module_container'] input::placeholder,
        .planity-inputs input::placeholder {
          color: rgba(244, 241, 236, 0.4) !important;
          -webkit-text-fill-color: rgba(244, 241, 236, 0.4) !important;
        }

        /* ── Input containers ── */
        [class*='input-module_container'],
        [class*='input_password-module_container'],
        .planity-inputs,
        div[class*='input-module_container'],
        div[class*='input_password-module_container'],
        .input-module_container-AV5X\+,
        .input_password-module_container-8YR\+4 {
          background-color: rgba(20, 34, 51, 0.8) !important;
          background: rgba(20, 34, 51, 0.8) !important;
          border: none !important;
          border-radius: 6px !important;
        }
        [class*='input-module_container']:focus-within,
        [class*='input_password-module_container']:focus-within,
        .planity-inputs:focus-within {
          border: none !important;
          box-shadow: 0 0 0 2px rgba(175, 151, 120, 0.2) !important;
        }

        /* ── Phone input wrapper (no left border to avoid double) ── */
        [class*='phone-module_phone'],
        [class*='index-module_phoneInput'],
        .phone-module_phone-y\+ob3,
        .index-module_phoneInput-dCIBY {
          background-color: transparent !important;
          border: none !important;
        }

        /* ── Input container inside phone input (no border) ── */
        .phone-module_phone-y\+ob3 [class*='input-module_container'],
        [class*='index-module_phoneInput'] [class*='input-module_container'],
        .index-module_phoneInput-dCIBY .input-module_container-AV5X\+ {
          background-color: rgba(20, 34, 51, 0.8) !important;
          border: none !important;
          border-radius: 0 6px 6px 0 !important;
          margin-left: -4px !important;
        }

        /* ── Input row wrapper for proper connection ── */
        [class*='index-module_row'],
        .index-module_row-isZhf {
          gap: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* ── Form labels ── */
        [class*='booking_auth-module'] label,
        [class*='authentication-module'] label,
        [class*='appointment_user-module'] label,
        [class*='signed_out-module'] label,
        [class*='input-module_label'],
        [class*='phone-module_label'],
        [class*='input_password-module_label'],
        label[id*='label-input'],
        .phone-module_label-hYvpe,
        .input-module_label-\+Ejen,
        .input_password-module_label-wG6\+o,
        span[id*='label-input'] {
          color: #f4f1ec !important;
          font-weight: 500 !important;
          font-size: 14px !important;
        }

        /* ── Checkbox styling ── */
        [class*='booking_auth-module'] input[type='checkbox'],
        [class*='authentication-module'] input[type='checkbox'],
        [class*='appointment_user-module'] input[type='checkbox'],
        [class*='signed_out-module'] input[type='checkbox'],
        [class*='checkbox-module'] input[type='checkbox'],
        input[id*='input-checkbox'],
        input[name='cgu_acceptance'] {
          appearance: none !important;
          -webkit-appearance: none !important;
          width: 0 !important;
          height: 0 !important;
          opacity: 0 !important;
          position: absolute !important;
          pointer-events: none !important;
        }

        /* ── Checkbox span (custom styled) ── */
        [class*='checkbox-module_field'],
        span[id*='input-chckbox'],
        .planity_auth_input_cgu_box,
        .checkbox-module_field-VCOU\+,
        span[class*='checkbox-module_field'] {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 20px !important;
          height: 20px !important;
          min-width: 20px !important;
          min-height: 20px !important;
          flex-shrink: 0 !important;
          border: 2px solid #af9778 !important;
          background-color: transparent !important;
          background: transparent !important;
          border-radius: 4px !important;
          border-color: transparent !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          margin-bottom: 5px !important;
        }
        [class*='checkbox-module'] input:checked ~ [class*='checkbox-module_field'],
        [class*='checkbox-module'] input:checked + [class*='checkbox-module_field'],
        input[id*='input-checkbox']:checked ~ span[id*='input-chckbox'],
        input[id*='input-checkbox']:checked + span[id*='input-chckbox'],
        input:checked + .planity_auth_input_cgu_box,
        input[type='checkbox']:checked + span[class*='checkbox-module_field'],
        input[name='cgu_acceptance']:checked ~ span[class*='checkbox-module_field'],
        input[name='cgu_acceptance']:checked + span {
          background-color: #af9778 !important;
          background: #af9778 !important;
          border-color: #af9778 !important;
        }
        [class*='checkbox-module_field'] svg,
        span[id*='input-chckbox'] svg,
        .planity_auth_input_cgu_box svg,
        [class*='checkbox-module_icon'],
        .checkbox-module_icon-iKaI4 {
          color: #07181e !important;
          stroke: #07181e !important;
          fill: none !important;
          display: block !important;
          // opacity: 0 !important;
          transition: opacity 0.2s ease !important;
        }
        input:checked + span[class*='checkbox-module_field'] svg,
        input:checked + .planity_auth_input_cgu_box svg,
        input:checked ~ span svg,
        input[name='cgu_acceptance']:checked ~ span svg,
        input[name='cgu_acceptance']:checked + span svg {
          opacity: 1 !important;
        }

        /* ── Checkbox label text ── */
        [class*='checkbox-module_label'],
        [class*='checkbox-module_labelInput'],
        .checkbox-module_label-x5X9N,
        .checkbox-module_labelInput-I4-27 {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          color: #f4f1ec !important;
          font-size: 14px !important;
          cursor: pointer !important;
        }

        /* ── Checkbox icon wrapper ── */
        [class*='checkbox-module_iconWrapper'],
        .checkbox-module_iconWrapper-znsk4 {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
        }

        /* ── Phone number dropdown ── */
        [class*='booking_auth-module'] select,
        [class*='authentication-module'] select,
        [class*='appointment_user-module'] select,
        [class*='signed_out-module'] select {
          background-color: rgba(20, 34, 51, 0.8) !important;
          border: 1px solid rgba(175, 151, 120, 0.3) !important;
          color: #f4f1ec !important;
          border-radius: 6px !important;
          padding: 12px 16px !important;
        }

        /* ── Country flag button ── */
        [class*='booking_auth-module'] button[class*='flag'],
        [class*='authentication-module'] button[class*='flag'],
        [class*='appointment_user-module'] button[class*='flag'],
        [class*='signed_out-module'] button[class*='flag'],
        [class*='index-module_country'],
        div[id*='countries-list-btn'],
        div[role='button'][aria-label*='menu'],
        .index-module_country-\+egvp {
          // background-color: rgba(20, 34, 51, 0.8) !important;
          background: transparent !important;
          color: #f4f1ec !important;
          cursor: pointer !important;
        }

        /* ── Countries dropdown list ── */
        div[id*='countries-list'],
        div[class*='index-module_dropdown'],
        div[class*='index-module_dropdown-bottom'],
        ul[class*='index-module_dropdownList'],
        .index-module_dropdown-bottom-j0O6G,
        [class*='index-module_dropdown-bottom'] {
          background-color: #07181e !important;
          color: #af9778 !important;
          border: none !important;
        }

        /* ── Country rows / options ── */
        [class*='index-module_row'],
        [class*='index-module_item'],
        [role='option'],
        .index-module_row-isZhf,
        div[class*='index-module_row'] {
          background-color: #07181e !important;
          color: #af9778 !important;
        }
        [class*='index-module_row']:hover,
        [class*='index-module_item']:hover,
        [role='option']:hover {
          background-color: #142233 !important;
          color: #c9ad8c !important;
        }
        [class*='index-module_row'][aria-selected='true'],
        [class*='index-module_item'].selected,
        [role='option'][aria-selected='true'],
        div[class*='index-module_row'][aria-selected='true'] {
          background-color: #af9778 !important;
          color: #07181e !important;
        }

        /* ── Dropdown text/label ── */
        div[id*='countries-list'] span,
        div[class*='index-module_dropdown'] span,
        [class*='index-module_dropdown'] p,
        [class*='index-module_dropdown'] div {
          color: #af9778 !important;
        }
        div[id*='countries-list'] [aria-selected='true'] span,
        div[class*='index-module_dropdown'] [aria-selected='true'] span {
          color: #07181e !important;
        }

        /* ── Password visibility icon ── */
        [class*='input_password-module_icon'],
        .input_password-module_icon-izQxe {
          cursor: pointer !important;
        }
        [class*='input_password-module_icon'] svg,
        .input_password-module_icon-izQxe svg {
          color: #af9778 !important;
        }
        [class*='input_password-module_icon'] svg path,
        .input_password-module_icon-izQxe svg path {
          stroke: #af9778 !important;
        }

        /* ── CGU and privacy policy links ── */
        [class*='inline_link-module_inlineLink'],
        a[class*='inline_link-module'],
        [class*='authentication-module_recaptchaLink'],
        a[id*='signup-comp__inline-link'],
        .inline_link-module_inlineLink-Ex2nc,
        .authentication-module_recaptchaLink-dNHZJ {
          color: #af9778 !important;
          text-decoration: underline !important;
          transition: all 0.3s ease !important;
        }
        [class*='inline_link-module_inlineLink']:hover,
        a[class*='inline_link-module']:hover,
        [class*='authentication-module_recaptchaLink']:hover,
        a[id*='signup-comp__inline-link']:hover,
        .inline_link-module_inlineLink-Ex2nc:hover,
        .authentication-module_recaptchaLink-dNHZJ:hover {
          color: #c9ad8c !important;
        }

        /* ── reCAPTCHA text ── */
        [class*='authentication-module_recaptcha'],
        [class*='authentication-module_recaptcha'] span,
        .authentication-module_recaptcha-EapBM,
        .authentication-module_recaptcha-EapBM span {
          color: rgba(244, 241, 236, 0.6) !important;
          font-size: 12px !important;
          line-height: 1.5 !important;
        }

        /* ── Primary auth button (Se connecter / Créer mon compte) ── */
        [class*='booking_auth-module'] button[class*='button-module_primary'],
        [class*='authentication-module'] button[class*='button-module_primary'],
        button[id*='signup-comp__submit'],
        .authentication-module_submit-QX3Sl {
          background-color: #af9778 !important;
          background: #af9778 !important;
          color: #07181e !important;
          border: 2px solid #af9778 !important;
          border-radius: 4px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          transition: all 0.5s ease !important;
          padding: 14px 28px !important;
        }
        [class*='booking_auth-module'] button[class*='button-module_primary']:hover,
        [class*='authentication-module'] button[class*='button-module_primary']:hover,
        button[id*='signup-comp__submit']:hover {
          background-color: #c9ad8c !important;
          background: #c9ad8c !important;
          box-shadow: 0 0 30px rgba(175, 151, 120, 0.4) !important;
          transform: scale(1.02) !important;
        }

        /* ── Tertiary auth button (Créer mon compte) ── */
        [class*='booking_auth-module'] button[class*='button-module_tertiary'],
        [class*='authentication-module'] button[class*='button-module_tertiary'] {
          background-color: transparent !important;
          background: transparent !important;
          color: #af9778 !important;
          border: 2px solid #af9778 !important;
          border-radius: 4px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          transition: all 0.5s ease !important;
        }
        [class*='booking_auth-module'] button[class*='button-module_tertiary']:hover,
        [class*='authentication-module'] button[class*='button-module_tertiary']:hover {
          background-color: #af9778 !important;
          background: #af9778 !important;
          color: #07181e !important;
          box-shadow: 0 0 30px rgba(175, 151, 120, 0.4) !important;
          transform: scale(1.02) !important;
        }

        /* ── Auth links ── */
        [class*='booking_auth-module_linksButton'] a,
        [class*='booking_auth-module'] a {
          color: #af9778 !important;
        }
        [class*='booking_auth-module_linksButton'] a:hover,
        [class*='booking_auth-module'] a:hover {
          color: #f4f1ec !important;
        }

        /* ── Authentication form extra container ── */
        [class*='authentication-module_extra'],
        .authentication-module_extra-b-YEj {
          background-color: transparent !important;
          margin: 16px 0 !important;
        }

        /* ── Phone/Email/Password input wrappers ── */
        [class*='phone-module_phone'],
        [class*='input-module_input'],
        [class*='input_password-module_password'],
        .phone-module_phone-y\+ob3,
        .input-module_input-MAJEK,
        .input_password-module_password-k-FP7 {
          background-color: transparent !important;
          margin-bottom: 16px !important;
        }

        /* ── Icon wrapper for chevrons ── */
        [class*='icon-module_icon']:not([class*='input_password-module_icon']) {
          color: rgba(244, 241, 236, 0.6) !important;
        }

        /* ── Checkbox wrapper ── */
        [class*='checkbox-module_checkbox'],
        [class*='checkbox-module_iconWrapper'],
        .checkbox-module_checkbox--\+OVx,
        .checkbox-module_iconWrapper-znsk4 {
          background-color: transparent !important;
        }

        /* ── Flag icon module ── */
        [class*='flag-module_icon'],
        .flag-module_icon-bLHC6 {
          display: block !important;
        }
      `}</style>

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
