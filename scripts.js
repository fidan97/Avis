document.addEventListener('DOMContentLoaded', () => {
    const cityFilter = document.getElementById('cityFilter');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const avgPricePerSqMChart = document.getElementById('avgPricePerSqMChart');
    const avgPriceChart = document.getElementById('avgPriceChart');
    const content = document.getElementById('content');
    const toggleButton = document.getElementById('toggleButton');
   // const arrow = document.querySelector('.arrow');
   const toggleIcon = toggleButton.querySelector('i');
    
    let data;
  
    const drawPieChart = (canvas, value, label) => {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) / 2;
      const centerX = width / 2;
      const centerY = height / 2;
  
      ctx.clearRect(0, 0, width, height);
  
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * (value / 100));
      ctx.closePath();
      ctx.fillStyle = 'rgba(54, 162, 235, 0.2)';
      ctx.fill();
  
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, Math.PI * 2 * (value / 100), Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = '#eee';
      ctx.fill();
  
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${label}: ${value}`, centerX, centerY);
    };
  
    const updateTable = (city) => {
      dataTable.innerHTML = '';
      const cityData = data[city];
      const row = dataTable.insertRow();
      for (const key in cityData) {
        if (key.includes('Gjennomsnitt')) continue;
        const cell = row.insertCell();
        cell.textContent = cityData[key];
      }
    };
  
    const renderCharts = (city) => {
      const cityData = data[city];
      const avgPricePerSqM = parseFloat(cityData["Gjennomsnitt kvm. pris"].replace(/,/g, ''));
      const avgPrice = parseFloat(cityData["Gjennomsnittspris"].replace(/,/g, ''));
  
      drawPieChart(avgPricePerSqMChart, avgPricePerSqM, 'kvm. pris');
      drawPieChart(avgPriceChart, avgPrice, 'pris');
    };
  
    cityFilter.addEventListener('change', (event) => {
      const selectedCity = event.target.value;
      updateTable(selectedCity);
      renderCharts(selectedCity);
    });
  
   /* toggleButton.addEventListener('click', () => {
      if (content.style.display === 'block') {
        content.style.display = 'none';
        arrow.textContent = '▼';
      } else {
        content.style.display = 'block';
        arrow.textContent = '▲';
      }
    })
    
    toggleButton.addEventListener('click', () => {
        if (content.classList.contains('show')) {
          content.classList.remove('show');
          content.style.maxHeight = null;
          toggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
          content.classList.add('show');
          content.style.maxHeight = content.scrollHeight + 'px';
          toggleIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
      });*/
      document.getElementById('toggleButton').addEventListener('click', function() {
        const content = document.getElementById('content');
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            this.innerHTML = 'Se mindre <i class="fas fa-chevron-up"></i>';
        } else {
            content.style.display = 'none';
            this.innerHTML = 'Se mer <i class="fas fa-chevron-down"></i>';
        }
    });
  
    fetch('data.json')
      .then(response => response.json())
      .then(jsonData => {
        data = jsonData;
        // Initialize with default city (Norge)
        updateTable('Norge');
        renderCharts('Norge');
      })
      .catch(error => console.error('Error fetching JSON data:', error));
  });
  