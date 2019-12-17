const ethereum = window.ethereum;
const button = document.getElementById("submit");
const amountInput = document.getElementById("amount");
const tokenAddress = document.getElementById("token-address");
// ctbk contract data
const ctbk = {
  abi: [
    "function mint(uint256 _quantity)",
    "function balanceOf(address _owner) view returns (uint256 balance)",
  ],
  address: "0x995d6a8c21f24be1dd04e105dd0d83758343e258",
};

// Initializes the app if ethereum is present
if (ethereum) {
  ethereum.autoRefreshOnNetworkChange = false;
  ethereum.on("networkChanged", chainId => {
    checkNetwork(chainId);
  });
} else {
  setMessage("error", "Please install metamask");
}

// Listen to the main button click
button.addEventListener("click", async event => {
  event.preventDefault();

  if (
    button.classList.contains("error") ||
    button.classList.contains("working")
  ) {
    return;
  }
  if (button.classList.contains("done")) {
    button.classList.remove("done");
    return;
  }

  // Get the amount and error out if it's empty
  const amount = amountInput.value;
  if (!amount) {
    alert("Amount should not be empty.");
    amountInput.value = "";
    amountInput.focus();
  }

  await mint(amount);
});

// Function to mint the coins
async function mint(amount) {
  if (!ethereum) {
    return;
  }

  // Ethereum user detected. You can now use the provider.
  await ethereum.enable();
  const provider = new ethers.providers.Web3Provider(ethereum);

  // Check if the network is rinkeby
  const network = await provider.getNetwork();
  if (!checkNetwork(network.chainId)) {
    return;
  }

  // Set working message and start minting
  setMessage("working", "Processing...");

  const signer = provider.getSigner();
  const instanceCentralBank = new ethers.Contract(
    ctbk.address,
    ctbk.abi,
    signer
  );

  const amountBn = ethers.utils.parseEther(amount.toString());
  let tx;
  try {
    tx = await instanceCentralBank.mint(amountBn);
  } catch (e) {
    setMessage("error", `failure: ${e.message}`);
  }
  await tx.wait();
  setMessage("done", "Success!");
  const address = await signer.getAddress();
  const balance = (await instanceCentralBank.balanceOf(address))
    .div("1".padEnd(19, "0"))
    .toString();
  alert(`Your account now have ${balance} CTBK tokens`);
}

function checkNetwork(chainId) {
  if (chainId.toString() !== "4") {
    setMessage("error", "Please connect to rinkeby");
    return false;
  } else {
    setMessage("default", "Ka-ching!");
    return true;
  }
}

function setMessage(state, message) {
  button.className = `button ${state}`;
  button.value = message;
}

tokenAddress.addEventListener("click", () => watchAssetExperiment());
function watchAssetExperiment() {
  ethereum.sendAsync(
    {
      method: "metamask_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: ctbk.address,
          symbol: "CTBK",
          decimals: 18,
          image: "http://baguette-central.request.network/assets/ctbk-icon.svg",
        },
      },
      id: Math.round(Math.random() * 100000),
    },
    (err, addedBoolean) => {
      if (err) {
        console.error(err);
      }

      if (addedBoolean) {
        console.log("Coin added to wallet");
      }
    }
  );
}
