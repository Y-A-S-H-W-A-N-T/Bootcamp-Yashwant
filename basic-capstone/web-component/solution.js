class WeatherComponent extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    this.attachShadow({ mode: "open" });

    // Define the structure of the weather component directly in JavaScript
    this.shadowRoot.innerHTML = `
      <style>
        /* Container for the weather box */
        .weather-container {
          background: linear-gradient(135deg, #a8c0ff, #3f4c6b); /* Gradient background */
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          width: 350px;
          text-align: center;
          color: #fff;
          font-family: 'Arial', sans-serif;
          margin-bottom: 20px;
        }

        /* City name styling */
        .city-name {
          font-size: 32px;
          font-weight: 700;
          text-transform: capitalize;
        }

        /* Weather description (cloud, sunny, etc.) */
        .description {
          font-size: 18px;
          margin-top: 10px;
          font-weight: 500;
        }

        /* Temperature styling */
        .temperature {
          font-size: 50px;
          font-weight: 800;
          margin-top: 15px;
        }

        /* Form container for city input */
        .form-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        /* Input field styling */
        .city-input {
          width: 70%;
          padding: 12px;
          font-size: 16px;
          border-radius: 25px;
          border: 2px solid #a8c0ff;
          margin-right: 10px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        /* Focus effect for input field */
        .city-input:focus {
          border-color: #3f4c6b;
        }

        /* Button styling */
        .submit-button {
          border: none;
          color: #3f4c6b;
          border-radius: 25px;
          border: 2px solid #a8c0ff;
          cursor: pointer;
          width: 150px;
          font-size: 16px;
          transition: background-color 0.3s ease;
          padding: 12px;
        }

        /* Hover effect for button */
        .submit-button:hover {
          background: linear-gradient(135deg, #a8c0ff, #3f4c6b); /* Gradient background */
          color: white;
        }

        /* Styling for icons (cloud, sun, etc.) */
        .weather-icon {
          width: 80px;
          height: 80px;
          margin-top: 10px;
        }

        /* Add a small text below the city */
        .small-text {
          font-size: 14px;
          color: #e6e6e6;
          margin-top: 10px;
        }
      </style>
      <div class="weather-container">
        <h2>Weather in <span class="city-name">Los Angeles</span></h2>
        <img class="weather-icon" src="https://img.icons8.com/ios-filled/50/ffffff/sun.png" alt="Weather Icon"/>
        <div class="description">Clear sky</div>
        <div class="temperature">72°F</div>
      </div>
      <div class="form-container">
        <input type="text" class="city-input" placeholder="Enter a city" />
        <button class="submit-button">Get Weather</button>
      </div>

    `;

    // Access elements inside the shadow DOM
    this.cityInput = this.shadowRoot.querySelector(".city-input");
    this.submitButton = this.shadowRoot.querySelector(".submit-button");
    this.cityNameElem = this.shadowRoot.querySelector(".city-name");
    this.descriptionElem = this.shadowRoot.querySelector(".description");
    this.temperatureElem = this.shadowRoot.querySelector(".temperature");

    // Event listener for the submit button
    this.submitButton.addEventListener("click", () => this.handleButtonClick());
  }

  async fetchWeather(city) {
    const apiKey = "b0b80ecb1ac34990a46201357242012";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        this.descriptionElem.textContent = "City not found";
        this.temperatureElem.textContent = "";
      } else {
        const description = data.current.condition.text;
        const temperature = data.current.temp_c;

        this.cityNameElem.textContent = city;
        this.descriptionElem.textContent = description;
        this.temperatureElem.textContent = `${temperature}°C`;
      }
    } catch (error) {
      this.descriptionElem.textContent = "Error fetching weather";
      this.temperatureElem.textContent = "";
    }
  }

  handleButtonClick() {
    const cityInput = this.cityInput.value.trim();
    if (cityInput) {
      this.fetchWeather(cityInput);
    }
  }

  connectedCallback() {
    const defaultCity = this.getAttribute("city") || "Los Angeles";
    this.fetchWeather(defaultCity);
  }
}

// Define the custom element
customElements.define("weather-component", WeatherComponent);
