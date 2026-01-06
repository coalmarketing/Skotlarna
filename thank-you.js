document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.getElementById('closeThankYouBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      window.location.href = '/#onas';
    });
  }
});
