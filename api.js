document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "http://localhost:3000/api";
  function getDomain() {
    const domain = window.location.hostname;
    console.log(domain);
    document.getElementById("domain").innerText = domain;
    return domain;
  }

  function getIP() {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("ip-address").innerText = data.ip;
      })
      .catch((error) => console.error("Error fetching IP:", error));
  }

  function getBrowserInfo() {
    var userAgent = navigator.userAgent;
    document.getElementById("browser-info").innerText = userAgent;
  }

  function getDeviceInfo() {
    var deviceInfo = "";
    if (navigator.userAgent.match(/Mobile/)) {
      deviceInfo += "Mobile";
    } else if (navigator.userAgent.match(/Tablet/)) {
      deviceInfo += "Tablet";
    } else {
      deviceInfo += "Desktop";
    }
    document.getElementById("device-info").innerText = deviceInfo;
  }

  function incrementVisitorCount() {
    var count = localStorage.getItem("visitorCount") || 0;
    count = parseInt(count) + 1;
    localStorage.setItem("visitorCount", count);
    document.getElementById("visitor-count").innerText = count;

    sendDataToBackend();
  }

  function sendDataToBackend() {
    const domain = document.getElementById("domain").innerText;
    const ip = document.getElementById("ip-address").innerText;
    const browserInfo = document.getElementById("browser-info").innerText;
    const deviceInfo = document.getElementById("device-info").innerText;

    fetch(`${API_URL}/record-visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain,
        ip,
        browserInfo,
        deviceInfo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  }

  function getLatestVisitorData() {
    fetch(`${API_URL}/get-latest-visitor/${domain}`)
      .then((response) => response.json())
      .then((data) => {
        const latestVisitor = data.latestVisitor;
        if (latestVisitor) {
          console.log("Latest Visitor:", latestVisitor);
        } else {
          console.log("No visitor data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching latest visitor data:", error);
      });
  }

  function analytics() {
    getDomain();
    getIP();
    getBrowserInfo();
    getDeviceInfo();
    incrementVisitorCount();
  }
  analytics();
});
