// ==================== QUIZ DATA ====================
const quizData = [
  {
    question: "What is Vegeta's home planet called?",
    type: "multiple",
    choices: ["Planet Namek", "Planet Vegeta", "Planet Sadala", "Planet Frieza"],
    correct: 1
  },
  {
    question: "Goku can transform into Super Saiyan 3.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "Who is the first person to go Super Saiyan in over 1000 years?",
    type: "multiple",
    choices: ["Vegeta", "Gohan", "Goku", "Trunks"],
    correct: 2
  },
  {
    question: "What are the Dragon Balls collected for?",
    type: "multiple",
    choices: ["To gain immortality only", "To summon Shenron and grant wishes", "To increase power level", "To unlock transformations"],
    correct: 1
  },
  {
    question: "Piccolo is a Namekian warrior.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "Who is the primary antagonist of the Frieza Saga?",
    type: "multiple",
    choices: ["Cell", "Majin Buu", "Frieza", "Raditz"],
    correct: 2
  },
  {
    question: "What technique does Goku learn from King Kai?",
    type: "multiple",
    choices: ["Final Flash", "Special Beam Cannon", "Spirit Bomb", "Destructo Disk"],
    correct: 2
  },
  {
    question: "Gohan achieves Super Saiyan 2 while fighting Cell.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "What is the name of Goku's signature energy attack?",
    type: "multiple",
    choices: ["Kamehameha", "Galick Gun", "Final Flash", "Masenko"],
    correct: 0
  },
  {
    question: "How many Dragon Balls are there in total on Earth?",
    type: "multiple",
    choices: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "Vegeta's most powerful attack is called Final Flash.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "Who trains Gohan to become the Great Saiyaman?",
    type: "multiple",
    choices: ["Goku", "Piccolo", "Videl", "Gohan trains himself"],
    correct: 3
  },
  {
    question: "The Hyperbolic Time Chamber allows one year of training in one day.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "What is the name of Vegeta's son?",
    type: "multiple",
    choices: ["Gohan", "Goten", "Trunks", "Tarble"],
    correct: 2
  },
  {
    question: "Krillin is the strongest human Z Fighter.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "Who created the Dragon Balls?",
    type: "multiple",
    choices: ["Kami", "Dende", "King Kai", "Elder Guru"],
    correct: 0
  },
  {
    question: "Fusion using the Potara earrings is permanent.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  },
  {
    question: "What is the name of Piccolo's signature attack?",
    type: "multiple",
    choices: ["Kamehameha", "Special Beam Cannon", "Spirit Bomb", "Galick Gun"],
    correct: 1
  },
  {
    question: "What color is Super Saiyan God Goku's hair?",
    type: "multiple",
    choices: ["Golden", "Red", "Blue", "Silver"],
    correct: 1
  },
  {
    question: "Vegeta was initially sent to Earth to conquer it.",
    type: "boolean",
    choices: ["True", "False"],
    correct: 0
  }
];


// ==================== LOCAL STORAGE KEYS ====================
const STORAGE_KEYS = {
  CURRENT_QUESTION: 'quiz_current_question',
  USER_ANSWERS: 'quiz_user_answers',
  QUIZ_RESULTS: 'quiz_results',
  THEME: 'quiz_theme'
};

// ==================== THEME MANAGEMENT ====================
let currentTheme = 'light'; // default theme

function initTheme() {
  // Check for saved theme or default to light
  const savedTheme = getFromStorage(STORAGE_KEYS.THEME) || 'light';
  currentTheme = savedTheme;
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  const head = document.head;
  const existingStylesheet = document.getElementById('theme-stylesheet');
  
  // Remove existing theme stylesheet
  if (existingStylesheet) {
    existingStylesheet.remove();
  }
  
  // Add new theme stylesheet
  const link = document.createElement('link');
  link.id = 'theme-stylesheet';
  link.rel = 'stylesheet';
  
  // Handle different path contexts (main page vs subpages)
  const isSubpage = window.location.pathname.includes('/quiz/') || window.location.pathname.includes('/result/');
  const basePath = isSubpage ? '../assets/' : 'assets/';
  
  link.href = theme === 'dark' ? `${basePath}styles-dark.css` : `${basePath}styles.css`;
  head.appendChild(link);
  
  // Update background video
  const backgroundVideo = document.getElementById('backgroundVideo');
  if (backgroundVideo) {
    const source = backgroundVideo.querySelector('source');
    if (source) {
      source.src = theme === 'dark' ? `${basePath}goku-dbz.1920x1080.mp4` : `${basePath}goku.mp4`;
      backgroundVideo.load(); // Reload video with new source
    }
  }
  
  // Update coach avatar and name for dark theme
  updateCoachForTheme(theme);
  
  // Update theme button states
  updateThemeButtons(theme);
}

function updateThemeButtons(theme) {
  const lightBtn = document.getElementById('lightThemeBtn');
  const darkBtn = document.getElementById('darkThemeBtn');
  
  if (lightBtn && darkBtn) {
    lightBtn.classList.toggle('active', theme === 'light');
    darkBtn.classList.toggle('active', theme === 'dark');
  }
}

function updateCoachForTheme(theme) {
  const coachName = document.querySelector('.coach-name');
  
  if (theme === 'dark') {
    // Update coach name to Dark Goku
    if (coachName) {
      coachName.textContent = 'DARK GOKU';
    }
  } else {
    // Revert to original Vegeta theme
    if (coachName) {
      coachName.textContent = 'VEGETA';
    }
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  saveToStorage(STORAGE_KEYS.THEME, currentTheme);
}

function setTheme(theme) {
  currentTheme = theme;
  applyTheme(currentTheme);
  saveToStorage(STORAGE_KEYS.THEME, currentTheme);
}


// ==================== UTILITY FUNCTIONS ====================
function showLoading(message = 'Gathering Dragon Balls...', duration = 1500) {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingText = document.getElementById('loadingText');
  
  // Dragon Ball themed loading messages
  const dragonBallMessages = [
    'Gathering Dragon Balls...',
    'Summoning Shenron...',
    'Charging Ki Energy...',
    'Accessing Saiyan Database...',
    'Powering Up...',
    'Scanning Power Levels...',
    'Connecting to Capsule Corp...'
  ];
  
  let messageIndex = 0;
  
  if (loadingOverlay) loadingOverlay.classList.add('active');
  
  // Cycle through messages during loading
  const messageInterval = setInterval(() => {
    if (loadingText) {
      loadingText.textContent = dragonBallMessages[messageIndex];
      messageIndex = (messageIndex + 1) % dragonBallMessages.length;
    }
  }, 400);
  
  // Set initial message
  if (loadingText) loadingText.textContent = message;
  
  return new Promise(resolve => {
    setTimeout(() => {
      clearInterval(messageInterval);
      if (loadingOverlay) loadingOverlay.classList.remove('active');
      resolve();
    }, duration);
  });
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}

function getFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Failed to get from storage:', e);
    return null;
  }
}

