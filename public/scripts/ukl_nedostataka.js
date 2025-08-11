
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const table = document.getElementById("tablica");


  fetch("/api/ukl_nedostataka")
    .then(res => res.json())
    .then(data => {
      data.forEach(row => table.addRow(row));
    })
    .catch(err => console.error("Greška pri dohvaćanju:", err));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    table.addRow(data);

    try {
      const res = await fetch("/api/ukl_nedostataka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Greška pri spremanju");

      alert("Podatak spremljen!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Spremanje nije uspjelo");
    }
  });
});
