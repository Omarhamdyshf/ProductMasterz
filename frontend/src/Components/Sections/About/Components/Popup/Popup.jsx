import useClickOutsideAndEscape from '@/Hooks/useClickOutsideAndEscape';

function Popup({ show, closePopup, infoData }) {

    return (
        <div className={`overlay-module ${show ? 'show' : ''}`}>
           
        </div>
    )
}

export default Popup