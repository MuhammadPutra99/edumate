import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryIndo from '../../assets/history.jpg';
import MathImage from '../../assets/math.jpg';
import EnglishImage from '../../assets/english.jpg';
import ScienceImage from '../../assets/science.jpg';
import ArtsImage from '../../assets/arts.jpg';
import PEImage from '../../assets/pe.jpg';
import EconomyImage from '../../assets/economy.jpg'; // Gambar untuk Ekonomi
import ReligiousImage from '../../assets/religious.jpg'; // Gambar untuk Pendidikan Agama
import IPSImage from '../../assets/ips.jpg'; // Gambar untuk IPS
import '../../AddItem.css';

const SubjectSelection = () => {
  // Daftar semua mata pelajaran
  const allSubjects = ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris', 'Sejarah', 'Pendidikan Agama', 'Seni Budaya', 'Olahraga', 'Ekonomi'];

  // Objek gambar untuk setiap mata pelajaran
  const subjectImages = {
    Matematika: MathImage,
    'Bahasa Indonesia': HistoryIndo,
    IPA: ScienceImage,
    IPS: IPSImage,
    'Bahasa Inggris': EnglishImage,
    Sejarah: HistoryIndo,
    'Pendidikan Agama': ReligiousImage,
    'Seni Budaya': ArtsImage,
    Olahraga: PEImage,
    Ekonomi: EconomyImage,
  };

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();

  const handleSelectSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      // Jika sudah dipilih, hapus dari selectedSubjects
      setSelectedSubjects((prevSubjects) => prevSubjects.filter((item) => item !== subject));
    } else if (selectedSubjects.length < 5) {
      // Jika belum dipilih dan ada ruang, tambahkan ke selectedSubjects
      setSelectedSubjects((prevSubjects) => [...prevSubjects, subject]);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
    navigate('/progress');
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1 className="montserrat text-4xl text-white font-semibold mb-7">Pilih 5 Mata Pelajaran</h1>
      <div className="grid grid-cols-5 gap-8 mb-4">
        {allSubjects.map((subject) => (
          <div key={subject} className="flex flex-col items-center justify-center">
            <div
              className={`text-white rounded-md w-full text-center cursor-pointer ${selectedSubjects.includes(subject) ? 'bg-black' : 'bg-zinc-800 hover:scale-110 transition-all duration-150 hover:bg-zinc-900'} flex flex-col items-center justify-center`}
              onClick={() => handleSelectSubject(subject)}
            >
              {/* Gambar sesuai dengan mata pelajaran */}
              <img src={subjectImages[subject]} alt={subject} className="w-40 h-40 rounded-t-md"/>
              {subject}
            </div>
          </div>
        ))}
      </div>
      {selectedSubjects.length === 5 && (
        <button onClick={handleSubmit} className="bg-rose-500 text-white p-2 rounded mt-4">
          Lihat Chart
        </button>
      )}
      <p className="montserrat text-white text-lg mt-2">
        {selectedSubjects.length}/{5} Mata Pelajaran Dipilih
      </p>
    </div>
  );
};

export default SubjectSelection;
