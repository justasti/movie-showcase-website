import { useState, useRef, useEffect } from 'react'
import { StyledDropdown } from './dropdown-menu.styles'

function DropdownMenu({ userPic, theme, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <StyledDropdown theme={theme} ref={menuRef}>
      <div className='menu_toggle' onClick={handleMenuToggle}>
        <img src={userPic} alt='profile picture' />
      </div>
      {isOpen && (
        <div className='menu_items' onClick={handleMenuToggle}>
          <ul>{children}</ul>
        </div>
      )}
    </StyledDropdown>
  )
}

export default DropdownMenu
