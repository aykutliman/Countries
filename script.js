let countries = [];

const userAction = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    countries = await response.json();
    displayCountries(countries);
  } catch (error) {
    console.error("Error:", error);
  }
};

userAction();

const displayCountries = (countryList) => {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  countryList.forEach(country => {
    const newDiv = document.createElement("div");
    newDiv.className = "country-card";
    newDiv.innerHTML = `
      <h2>${country.name.common}</h2>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population.toLocaleString()}</p>
      <p>Region: ${country.region}</p>
      <img src="${country.flags.png}" width="100">
    `;
    container.appendChild(newDiv);
  });
};

const searchButton = document.getElementById("searchButton");
const filterSelect = document.getElementById("filter");

searchButton.addEventListener("click", () => {
  const countryInput = document.getElementById("countryInput").value.toLowerCase();
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(countryInput)
  );

  if (filteredCountries.length > 0) {
    displayCountries(filteredCountries);
  } else {
    alert("Country not found!");
  }
});

filterSelect.addEventListener("change", () => {
  const selectedRegion = filterSelect.value.toLowerCase();
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const filteredCountries = countries.filter(country => country.region.toLowerCase() === selectedRegion);

  if (filteredCountries.length > 0) {
    displayCountries(filteredCountries);
  } else {
    alert("No countries found in this region!");
  }
});
