let arr = [];
let fast = 0, slow = 0;
let step = 0;
let n = 0;
let deleted = false;  

function init() {
  arr = document.getElementById("listInput").value.split(",").map(Number);
  n = parseInt(document.getElementById("nInput").value);

  fast = 0;
  slow = 0;
  step = 0;
  deleted = false;

  document.getElementById("desc").innerHTML =
    "List created. Fast and Slow pointers start at head.";

  document.getElementById("nextBtn").disabled = false;
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  arr.forEach((v, i) => {
    let cls = "node";
    let label = "";

    if (i === fast) {
      cls += " active";
      label += "<div class='label'>fast</div>";
    }
    if (i === slow) {
      cls += " merged";
      label += "<div class='label'>slow</div>";
    }

    list.innerHTML += `
      <div class="${cls}">
        ${label}${v}
      </div>
      <div class="arrow">&rarr;</div>
    `;
  });

  if (arr.length > 0) list.innerHTML = list.innerHTML.slice(0, -25);
}

function nextStep() {
  if (deleted) return;   
  document.getElementById("nextBtn").classList.add("active-btn");

  if (step < n) {
    fast++;
    step++;

    document.getElementById("desc").innerHTML =
      `Moving fast pointer forward (${step}/${n})`;
    render();
    return;
  }

  if (fast < arr.length - 1) {
    fast++;
    slow++;

    document.getElementById("desc").innerHTML =
      "Moving fast and slow pointers together.";
    render();
    return;
  }
  document.getElementById("desc").innerHTML =
    `Removing node <b>${arr[slow + 1]}</b> (Nth node from end).`;

  arr.splice(slow + 1, 1);
  deleted = true;        

  render();

  document.getElementById("desc").innerHTML +=
    "<br><b>Deletion completed.</b>";

  document.getElementById("nextBtn").disabled = true; 
}
