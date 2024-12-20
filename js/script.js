function calculate() {
  document.getElementById("loader").style.display = "block";
  const fileInput = document.getElementById("fileInput");

  if (fileInput.files.length === 0) {
    alert("Please, choose file");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const fileContent = event.target.result;

    //
    const numbers = fileContent
      .split(/\s+/)
      .filter((num) => /^\d{6}$/.test(num));

    console.log("Elements:", numbers);

    setTimeout(() => {
      try {
        const longestSequence = findLongestChain(numbers);
        displayResult(longestSequence);
      } catch (error) {
        console.error("Error:", error);
      } finally {        
        document.getElementById("loader").style.display = "none";
      }
    }, 500);    
    
  };

  reader.onerror = function () {
    alert("File read error!");
  };

  reader.readAsText(file);
}

//finding longest chain func
function findLongestChain(numbers) {
  const used = new Set(); // used elements
  let longestChain = [];
  let currentChain = [];

  function dfs(currentNumber) {
    currentChain.push(currentNumber);
    used.add(currentNumber);

    const suffix = currentNumber.slice(4, 6); // last 2 numbers
    let extended = false;

    for (const nextNumber of numbers) {
      if (!used.has(nextNumber) && nextNumber.startsWith(suffix)) {
        extended = true;
        dfs(nextNumber);
      }
    }

    if (!extended && currentChain.length > longestChain.length) {
        longestChain = [...currentChain];
        console.log("Current chain:", longestChain);
    }

    currentChain.pop();
    used.delete(currentNumber);
  }

  
  for (const number of numbers) {
    dfs(number);
  }

  return longestChain;
}

//show result func
function displayResult(chain) {
  const output = document.getElementById("output");
  output.textContent =
    "Найбільша послідовність: " + chain.join("").replace(/\n/g, "");
  console.log("Найбільший ланцюжок:", chain.join(""));
}
