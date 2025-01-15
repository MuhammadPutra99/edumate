import React, { useState, useEffect, useRef } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const ProgressRadarChart = () => {
  const [subjects, setSubjects] = useState([]);
  const [progress, setProgress] = useState([20, 40, 60, 80, 50]); // Dummy progress values
  const [selectedSubject, setSelectedSubject] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [todoViewIndex, setTodoViewIndex] = useState(null); // To handle which todo's full description is shown
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const radarChartRef = useRef(null); // Ref untuk canvas chart
  const chartInstanceRef = useRef(null); // Ref untuk menyimpan instance chart

  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem('selectedSubjects'));
    if (savedSubjects) {
      setSubjects(savedSubjects);
    }
  }, []);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todoList')) || [];
    setTodoList(savedTodos);

    // Update progress saat todoList berubah
    updateProgress(savedTodos);
  }, []);

  useEffect(() => {
    if (radarChartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = radarChartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: subjects,
          datasets: [{
            label: 'Progress',
            data: progress,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
            },
          },
        },
      });
    }
  }, [subjects, progress]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setIsMenuOpen(false); // Close menu after selection
  };

  const handleAddTodo = (title, description, keywords) => {
    const newTodo = {
      title,
      description,
      keywords,
      subject: selectedSubject,
      date: new Date().toLocaleDateString(),
    };

    const updatedTodos = [...todoList, newTodo];
    setTodoList(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));

    // Update jumlah todo per subjek
    const subjectTodoCounts = JSON.parse(localStorage.getItem('subjectTodoCounts')) || {};
    subjectTodoCounts[selectedSubject] = (subjectTodoCounts[selectedSubject] || 0) + 1;
    localStorage.setItem('subjectTodoCounts', JSON.stringify(subjectTodoCounts));

    // Hitung progress berdasarkan todo
    updateProgress(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todoList.filter((_, todoIndex) => todoIndex !== index);
    setTodoList(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));

    // Update jumlah todo per subjek
    const subjectTodoCounts = JSON.parse(localStorage.getItem('subjectTodoCounts')) || {};
    if (subjectTodoCounts[selectedSubject]) {
      subjectTodoCounts[selectedSubject] -= 1;
      if (subjectTodoCounts[selectedSubject] < 0) subjectTodoCounts[selectedSubject] = 0;
    }
    localStorage.setItem('subjectTodoCounts', JSON.stringify(subjectTodoCounts));

    // Hitung progress berdasarkan todo
    updateProgress(updatedTodos);
  };

  const updateProgress = (todos) => {
    const subjectTodoCounts = JSON.parse(localStorage.getItem('subjectTodoCounts')) || {};

    const newProgress = subjects.map(subject => {
      const todoCount = subjectTodoCounts[subject] || 0;
      const progressValue = Math.floor((todoCount / 100) * 100); // Misalnya 100 todo = 100% progress
      return progressValue;
    });

    setProgress(newProgress);
    localStorage.setItem('progress', JSON.stringify(newProgress));
  };

  const handleViewTodo = (index) => {
    setTodoViewIndex(index); // Show the full description of the selected todo
  };

  const handleCloseView = () => {
    setTodoViewIndex(null); // Close the full description view
  };

  return (
    <div className="flex flex-row-reverse items-center justify-center">
      <div className='w-1/2 flex flex-col'>
        <h1 className="montserrat text-3xl text-white font-bold mb-4">Pilih Mata Pelajaran dan Buat Todo List</h1>

        {/* Hamburger Menu */}
        <div className="relative">
          <div
            className="flex items-center justify-center border border-white rounded-full p-3 hover:bg-white active:opacity-80 group cursor-pointer transition duration-100"
            onClick={toggleMenu}
          >
            <RxHamburgerMenu className="text-white text-2xl group-hover:text-black" />
          </div>

          {/* Dropdown Menu for Subjects */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectSelect(subject)}
                  className={`block w-full text-left px-4 py-2 text-black hover:bg-gray-200 transition ${selectedSubject === subject ? 'bg-white' : 'bg-white'}`}
                >
                  {subject}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Show Selected Subject */}
        {selectedSubject && (
          <div>
            <h2 className="text-xl mt-4 mb-2">Buat Todo untuk {selectedSubject}</h2>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Judul Todo"
                id="todoTitle"
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Deskripsi Todo"
                id="todoDesc"
                className="p-2 border rounded resize-none h-24"
              />
              <input
                type="text"
                placeholder="Inti Materi (Keyword)"
                id="todoKeywords"
                className="p-2 border rounded"
              />
            </div>
            <button
              onClick={() => {
                const title = document.getElementById('todoTitle').value;
                const description = document.getElementById('todoDesc').value;
                const keywords = document.getElementById('todoKeywords').value;
                handleAddTodo(title, description, keywords);
              }}
              className="bg-green-500 text-white p-2 rounded mt-2"
            >
              Tambah Todo
            </button>
          </div>
        )}

        {/* Todo List */}
        <div className="mt-6">
          <h2 className="text-xl mb-2">Todo List untuk {selectedSubject}</h2>
          <ul className="space-y-2">
            {todoList
              .filter((todo) => todo.subject === selectedSubject)
              .map((todo, index) => (
                <li key={index} className="border p-4 rounded shadow-sm">
                  <h3 className="font-bold">{todo.title}</h3>
                  <p>{`Todo ${index + 1}`}</p>
                  {todoViewIndex === index && (
                    <div className="mt-2">
                      <p><strong>Deskripsi:</strong> {todo.description}</p>
                      <button
                        onClick={handleCloseView}
                        className="bg-gray-500 text-white p-1 mt-2 rounded"
                      >
                        Tutup
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => handleViewTodo(index)}
                    className="bg-blue-500 text-white p-1 mt-2 rounded"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(index)}
                    className="bg-red-500 text-white p-1 mt-2 rounded"
                  >
                    Hapus Todo
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="chart-container">
        <canvas ref={radarChartRef}></canvas>
      </div>
    </div>
  );
};

export default ProgressRadarChart;
