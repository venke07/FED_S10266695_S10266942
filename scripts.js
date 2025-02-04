document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('click', () => {
            alert(`You clicked on ${section.querySelector('h2').innerText} section`);
        });
    });
});
