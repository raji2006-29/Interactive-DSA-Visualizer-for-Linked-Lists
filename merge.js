let a = [], b = [], merged = [];
let i = 0, j = 0;

function init() {
  a = document.getElementById("l1").value.split(",").map(Number);
  b = document.getElementById("l2").value.split(",").map(Number);

  merged = [];
  i = j = 0;

  document.getElementById("desc").innerHTML =
    "Lists created. Compare the head nodes of both lists.";

  document.getElementById("createBtn").classList.add("active-btn");
  document.getElementById("nextBtn").classList.remove("active-btn", "next-active");

  render();
}

function renderList(id, arr, idx) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  arr.forEach((v, k) => {
    let cls = "node";
    if (k === idx) cls += " active";

    el.innerHTML += `
      <div class="${cls}">${v}</div>
      <div class="arrow">&rarr;</div>
    `;
  });

  if (arr.length > 0) el.innerHTML = el.innerHTML.slice(0, -25);
}

function render() {
  renderList("list1", a, i);
  renderList("list2", b, j);

  const m = document.getElementById("merged");
  m.innerHTML = "";

  merged.forEach(v => {
    m.innerHTML += `
      <div class="node merged">${v}</div>
      <div class="arrow">&rarr;</div>
    `;
  });

  if (merged.length > 0) m.innerHTML = m.innerHTML.slice(0, -25);
}

function nextStep() {
  document.getElementById("nextBtn").classList.add("active-btn", "next-active");
  document.getElementById("createBtn").classList.remove("active-btn");

  if (i >= a.length && j >= b.length) {
    document.getElementById("desc").innerHTML =
      "Merging completed. Final sorted list obtained.";
    return;
  }

  if (i < a.length && (j >= b.length || a[i] <= b[j])) {
    document.getElementById("desc").innerHTML =
      `Picked ${a[i]} from List 1 (smaller or equal).`;
    merged.push(a[i++]);
  } else {
    document.getElementById("desc").innerHTML =
      `Picked ${b[j]} from List 2 (smaller).`;
    merged.push(b[j++]);
  }

  render();
}
