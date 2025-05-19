let zadania = JSON.parse(localStorage.getItem("zadania")) || {
  poniedzialek: [],
  wtorek: [],
  sroda: [],
  czwartek: [],
  piatek: [],
  sobota: [],
  niedziela: []
};

function dodajZadanie() {
  const dzien = document.querySelector('.dzien:not([style*="display: none"])').id.replace("View", "");
  const godzina = document.getElementById("hourInput").value;
  const tekst = document.getElementById("taskInput").value;

  if (!godzina || !tekst) {
    alert("Wpisz godzinę i treść zadania, dzbanie!");
    return;
  }

  const zadanie = { godzina, tekst };
  zadania[dzien].push(zadanie);
  localStorage.setItem("zadania", JSON.stringify(zadania));
  pokazZadania(dzien);

  document.getElementById("hourInput").value = "";
  document.getElementById("taskInput").value = "";
}

function pokazZadania(dzien) {
  const lista = document.getElementById(dzien + "List");
  lista.innerHTML = "";

  zadania[dzien].forEach((z, index) => {
    const li = document.createElement("li");
    li.classList.add("anim-dodany");
    li.textContent = `${z.godzina} – ${z.tekst}`;

    const btn = document.createElement("button");
    btn.textContent = "🗑️";
    btn.onclick = () => usunZadanie(dzien, index);

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

function usunZadanie(dzien, index) {
  const lista = document.getElementById(dzien + "List");
  const li = lista.children[index];

  li.classList.add("anim-usuwany");

  setTimeout(() => {
    zadania[dzien].splice(index, 1);
    localStorage.setItem("zadania", JSON.stringify(zadania));
    pokazZadania(dzien);
  }, 300); // dopasowane do CSS
}

function pokazDzien(nazwa) {
  const wszystkie = document.querySelectorAll('.dzien');
  wszystkie.forEach(d => d.style.display = 'none');

  const aktywny = document.getElementById(nazwa + 'View');
  aktywny.style.display = 'block';

  pokazZadania(nazwa);
}

// pokazywanie poniedziałku na start
pokazDzien("poniedzialek");

// Service Worker do PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker zarejestrowany"))
    .catch(err => console.error("Service Worker NIE DZIAŁA", err));
}