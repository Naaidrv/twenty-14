document.addEventListener('DOMContentLoaded', function() {
  const CORRECT_CODE = '0410';
  
  // DOM Elements
  const openModalBtn = document.getElementById('openModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalBtn = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const codeForm = document.getElementById('codeForm');
  const codeInput = document.getElementById('codeInput');
  const errorMessage = document.getElementById('errorMessage');
  
  // Sound Toggle Elements
  const video = document.getElementById('backgroundVideo');
  const soundToggle = document.getElementById('soundToggle');
  const soundOffIcon = document.getElementById('soundOff');
  const soundOnIcon = document.getElementById('soundOn');
  
  // Sound Toggle Functionality
  soundToggle.addEventListener('click', function() {
    if (video.muted) {
      video.muted = false;
      soundOffIcon.classList.add('hidden');
      soundOnIcon.classList.remove('hidden');
      soundToggle.setAttribute('aria-label', 'Desactivar sonido');
    } else {
      video.muted = true;
      soundOffIcon.classList.remove('hidden');
      soundOnIcon.classList.add('hidden');
      soundToggle.setAttribute('aria-label', 'Activar sonido');
    }
  });

  // Open modal
  openModalBtn.addEventListener('click', function() {
    modalOverlay.classList.add('active');
    codeInput.value = '';
    codeInput.classList.remove('error');
    errorMessage.classList.remove('show');
    setTimeout(() => codeInput.focus(), 100);
  });

  // Close modal functions
  function closeModal() {
    modalOverlay.classList.remove('active');
    codeInput.value = '';
    codeInput.classList.remove('error');
    errorMessage.classList.remove('show');
  }

  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission
  codeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const enteredCode = codeInput.value.trim();
    
    if (enteredCode === CORRECT_CODE) {
      // Correct code - redirect to success page
      window.location.href = 'success.html';
    } else {
      // Wrong code - show error
      codeInput.classList.add('error');
      errorMessage.classList.add('show');
      
      // Shake animation
      const modal = document.querySelector('.modal');
      modal.classList.add('shake');
      setTimeout(() => modal.classList.remove('shake'), 500);
      
      // Clear input and focus
      codeInput.value = '';
      codeInput.focus();
    }
  });

  // Remove error state when typing
  codeInput.addEventListener('input', function() {
    if (codeInput.classList.contains('error')) {
      codeInput.classList.remove('error');
      errorMessage.classList.remove('show');
    }
  });

  // Only allow numbers in input
  codeInput.addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });
});
