let arr = [];
let reversed = [];
let curr = 0;

function init() {
  const input = document.getElementById("listInput").value;
  arr = input.split(",").map(Number);

  reversed = [];
  curr = 0;

  document.getElementById("desc").innerHTML =
    "List created. <b>curr</b> starts at head, <b>prev</b> is NULL. Click Next Step.";

  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  // Render reversed part (prev side)
  reversed.forEach((v, index) => {
    let label = index === 0 ? "<div class='label'>prev</div>" : "";
    list.innerHTML += `
      <div class="node merged">
        ${label}${v}
      </div>
      <div class="arrow">&rarr;</div>
    `;
  });

  // Remove last arrow if reversed exists
  if (reversed.length > 0) {
    list.innerHTML = list.innerHTML.slice(0, -25);
  }

  // Render current node
  if (curr < arr.length) {
    list.innerHTML += `
      <div class="node active">
        <div class="label">curr</div>
        ${arr[curr]}
      </div>
    `;
  }

  // Render next nodes
  for (let i = curr + 1; i < arr.length; i++) {
    let label = i === curr + 1 ? "<div class='label'>next</div>" : "";
    list.innerHTML += `
      <div class="arrow">&rarr;</div>
      <div class="node">
        ${label}${arr[i]}
      </div>
    `;
  }
}

function nextStep() {
  if (curr >= arr.length) {
    document.getElementById("desc").innerHTML =
      "<b>Reversal completed.</b> All links reversed successfully.";
    return;
  }

document.getElementById("desc").innerHTML =
  `Reversing link of node <b>${arr[curr]}</b>.<br>
   Step: Save the <b>next</b> node, then point <b>curr.next</b> to <b>prev</b>.<br>
   Finally, move <b>prev</b> and <b>curr</b> one step forward.`;

  reversed.unshift(arr[curr]);
  curr++;

  render();
}
