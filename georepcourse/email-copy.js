(function () {
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.setAttribute('role', 'status');
    document.body.appendChild(tooltip);
    let hideTimer;

    document.querySelectorAll('.email-link').forEach(function (button) {
        button.addEventListener('click', async function () {
            clearTimeout(hideTimer);
            tooltip.textContent = '';
            try {
                await navigator.clipboard.writeText(button.dataset.email);
                tooltip.textContent = 'Copied!';
            } catch {
                tooltip.textContent = 'Could not copy email';
            }
            const bounds = button.getBoundingClientRect();
            tooltip.style.left = Math.max(8, Math.min(bounds.left, window.innerWidth - tooltip.offsetWidth - 8)) + 'px';
            tooltip.style.top = Math.max(8, bounds.top - 30) + 'px';
            tooltip.classList.add('show');
            hideTimer = setTimeout(function () {
                tooltip.classList.remove('show');
                tooltip.textContent = '';
            }, 1500);
        });
    });
}());
