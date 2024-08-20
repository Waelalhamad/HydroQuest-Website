// Function to load components dynamically
function loadComponent(component) {
    fetch(`./pages/dashboard/components/${component}`)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("component-view").innerHTML = data;
        if (component === "sensors.html") {
          loadGaugeCharts();
        }
        if (component === "location.html") {
          initMap();
        }
      })
      .catch((error) => console.error("Error loading component:", error));
  }
  
  // Load the sidebar on page load and keep it across all components
  document.addEventListener("DOMContentLoaded", function () {
    fetch("./pages/dashboard/components/sidebar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("sidebar-container").innerHTML = data;
        loadComponent("dashboard.html"); // Load default component
      })
      .catch((error) => console.error("Error loading sidebar:", error));
  });
  