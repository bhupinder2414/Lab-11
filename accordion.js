'use strict';

class Accordion {
  constructor(header) {
    this.headerEl = header;
    this.buttonEl = header.querySelector('button[aria-expanded]');
    const controlsId = this.buttonEl.getAttribute('aria-controls');
    this.contentEl = document.getElementById(controlsId);
    this.iconEl = this.buttonEl.querySelector('i'); // Icon for toggle
    this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';

    // Event listeners
    this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
    this.buttonEl.addEventListener('keydown', this.onKeydown.bind(this));

    // Initialize state
    this.updateState();
  }

  onButtonClick() {
    this.toggle(!this.open);
  }

  onKeydown(event) {
    const validKeys = ['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!validKeys.includes(event.key)) return;

    event.preventDefault(); // Prevent default browser behavior for handled keys
    const headers = Array.from(document.querySelectorAll('.accordion h3 button'));
    const currentIndex = headers.indexOf(this.buttonEl);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        newIndex = (currentIndex + 1) % headers.length;
        break;
      case 'ArrowUp':
        newIndex = (currentIndex - 1 + headers.length) % headers.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = headers.length - 1;
        break;
      case 'Enter':
      case ' ':
        this.onButtonClick();
        return; // No further navigation needed
    }

    headers[newIndex].focus();
  }

  toggle(open) {
    if (open === this.open) return;

    this.open = open;
    this.updateState();
  }

  updateState() {
    this.buttonEl.setAttribute('aria-expanded', `${this.open}`);
    this.contentEl.setAttribute('aria-hidden', !this.open);
    if (this.open) {
      this.contentEl.removeAttribute('hidden');
      this.iconEl.classList.remove('fa-chevron-down');
      this.iconEl.classList.add('fa-chevron-up');
      this.iconEl.style.transform = 'rotate(180deg)';
    } else {
      this.contentEl.setAttribute('hidden', '');
      this.iconEl.classList.remove('fa-chevron-up');
      this.iconEl.classList.add('fa-chevron-down');
      this.iconEl.style.transform = 'rotate(0deg)';
    }
  }
}

// Initialize all accordions
document.querySelectorAll('.accordion h3').forEach((header) => {
  new Accordion(header);
});
