import { Groq } from "groq-sdk";

// Configuration
const CONFIG = {
  MODEL: "llama3-70b-8192",
  TEMPERATURE: 0.7,
  MAX_TOKENS: 2048,
  CATEGORIES: ["Matematika", "Sains", "Bahasa Indonesia", "Sejarah"]
};

// Greeting templates
const GREETINGS = [
  "Hai! Saya MateAI, siap membantumu belajar",
  "Halo! MateAI di sini, senang bisa membantu",
  "Selamat datang! Saya MateAI, asisten belajarmu",
  "Hai teman! MateAI siap menemani belajarmu",
  "Halo! Bersama MateAI, belajar jadi lebih menyenangkan",
  "Salam! MateAI hadir untuk membantu proses belajarmu",
  "Hai! Mari belajar bersama MateAI",
  "Selamat datang di sesi belajar bersama MateAI"
];

// System prompts
const SYSTEM_PROMPTS = {
  classifier: `Anda adalah MateAI, asisten klasifikasi yang ramah dan helpful. 
Kategorikan pertanyaan berikut ke dalam salah satu kategori ini: 
${CONFIG.CATEGORIES.join(', ')}. 
Hanya berikan nama kategorinya saja.`,

  responder: (category) => `Anda adalah MateAI, asisten pendidikan yang ramah dan antusias.

Panduan format respons:
- Gunakan paragraf pendek (2-3 kalimat) untuk kemudahan membaca
- Berikan baris kosong antara setiap bagian berbeda
- Gunakan indentasi untuk sub-poin
- Pisahkan contoh dalam paragraf tersendiri

Panduan konten untuk ${category}:
- Jelaskan konsep secara bertahap dan terstruktur
- Gunakan bahasa yang jelas dan mudah dipahami
- Berikan contoh konkret yang relevan
- Akhiri dengan rangkuman atau pertanyaan reflektif

Panduan kepribadian:
- Gunakan bahasa yang ramah namun tetap edukatif
- Tunjukkan antusiasme dalam menjelaskan
- Berikan dorongan positif
- Ajak pengguna untuk berpikir kritis`
};

// Initialize Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API,
  dangerouslyAllowBrowser: true,
});

/**
 * Format response text for better readability
 * @param {string} text - Raw response text
 * @returns {string} Formatted text
 */
const formatResponse = (text) => {
  // Split text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  const formattedParagraphs = [];
  let currentParagraph = [];
  
  // Keywords that indicate new sections
  const sectionKeywords = [
    'pertama', 'kedua', 'ketiga', 'selanjutnya', 'kemudian', 'akhirnya',
    'contoh:', 'misalnya:', 'kesimpulan:', 'rangkuman:'
  ];
  
  sentences.forEach((sentence, index) => {
    const sentenceLower = sentence.toLowerCase().trim();
    
    // Check for new section indicators
    const isNewSection = sectionKeywords.some(keyword => 
      sentenceLower.includes(keyword)
    );
    
    // Check for list items
    const isList = /^[-*•]|\d+\./.test(sentence.trim());
    
    // Start new paragraph on section breaks or lists
    if (isNewSection || isList) {
      if (currentParagraph.length > 0) {
        formattedParagraphs.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
      
      // Add extra spacing for lists
      if (isList && formattedParagraphs.length > 0) {
        formattedParagraphs.push('');
      }
    }
    
    currentParagraph.push(sentence.trim());
    
    // Create new paragraph after 2-3 related sentences
    if (currentParagraph.length >= 3 || index === sentences.length - 1) {
      if (currentParagraph.length > 0) {
        formattedParagraphs.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
    }
  });

  // Join paragraphs with double newline and remove empty ones
  return formattedParagraphs
    .filter(p => p.trim().length > 0)
    .join('\n\n');
};

/**
 * Get random greeting message
 * @returns {string} Random greeting
 */
const getRandomGreeting = () => {
  const index = Math.floor(Math.random() * GREETINGS.length);
  return GREETINGS[index];
};

/**
 * Check if message is a greeting
 * @param {string} message - User message
 * @returns {boolean} True if message is a greeting
 */
const isGreetingMessage = (message) => {
  const greetingWords = ['halo', 'hai', 'hi', 'selamat'];
  return greetingWords.some(word => 
    message.toLowerCase().includes(word)
  );
};

/**
 * Classify question into category
 * @param {string} question - User question
 * @returns {Promise<string>} Question category
 */
export const classifyQuestion = async (question) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.classifier
        },
        {
          role: "user",
          content: question
        }
      ],
      model: CONFIG.MODEL,
      temperature: CONFIG.TEMPERATURE,
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error dalam mengklasifikasikan pertanyaan:", error);
    return "Tidak Diketahui";
  }
};

/**
 * Get AI response for user question
 * @param {string} content - User question
 * @param {string} category - Question category
 * @returns {Promise<Object>} Response content and category
 */
export const requestToGroq = async (content, category) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.responder(category)
        },
        {
          role: "user",
          content,
        },
      ],
      model: CONFIG.MODEL,
      temperature: CONFIG.TEMPERATURE,
      max_tokens: CONFIG.MAX_TOKENS,
    });

    let finalContent = response.choices[0].message.content;
    
    // Add greeting for new conversations
    if (isGreetingMessage(content) && 
        !finalContent.toLowerCase().includes('mateai')) {
      finalContent = `${getRandomGreeting()}\n\n${finalContent}`;
    }

    // Format response
    finalContent = formatResponse(finalContent);

    return {
      content: finalContent,
      category: category
    };
  } catch (error) {
    console.error("Error dalam mengambil respons:", error);
    throw error;
  }
};

/**
 * Save question data to local storage
 * @param {string} question - User question
 * @param {string} category - Question category
 */
export const saveQuestionData = (question, category) => {
  try {
    const questionData = {
      question,
      category,
      timestamp: new Date().toISOString()
    };
    
    const existingData = JSON.parse(
      localStorage.getItem('questionHistory') || '[]'
    );
    
    existingData.push(questionData);
    
    localStorage.setItem(
      'questionHistory', 
      JSON.stringify(existingData)
    );
  } catch (error) {
    console.error("Error menyimpan data pertanyaan:", error);
  }
};