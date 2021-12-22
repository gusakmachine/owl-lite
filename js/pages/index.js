document.addEventListener("DOMContentLoaded", function () {
    const owlLite = new OwlLite({
        stage: document.querySelector('.owl-stage'),
        delay: 500,
        duration: 500,
        navigate: document.querySelector('.owl-nav'),
        progress: document.querySelector('.owl-progress-bar'),
        dragging: true,
    });
});