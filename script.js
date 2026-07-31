document.addEventListener("DOMContentLoaded", () => {
    fetch("companies.json")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#myTable tbody");

            data.forEach(company => {
                const row = tbody.insertRow();
                row.insertCell().textContent = company.name;
            });
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });
});
