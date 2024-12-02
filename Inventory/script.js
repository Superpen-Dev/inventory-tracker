const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const inventoryModal = document.getElementById("inventoryModal");
const searchInput = document.getElementById("searchInput");

openModalBtn.addEventListener("click", () => {
  // Show the modal by removing the "hidden" class and adding "flex"
  inventoryModal.classList.remove("hidden");
  inventoryModal.classList.add("flex");
});

closeModalBtn.addEventListener("click", () => {
  // Hide the modal by adding the "hidden" class and removing "flex"
  inventoryModal.classList.add("hidden");
  inventoryModal.classList.remove("flex");
});

document
  .getElementById("inventoryForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value.trim();
    const quantity = parseFloat(document.getElementById("quantity").value);
    const measurement = document.getElementById("measurement").value;

    if (productName && quantity > 0) {
      addToInventory(productName, quantity, measurement);
      this.reset();
      closeModalBtn.click();
    }
  });

let inventory = [];

function addToInventory(name, quantity, measurement) {
  inventory.push({ name, quantity, measurement });
  updateInventoryTable();
}

function updateInventoryTable() {
  const inventoryTable = document.getElementById("inventoryTable");
  inventoryTable.innerHTML = "";

  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-100");

    row.innerHTML = `
      <td class="px-4 py-2">${index + 1}</td>
      <td class="px-4 py-2">${item.name}</td>
      <td class="px-4 py-2">${item.quantity}</td>
      <td class="px-4 py-2">${item.measurement}</td>
      <td class="px-4 py-2">
        <button onclick="removeFromInventory(${index})" 
                class="text-red-500 hover:underline">Remove</button>
      </td>
    `;
    inventoryTable.appendChild(row);
  });
}

function removeFromInventory(index) {
  inventory.splice(index, 1);
  updateInventoryTable();
}

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  const inventoryTable = document.getElementById("inventoryTable");
  inventoryTable.innerHTML = "";

  filteredInventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-100");

    row.innerHTML = `
      <td class="px-4 py-2">${index + 1}</td>
      <td class="px-4 py-2">${item.name}</td>
      <td class="px-4 py-2">${item.quantity}</td>
      <td class="px-4 py-2">${item.measurement}</td>
      <td class="px-4 py-2">
        <button onclick="removeFromInventory(${index})" 
                class="text-red-500 hover:underline">Remove</button>
      </td>
    `;
    inventoryTable.appendChild(row);
  });
});
