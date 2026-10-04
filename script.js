const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀' : '☾';
});

document.querySelectorAll('.quiz-options button').forEach(button => {
  button.addEventListener('click', () => {
    const feedback = document.getElementById('quizFeedback');
    document.querySelectorAll('.quiz-options button').forEach(b => b.classList.remove('correct', 'incorrect'));
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
      feedback.textContent = '¡Correcto! Los datos observados ayudan a elaborar conclusiones responsables.';
      feedback.style.color = '#23814c';
    } else {
      button.classList.add('incorrect');
      feedback.textContent = 'Inténtalo de nuevo: primero observa, registra y analiza la información.';
      feedback.style.color = '#b35b35';
    }
  });
});

document.getElementById('downloadCsv').addEventListener('click', () => {
  const table = document.getElementById('resultsTable');
  const rows = [...table.querySelectorAll('tr')].map(row =>
    [...row.querySelectorAll('th,td')].map(cell =>
      '"' + cell.innerText.replace(/"/g, '""').replace(/\n/g, ' ') + '"'
    ).join(',')
  );
  const blob = new Blob(['\uFEFF' + rows.join('\r\n')], {type: 'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resultados-plantas-repelentes.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});