function clearStorage() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
}


// ==================== MOBILE DETECTION & OPTIMIZATION ====================
function isMobile() {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function optimizeForMobile() {
  if (isMobile()) {
    // Reduce particle count on mobile
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index > 3) {
        particle.style.display = 'none';
      }
    });
    
    // Optimize video for mobile
    const backgroundVideo = document.getElementById('backgroundVideo');
    if (backgroundVideo) {
      backgroundVideo.setAttribute('playsinline', 'true');
      backgroundVideo.setAttribute('preload', 'metadata');
      
      // Pause video on mobile if battery is low
      if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
          if (battery.level < 0.2) {
            backgroundVideo.pause();
          }
        });
      }
    }
  }
}

// ==================== START PAGE FUNCTIONS ====================
function initStartPage() {
  const startBtn = document.getElementById('startBtn');
  const coachMessage = document.getElementById('coachMessage');
  
  // Initialize theme
  initTheme();
  
  // Optimize for mobile devices
  optimizeForMobile();
  
  // Mobile video optimization
  const backgroundVideo = document.getElementById('backgroundVideo');
  if (backgroundVideo && window.innerWidth <= 768) {
    // Reduce video quality on mobile for better performance
    backgroundVideo.setAttribute('preload', 'metadata');
    backgroundVideo.setAttribute('playsinline', 'true');
  }
  
  // Clear any previous quiz data (but keep theme)
  const savedTheme = getFromStorage(STORAGE_KEYS.THEME);
  clearStorage();
  if (savedTheme) {
    saveToStorage(STORAGE_KEYS.THEME, savedTheme);
  }
  
  // Update coach message based on theme
  if (coachMessage) {
    if (currentTheme === 'dark') {
      coachMessage.textContent = "The darkness within tests all who dare. Face your fears and prove your worth in this trial of knowledge.";
    } else {
      coachMessage.textContent = "Listen up! I'm only going to say this once. This quiz will test your knowledge. Don't disappoint me.";
    }
  }
  
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      showLoading('Initializing Training...').then(() => {
        window.location.href = 'quiz/index.html';
      });
    });
    
    // Keyboard accessibility for start page
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startBtn.click();
      } else if (event.key === 't' || event.key === 'T') {
        // Toggle theme with 'T' key
        event.preventDefault();
        toggleTheme();
        // Update coach message after theme change
        if (coachMessage) {
          if (currentTheme === 'dark') {
            coachMessage.textContent = "The darkness within tests all who dare. Face your fears and prove your worth in this trial of knowledge.";
          } else {
            coachMessage.textContent = "Listen up! I'm only going to say this once. This quiz will test your knowledge. Don't disappoint me.";
          }
        }
      }
    });
  }
}


