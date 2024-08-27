document.addEventListener("DOMContentLoaded", function() {
    // Rotating Text
    const lines = [
        "Empowering Students through Technology",
        "Providing Free Educational Resources",
        "Helping Students Develop Essential Skills",
        "SURE Trust Internships are accessible AICTE Portal"
    ];
    let currentIndex = 0;
    const rotatingText = document.getElementById("rotating-text");

    function showNextLine() {
        if (rotatingText) {
            rotatingText.textContent = lines[currentIndex];
            currentIndex = (currentIndex + 1) % lines.length;
        }
    }

    showNextLine();
    setInterval(showNextLine, 3000);

    // Counting Effect
    const counters = document.querySelectorAll('.stats-card h2');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / 200; // Adjust speed as needed

            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCount, 20); // Adjust timing as needed
            } else {
                counter.innerText = `${target}+`;
            }
        };

        updateCount();
    });
});
