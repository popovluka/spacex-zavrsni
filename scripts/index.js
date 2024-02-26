document.addEventListener("DOMContentLoaded", async function () {
  async function apiFetch(url) {
    if (!url) return;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error while connecting to the server");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  function createP(title, text, parent) {
    title = document.createElement("p");
    title.textContent = text;
    parent.appendChild(title);
  }

  var launchesApi = " https://api.spacexdata.com/v4/launches";
  const launchData = await apiFetch(launchesApi);
  var launchesPlaceHolder = document.getElementById("launchesPlaceHolder");

  launchData.forEach(async (element) => {
    var launch = document.createElement("div");
    launch.className = "launchDesc";
    launchesPlaceHolder.appendChild(launch);

    var launchImg = document.createElement("img");
    launchImg.className = "launchImg";
    launchImg.src = await element.links.patch.small;
    launch.appendChild(launchImg);

    var launchTitle = document.createElement("h3");
    launchTitle.textContent = await element.name;
    launch.appendChild(launchTitle);

    var launchDesc = document.createElement("p");
    launchDesc.textContent = await element.details.slice(0, 100);
    launch.appendChild(launchDesc);
    launchDesc.style.color = "gray";
    launchDesc.style.fontSize = "small";
  });

  var rocketApi = " https://api.spacexdata.com/v4/rockets";
  const rocketData = await apiFetch(rocketApi);

  var rocketPlaceHolder = document.getElementById("rocketPlaceHolder");

  rocketData.forEach(async (element, index) => {
    var rocket = document.createElement("div");
    rocket.className = "singleRocket";
    rocketPlaceHolder.appendChild(rocket);

    var rocketImg = document.createElement("img");
    rocketImg.className = "rocketImg";
    rocketImg.src = await element.flickr_images[0];
    rocket.appendChild(rocketImg);

    var rocketTitle = document.createElement("h3");
    rocket.appendChild(rocketTitle);
    rocketTitle.textContent = await element.name;

    var datum = new Date(element.first_flight);

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = datum.toLocaleDateString("en-us", options);

    var description = document.createElement("p");
    rocket.appendChild(description);
    description.textContent = `${await element.description.slice(0, 120)}...`;
    description.style.fontWeight = "100";
    description.style.fontSize = "12px";
    description.style.color = "gray";

    var btn = document.createElement(`button`);
    btn.setAttribute(`id`, `btn${[index]}`);
    btn.textContent = `Learn more`;
    rocket.appendChild(btn);

    var specificRocket = document.getElementById("dualview");
    var rocketName = document.getElementById("rocketname");
    var rocketType = document.getElementById("rocketType");
    var firstFlight = document.getElementById("firstFlight");
    var costPerLaunch = document.getElementById("cost");
    var company = document.getElementById("company");
    var success = document.getElementById("success");
    var ifActive = document.getElementById("ifactive");
    var country = document.getElementById("country");
    var stage = document.getElementById("stage");
    var height = document.getElementById("height");
    var diametar = document.getElementById("diametar");
    var mass = document.getElementById("mass");
    var desc = document.getElementById("desc");
    var body = document.getElementById("bodi");
    var specificRocketImg = document.getElementById("specificRocketImg");
    var next = document.getElementById("next");
    var prev = document.getElementById("prev");
    var toggle = document.getElementById("toggle");
    var naslov = document.getElementById("naslov");

    document
      .getElementById(`btn${[index]}`)
      .addEventListener("click", function () {
        rocketPlaceHolder.style.display = "none";

        specificRocket.style.display = "flex";
        rocketName.textContent = element.name;
        rocketType.textContent = `Type: ${element.type.toUpperCase()}`;
        firstFlight.textContent = `First Flight: ${formattedDate}`;
        costPerLaunch.textContent = `Cost per launch:  $${element.cost_per_launch.toLocaleString('en-US')}`
        company.textContent = `Company: ${element.company}`;
        success.textContent = `Success rate: ${element.success_rate_pct}%`;

        if (element.active) {
          ifActive.textContent = `Active`;
          ifActive.style.color = `Green`;
        } else {
          ifActive.textContent = `Inactive`;
          ifActive.style.color = `Red`;
        }

        country.textContent = `Country: ${element.country}`;
        stage.textContent = `Stages: ${element.stages}`;
        height.textContent = `Height: ${element.height.meters} m`;
        diametar.textContent = `Diameter: ${element.diameter.meters} m`;
        mass.textContent = `Mass: ${element.mass.kg.toLocaleString('en-US')} kg`;
        desc.textContent = `${element.description}`;
        body.style.backgroundImage = "none";
        naslov.style.display = 'none'
        specificRocketImg.src = element.flickr_images[0];

        let i = 0;

        next.addEventListener("click", function () {
          i++;

          if (i >= element.flickr_images.length) {
            i = 0;
          }

          specificRocketImg.src = element.flickr_images[i];
        });

        prev.addEventListener("click", function () {
          i--;

          if (i < 0) {
            i = element.flickr_images.length - 1;
          }

          specificRocketImg.src = element.flickr_images[i];
        });
      });

    toggle.addEventListener("click", function () {
        toggle.textContent = 'Toggle Metric Units'
      height.textContent = `Height: ${element.height.feet} feet`;
      diametar.textContent = `Diametar: ${element.diameter.feet} feet`;
      mass.textContent = `Mass: ${element.mass.lb.toLocaleString('en-US')} lbs`;
    });
  });

  var aboutApi = " https://api.spacexdata.com/v4/company";
  const aboutData = await apiFetch(aboutApi);

  var aboutPlaceHolder = document.getElementById("aboutPlaceHolder");
  var companyNamePH = document.createElement("div");
  var founderPH = document.createElement("div");
  var dateFounded = document.createElement("div");
  var numOfEmployees = document.createElement("div");
  var numOfVehicles = document.createElement("div");
  var summary = document.createElement("div");
  var address = document.createElement("div")

  aboutPlaceHolder.appendChild(companyNamePH);
  companyNamePH.textContent = `Company name: ${aboutData.name}`;
  aboutPlaceHolder.appendChild(founderPH);
  founderPH.textContent = `Founder: ${aboutData.founder}`;
  aboutPlaceHolder.appendChild(dateFounded);
  dateFounded.textContent = `Year of foundation: ${aboutData.founded}`;
  aboutPlaceHolder.appendChild(numOfEmployees);
  numOfEmployees.textContent = `Number of employees: ${aboutData.employees}`;
  aboutPlaceHolder.appendChild(numOfVehicles);
  numOfVehicles.textContent = `Number of rockets: ${aboutData.vehicles}`;
  aboutPlaceHolder.appendChild(address);
  address.textContent = `${aboutData.headquarters.address}, ${aboutData.headquarters.city}, ${aboutData.headquarters.state}`
  aboutPlaceHolder.appendChild(summary);
  summary.textContent = `${aboutData.summary}`;

});
