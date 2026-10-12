var tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Copied!';
    document.body.appendChild(tooltip);

    document.querySelectorAll('.email-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            navigator.clipboard.writeText(link.getAttribute('data-email')).then(function () {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = (e.clientY - 30) + 'px';
                tooltip.classList.add('show');
                setTimeout(function () { tooltip.classList.remove('show'); }, 1500);
            });
        });
    });
