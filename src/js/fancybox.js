import { Fancybox } from "@fancyapps/ui";
import ru from "@fancyapps/ui/src/Fancybox/l10n/ru"
import "@fancyapps/ui/dist/fancybox.css";

const init = () => {
  Fancybox.defaults.trapFocus = false
  Fancybox.defaults.autoFocus = false
  Fancybox.defaults.placeFocusBack = false
  Fancybox.defaults.infinite = false
  Fancybox.defaults.Thumbs = {
    autoStart: false,
  }
  Fancybox.defaults.l10n = ru
  Fancybox.defaults.template.spinner = '<div class="progress progress-circle"> </div>'

  const customOptions = {
    dragToClose: false,
    mainClass: 'fancybox-custom-modal',
    groupAttr: 'data-fancybox-modal',
    Thumbs: {
      autoStart: false,
    },
    Carousel: {

    },
    on: {
      done: (fancybox, slide) => {
      }
    }
  }

  Fancybox.bind('[data-fancybox-modal]', customOptions)


  Fancybox.modal = {}
  Fancybox.modal.open = (src, options) => {
    Fancybox.show([{
      src: src,
      ...options
    }], {
      ...customOptions,
      ...options
    })
  }

  window.Fancybox = Fancybox
}

export default { init }