import { useEffect, useState } from 'react'
import './InstallBanner.css'

function InstallBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Muestra el cartel después de 3 segundos
    const showTimer = setTimeout(() => {
      setVisible(true)
    }, 3000)

    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!visible) return

    // Oculta el cartel 5 segundos después de mostrarlo
    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(hideTimer)
  }, [visible])

  if (!visible) return null

  return (
    <div className="install-banner">
      <div className="install-banner-content">
        <span className="install-banner-icon">🌦️</span>

        <div>
          <strong>Che, probá Cielovivo 😎</strong>
          <p>Después no digas que no te avisé.</p>
        </div>
      </div>
    </div>
  )
}

export default InstallBanner