// ==================== AUDIO MANAGEMENT ====================
let quizBackgroundMusic = null;
let victorySound = null;

function initAudio() {
  // Initialize background music for quiz based on theme
  const musicTrack = currentTheme === 'dark' 
    ? '../assets/07. Meeting of the Martial Arts Masters.mp3' 
    : '../assets/05. Bridge 2 - Mission.mp3';
    
  quizBackgroundMusic = new Audio(musicTrack);
  quizBackgroundMusic.loop = true;
  quizBackgroundMusic.volume = 0.3; // Set volume to 30%
  
  // Initialize victory sound for results (same for both themes)
  victorySound = new Audio('../assets/27. Battle Win.mp3');
  victorySound.loop = false;
  victorySound.volume = 0.5; // Set volume to 50%
}

function playQuizMusic() {
  if (quizBackgroundMusic) {
    quizBackgroundMusic.play().catch(error => {
      console.log('Audio autoplay prevented:', error);
      // Show a message to user to enable audio
      showAudioPrompt();
    });
  }
}

function stopQuizMusic() {
  if (quizBackgroundMusic) {
    quizBackgroundMusic.pause();
    quizBackgroundMusic.currentTime = 0;
  }
}

function playVictorySound() {
  if (victorySound) {
    victorySound.play().catch(error => {
      console.log('Victory sound failed to play:', error);
    });
  }
}

