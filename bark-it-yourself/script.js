document.addEventListener("DOMContentLoaded", () => {
  // === Data for Toppings ===
  const toppingsList = [
    { name: "Almonds", class: "custom-btn custom-btn-almonds", imgId: "almondtopping" },
    { name: "M&Ms", class: "custom-btn custom-btn-mms", imgId: "mnmtopping" },
    { name: "Ball Sprinkles", class: "custom-btn custom-btn-ball", imgId: "balltopping" },
    { name: "Freeze Dried Strawberries", class: "custom-btn custom-btn-strawberry", imgId: "strawberries" },
    { name: "Flaky Sea Salt", class: "custom-btn custom-btn-salt", imgId: "salttopping" }
  ];

  const toppingsDiv = document.getElementById("toppings");
  const brokenBark = document.getElementById("brokenBark");

  // === Dynamically Create Topping Buttons ===
  toppingsList.forEach((topping, index) => {
    const label = document.createElement("label");
    label.className = topping.class;

    const inputId = `topping-${index}`;
    label.innerHTML = `
      <input type="checkbox" name="toppings" value="${topping.name}" id="${inputId}" hidden>
      ${topping.name}
    `;

    toppingsDiv.appendChild(label);
  });

  // === Utility Functions ===
  function enableStep(stepId) {
    const step = document.getElementById(stepId);
    if (step) {
      step.style.opacity = "1";
      step.style.pointerEvents = "auto";
    }
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // === Chocolate Selection (Step 1) ===
  document.querySelectorAll('input[name="chocolate"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('darkChocoImg').style.display = 'none';
      document.getElementById('milkChocoImg').style.display = 'none';
      document.getElementById('whiteChocoImg').style.display = 'none';

      const selected = radio.value;
      const imgId = selected === "dark" ? "darkChocoImg" :
                    selected === "milk" ? "milkChocoImg" :
                    selected === "white" ? "whiteChocoImg" : null;

      if (imgId) document.getElementById(imgId).style.display = 'block';

      enableStep('step2');
    });
  });

  // === Drizzle Selection (Step 2) ===
  document.querySelectorAll('#step2 input[type="checkbox"], #step2 input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('.drizzle-layer').forEach(img => {
        img.style.display = 'none';
      });

      document.querySelectorAll('#step2 input:checked').forEach(drizzleInput => {
        const drizzleId = `drizzle${capitalizeFirstLetter(drizzleInput.value)}`;
        const img = document.getElementById(drizzleId);
        if (img) img.style.display = 'block';
      });

      enableStep('step3');
    });
  });

  // === Toppings Selection (Step 3) ===
  toppingsDiv.addEventListener('change', (e) => {
    if (e.target && e.target.name === "toppings") {
      const topping = toppingsList.find(t => t.name === e.target.value);
      if (topping) {
        const img = document.getElementById(topping.imgId);
        if (img) img.style.display = e.target.checked ? 'block' : 'none';
      }

      const anySelected = document.querySelectorAll('#toppings input[type="checkbox"]:checked').length > 0;
      if (anySelected) {
        enableStep('step4');
      } else {
        const step4 = document.getElementById('step4');
        step4.style.opacity = '0.5';
        step4.style.pointerEvents = 'none';
      }
    }
  });

  // === Step 4: Break It Checkbox Logic ===
  const breakCheckbox = document.getElementById("bark");
  breakCheckbox.addEventListener("change", () => {
    if (breakCheckbox.checked) {
      brokenBark.style.display = "block";
      brokenBark.classList.add("show");
    } else {
      brokenBark.classList.remove("show");
      setTimeout(() => brokenBark.style.display = "none", 400); // wait for fade out
    }
  });

  // === Submit Form (Final Step) ===
  document.getElementById("chocoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const selectedChocolate = document.querySelector('input[name="chocolate"]:checked')?.value || 'None';
    const selectedDrizzles = Array.from(document.querySelectorAll('input[name="drizzle"]:checked')).map(i => i.value);
    const selectedToppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(i => i.value);

    console.log("Chocolate:", selectedChocolate);
    console.log("Drizzle:", selectedDrizzles);
    console.log("Toppings:", selectedToppings);

    alert("Your custom bark has been created!");
  });
});
