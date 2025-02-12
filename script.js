async function downloadVideo(format) {
  const url = document.getElementById('youtubeUrl').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Processing...</p>';

  try {
    const videoId = url.split('v=')[1].split('&')[0];
    const apiUrl = format === 'mp3' 
      ? `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`
      : `https://ytmp4.cc/api/button/mp4/${videoId}`;

    const response = await fetch(apiUrl, {
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY', // Replace with your key
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    });

    const data = await response.json();
    if (data.status === 'ok' || data.url) {
      window.open(data.link || data.url, '_blank');
      resultDiv.innerHTML = '<p>Download started!</p>';
    } else {
      resultDiv.innerHTML = '<p>Error: Could not generate link.</p>';
    }
  } catch (error) {
    resultDiv.innerHTML = '<p>Error: Invalid URL or API limit reached.</p>';
  }
}