function showAudioPrompt() {
  // Create a subtle audio prompt
  const audioPrompt = document.createElement('div');
  audioPrompt.className = 'audio-prompt';
  audioPrompt.innerHTML = `
    <div class="audio-prompt-content">
      <span>🔊 Click to enable background music</span>
      <button class="audio-enable-btn">Enable Audio</button>
    </div>
  `;
  
  audioPrompt.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 14px;
    border: 1px solid #ff6b35;
  `;
  
  document.body.appendChild(audioPrompt);
  
  const enableBtn = audioPrompt.querySelector('.audio-enable-btn');
  enableBtn.addEventListener('click', () => {
    playQuizMusic();
    audioPrompt.remove();
  });
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (audioPrompt.parentNode) {
      audioPrompt.remove();
    }
  }, 10000);
}

// ==================== QUIZ PAGE FUNCTIONS ====================
let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);

function initQuizPage() {
  // Initialize theme first
  initTheme();
  
  // Optimize for mobile devices
  optimizeForMobile();
  
  // Initialize audio after theme is set
  initAudio();
  
  // Start background music when quiz begins
  setTimeout(() => {
    playQuizMusic();
  }, 1000); // Delay to allow page to load
  
  // Load saved progress if exists
  const savedQuestion = getFromStorage(STORAGE_KEYS.CURRENT_QUESTION);
  const savedAnswers = getFromStorage(STORAGE_KEYS.USER_ANSWERS);
  
  if (savedQuestion !== null) currentQuestionIndex = savedQuestion;
  if (savedAnswers !== null) userAnswers = savedAnswers;
  
  // Get DOM elements
  const questionNumber = document.getElementById('questionNumber');
  const questionProgress = document.getElementById('questionProgress');
  const questionText = document.getElementById('questionText');
  const choicesContainer = document.getElementById('choicesContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const coachMessage = document.getElementById('coachMessage');
  const progressDisplay = document.getElementById('progressDisplay');
  
  function renderQuestion() {
    const question = quizData[currentQuestionIndex];
    
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
    questionProgress.textContent = `${currentQuestionIndex + 1} / ${quizData.length}`;
    questionText.textContent = question.question;
    
    choicesContainer.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
      const choiceBtn = document.createElement('button');
      choiceBtn.className = 'choice-btn';
      choiceBtn.textContent = choice;
      choiceBtn.style.opacity = '0';
      choiceBtn.style.transform = 'translateX(-20px)';
      
      if (userAnswers[currentQuestionIndex] === index) {
        choiceBtn.classList.add('selected');
      }
      
      choiceBtn.addEventListener('click', () => selectAnswer(index));
      
      // Add touch support for mobile
      choiceBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        choiceBtn.style.transform = 'translateX(5px) scale(0.98)';
      });
      
      choiceBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        choiceBtn.style.transform = '';
        selectAnswer(index);
      });
      
      choicesContainer.appendChild(choiceBtn);
    });
    
    // Animate choices in
    animateChoicesIn();
    
    updateNavigationButtons();
    updateProgressDisplay();
    saveProgress();
  }
  
  function animateChoicesIn() {
    const choiceBtns = choicesContainer.querySelectorAll('.choice-btn');
    
    anime({
      targets: choiceBtns,
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 400,
      delay: anime.stagger(100),
      easing: 'easeOutQuart'
    });
  }
  
  function animateQuestionTransition(direction, callback) {
    const questionContent = document.querySelector('.question-content');
    const questionHeader = document.querySelector('.question-header');
    
    // Animate out current content
    anime({
      targets: [questionContent, questionHeader],
      opacity: [1, 0],
      translateX: direction === 'next' ? [-30, 0] : [30, 0],
      duration: 300,
      easing: 'easeInQuart',
      complete: () => {
        // Execute the callback (render new question)
        callback();
        
        // Animate in new content
        anime({
          targets: [questionContent, questionHeader],
          opacity: [0, 1],
          translateX: direction === 'next' ? [30, 0] : [-30, 0],
          duration: 400,
          easing: 'easeOutQuart'
        });
      }
    });
  }
  
  function selectAnswer(choiceIndex) {
    userAnswers[currentQuestionIndex] = choiceIndex;
    
    const choiceBtns = choicesContainer.querySelectorAll('.choice-btn');
    
    // Animate the selection
    choiceBtns.forEach((btn, index) => {
      const wasSelected = btn.classList.contains('selected');
      const isSelected = index === choiceIndex;
      
      btn.classList.toggle('selected', isSelected);
      
      if (isSelected && !wasSelected) {
        // Animate the newly selected choice
        anime({
          targets: btn,
          scale: [1, 1.02, 1],
          duration: 300,
          easing: 'easeOutElastic(1, .6)'
        });
      }
    });
    
    updateCoachMessage();
    updateNavigationButtons();
    updateProgressDisplay();
    saveProgress();
  }
  
  function updateProgressDisplay() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    if (progressDisplay) {
      const oldText = progressDisplay.textContent;
      const newText = `${answeredCount} / ${quizData.length}`;
      
      if (oldText !== newText) {
        // Animate progress update
        anime({
          targets: progressDisplay,
          scale: [1, 1.1, 1],
          color: [
            { value: '#33ffcc', duration: 200 },
            { value: '#e0e0e0', duration: 200 }
          ],
          duration: 400,
          easing: 'easeOutElastic(1, .8)',
          begin: () => {
            progressDisplay.textContent = newText;
          }
        });
      }
    }
  }
  
  function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizData.length - 1;
    
    const allAnswered = userAnswers.every(answer => answer !== null);
    submitBtn.disabled = !allAnswered;
    submitBtn.textContent = allAnswered ? 'SUBMIT QUIZ' : `SUBMIT (${userAnswers.filter(a => a !== null).length}/${quizData.length})`;
  }
  
  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex;
      currentQuestionIndex--;
      
      animateQuestionTransition('prev', () => {
        renderQuestion();
        updateCoachMessage();
      });
    }
  }
  
  function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
      const prevIndex = currentQuestionIndex;
      currentQuestionIndex++;
      
      animateQuestionTransition('next', () => {
        renderQuestion();
        updateCoachMessage();
      });
    }
  }
  
  function updateCoachMessage() {
    const lightMessages = [
      "Focus, warrior! Each question tests your knowledge.",
      "Don't disappoint me. I expect perfection.",
      "Hmph. Let's see if you really know your stuff.",
      "This better not be a waste of my time.",
      "Show me the strength of your knowledge!",
      "Pathetic hesitation shows weakness.",
      "A true Saiyan answers with confidence!",
      "Your progress... barely acceptable so far."
    ];
    
    const darkMessages = [
      "The shadows whisper... choose wisely.",
      "Darkness reveals truth. Do not falter.",
      "Your inner darkness grows with each answer.",
      "The void tests your resolve.",
      "Embrace the darkness within your knowledge.",
      "Fear clouds judgment. Rise above it.",
      "The dark path demands perfection.",
      "Shadow and light... both require mastery."
    ];
    
    const messages = currentTheme === 'dark' ? darkMessages : lightMessages;
    const answeredCount = userAnswers.filter(a => a !== null).length;
    
    if (answeredCount === 0) {
      if (currentTheme === 'dark') {
        coachMessage.textContent = "The darkness within tests all who dare. Face your fears and prove your worth in this trial of knowledge.";
      } else {
        coachMessage.textContent = "Listen up! I'm only going to say this once. This quiz will test your knowledge. Don't disappoint me.";
      }
    } else if (answeredCount < quizData.length) {
      coachMessage.textContent = messages[answeredCount % messages.length];
    } else {
      if (currentTheme === 'dark') {
        coachMessage.textContent = "All questions answered. The darkness has tested you. Now face the final judgment!";
      } else {
        coachMessage.textContent = "All questions answered. Now submit and face your judgment!";
      }
    }
    
    // Animate coach message update
    if (coachMessage) {
      anime({
        targets: coachMessage,
        scale: [1, 1.02, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  }
  
  function saveProgress() {
    saveToStorage(STORAGE_KEYS.CURRENT_QUESTION, currentQuestionIndex);
    saveToStorage(STORAGE_KEYS.USER_ANSWERS, userAnswers);
  }
  
  function submitQuiz() {
    if (userAnswers.some(answer => answer === null)) {
      alert('Complete all questions before submitting!');
      return;
    }
    
    // Stop quiz background music
    stopQuizMusic();
    
    showLoading('Calculating Power Level...', 2000).then(() => {
      // Calculate results
      let correctCount = 0;
      quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
          correctCount++;
        }
      });
      
      const percentage = Math.round((correctCount / quizData.length) * 100);
      
      // Save results to storage
      const results = {
        correctCount: correctCount,
        totalQuestions: quizData.length,
        percentage: percentage,
        userAnswers: userAnswers
      };
      
      saveToStorage(STORAGE_KEYS.QUIZ_RESULTS, results);
      
      // Navigate to results page
      window.location.href = '../result/index.html';
    });
  }
  
  // Event listeners
  prevBtn.addEventListener('click', previousQuestion);
  nextBtn.addEventListener('click', nextQuestion);
  submitBtn.addEventListener('click', submitQuiz);
  
  // Keyboard accessibility
  document.addEventListener('keydown', (event) => {
    // Prevent keyboard shortcuts if user is typing in an input field
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }
    
    switch(event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        if (!prevBtn.disabled) previousQuestion();
        break;
        
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        if (!nextBtn.disabled) nextQuestion();
        break;
        
      case '1':
        event.preventDefault();
        selectAnswerByIndex(0);
        break;
        
      case '2':
        event.preventDefault();
        selectAnswerByIndex(1);
        break;
        
      case '3':
        event.preventDefault();
        selectAnswerByIndex(2);
        break;
        
      case '4':
        event.preventDefault();
        selectAnswerByIndex(3);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!submitBtn.disabled) submitQuiz();
        break;
        
      case 'Escape':
        event.preventDefault();
        if (confirm('Are you sure you want to exit the quiz? Your progress will be saved.')) {
          stopQuizMusic();
          window.location.href = '../index.html';
        }
        break;
    }
  });
  
  // Helper function to select answer by index
  function selectAnswerByIndex(index) {
    const choiceBtns = choicesContainer.querySelectorAll('.choice-btn');
    if (choiceBtns[index]) {
      choiceBtns[index].click();
    }
  }
  
  // Initial render with animation
  anime({
    targets: ['.quiz-page .question-header', '.quiz-page .question-content'],
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600,
    delay: anime.stagger(200),
    easing: 'easeOutQuart',
    begin: () => {
      renderQuestion();
      updateCoachMessage();
    }
  });
  
  // Animate coach panel on load
  anime({
    targets: '.quiz-page .coach-panel',
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    delay: 300,
    easing: 'easeOutQuart'
  });
}


// ==================== RESULTS PAGE FUNCTIONS ====================
function initResultsPage() {
  const results = getFromStorage(STORAGE_KEYS.QUIZ_RESULTS);
  
  if (!results) {
    // No results found, redirect to start
    window.location.href = '../index.html';
    return;
  }
  
  // Initialize theme first
  initTheme();
  
  // Optimize for mobile devices
  optimizeForMobile();
  
  // Initialize audio for results page
  initAudio();
  
  // Play victory sound after a short delay
  setTimeout(() => {
    playVictorySound();
  }, 1500);
  
  const { correctCount, totalQuestions, percentage } = results;
  
  // Get DOM elements
  const finalScoreText = document.getElementById('finalScoreText');
  const rankValue = document.getElementById('rankValue');
  const powerLevel = document.getElementById('powerLevel');
  const correctCountElem = document.getElementById('correctCount');
  const incorrectCount = document.getElementById('incorrectCount');
  const correctAnswers = document.getElementById('correctAnswers');
  const resultsMessage = document.getElementById('resultsMessage');
  const auraOverlay = document.getElementById('auraOverlay');
  const progressCircle = document.getElementById('progressCircle');
  const coachMessage = document.getElementById('coachMessage');
  const retakeBtn = document.getElementById('retakeBtn');
  const characterPortrait = document.querySelector('.character-portrait');
  
  // Update score display
  if (finalScoreText) finalScoreText.textContent = `${percentage}%`;
  if (correctCountElem) correctCountElem.textContent = correctCount;
  if (incorrectCount) incorrectCount.textContent = totalQuestions - correctCount;
  if (correctAnswers) correctAnswers.textContent = `${correctCount} / ${totalQuestions} Correct`;
  
  // Animate progress circle
  if (progressCircle) {
    const circumference = 565.48;
    const offset = circumference - (percentage / 100) * circumference;
    setTimeout(() => {
      progressCircle.style.strokeDashoffset = offset;
    }, 100);
  }
  
  let rank, message, powerLevelText, auraClass, portraitImage, rankClass;
  
  // Determine rank and image based on percentage
  if (percentage === 100) {
    rank = "LEGENDARY SUPER SAIYAN";
    if (currentTheme === 'dark') {
      message = "Incredible... You have mastered both light and shadow. The darkness bows to your supreme knowledge.";
    } else {
      message = "Impossible! You've achieved perfection. Even I must acknowledge your mastery. You've earned my respect, warrior.";
    }
    powerLevelText = "OVER 9000!";
    auraClass = "platinum";
    portraitImage = "../assets/ultra.png";
    rankClass = "platinum";
  } else if (percentage >= 90) {
    rank = "ELITE SAIYAN";
    if (currentTheme === 'dark') {
      message = "Excellent. The shadows have revealed your true potential. You walk the dark path with wisdom.";
    } else {
      message = "Impressive. Your knowledge rivals that of the Saiyan elite. You've proven yourself worthy of recognition.";
    }
    powerLevelText = "8500+";
    auraClass = "gold";
    portraitImage = "../assets/Elite.png";
    rankClass = "gold";
  } else if (percentage >= 70) {
    rank = "BATTLE-HARDENED WARRIOR";
    if (currentTheme === 'dark') {
      message = "Good. You've embraced some darkness, but more shadows await your understanding.";
    } else {
      message = "Not bad. You've shown decent knowledge, though there's still room for improvement. Keep training.";
    }
    powerLevelText = "5000-8499";
    auraClass = "silver";
    portraitImage = "../assets/sec.png";
    rankClass = "silver";
  } else if (percentage >= 50) {
    rank = "LOW-CLASS WARRIOR";
    if (currentTheme === 'dark') {
      message = "Mediocre. The darkness reveals your limitations. You must delve deeper into the shadows.";
    } else {
      message = "Hmph. Mediocre at best. You know the basics, but you're nowhere near elite level. More training is required.";
    }
    powerLevelText = "2000-4999";
    auraClass = "bronze";
    portraitImage = "../assets/basic.png";
    rankClass = "bronze";
  } else {
    rank = "WEAKLING";
    if (currentTheme === 'dark') {
      message = "Pathetic! Even the darkness rejects your feeble understanding. Return when you're worthy of shadow training.";
    } else {
      message = "Pathetic! Your knowledge is an embarrassment. Go back and study before wasting my time again!";
    }
    powerLevelText = "Below 2000";
    auraClass = "bronze";
    portraitImage = "../assets/noob.png";
    rankClass = "bronze";
  }
  
  // Update text content
  if (rankValue) rankValue.textContent = rank;
  if (powerLevel) powerLevel.textContent = `Power Level: ${powerLevelText}`;
  if (resultsMessage) resultsMessage.textContent = message;
  if (coachMessage) coachMessage.textContent = message;
  if (auraOverlay) {
    auraOverlay.className = 'aura-overlay ' + auraClass;
  }
  
  // Update character portrait with dynamic image
  if (characterPortrait) {
    // Add rank class to portrait container for border styling
    characterPortrait.setAttribute('data-rank', rankClass);
    
    // Clear existing content
    characterPortrait.innerHTML = '';
    
    // Create image element
    const img = document.createElement('img');
    img.src = portraitImage;
    img.alt = `Vegeta - ${rank}`;
    img.className = 'portrait-image';
    
    // Handle image load error - fallback to placeholder
    img.onerror = function () {
      characterPortrait.innerHTML = `<div class="portrait-placeholder">🧑‍🚀<br>${rank}</div>`;
    };
    
    // Append image to portrait container
    characterPortrait.appendChild(img);
  }
  
  // Setup retake button
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      clearStorage();
      showLoading('Resetting Challenge...').then(() => {
        window.location.href = '../index.html';
      });
    });
  }
  
  // Keyboard accessibility for results page
  document.addEventListener('keydown', (event) => {
    switch(event.key) {
      case 'r':
      case 'R':
      case 'Enter':
        event.preventDefault();
        if (retakeBtn) retakeBtn.click();
        break;
        
      case 'Escape':
        event.preventDefault();
        window.location.href = '../index.html';
        break;
    }
  });
  
  // Animate coach panel on results page load
  anime({
    targets: '.results-page .coach-panel',
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 600,
    delay: 500,
    easing: 'easeOutQuart'
  });
  
  // Animate coach message
  if (coachMessage) {
    anime({
      targets: '.results-page .coach-message',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      delay: 800,
      easing: 'easeOutQuart'
    });
  }
}


// ==================== INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('quiz/index.html')) {
    initQuizPage();
  } else if (path.includes('result/index.html')) {
    initResultsPage();
  } else {
    initStartPage();
  }
});

// Cleanup audio when page unloads
window.addEventListener('beforeunload', () => {
  if (quizBackgroundMusic) {
    stopQuizMusic();
  }
});
