   
   
   document.addEventListener("DOMContentLoaded", () => {
      const form = document.querySelector("form");
      const tablica = document.getElementById("tablica");

      // Učitaj podatke iz localStorage
      const spremljeniPodaci = localStorage.getItem("moji_redovi");
      if (spremljeniPodaci) {
        const rows = JSON.parse(spremljeniPodaci);
        rows.forEach((row) => tablica.addRow(row));
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Dodaj red u tablicu
        tablica.addRow(data);

        // Spremi u localStorage
        const trenutniPodaci = localStorage.getItem("moji_redovi");
        const rows = trenutniPodaci ? JSON.parse(trenutniPodaci) : [];
        rows.push(data);
        localStorage.setItem("moji_redovi", JSON.stringify(rows));

        form.reset();
      });
    });