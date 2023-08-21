import by from './lang/by'
import ru from './lang/ru'

function init(selector) {
    const country = ru

    document.addEventListener('input', (event) => {
        if (!event.target.matches(selector)) return
        const maskedValue = country.getMaskedValue(event.target.value)
        event.target.value = maskedValue

        event.target.addEventListener('blur', (event) => {
            if (!country.isComplete(event.target.value)) {
                event.target.value = ''
            }
        }, { once: true })
    })
}

export default { init }