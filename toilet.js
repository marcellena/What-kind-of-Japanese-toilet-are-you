  // Quiz data
  const quizData = [
    {
      question: "みどりのゆびがありますか。",
      answers: [
        { text: "はいはい", トイレ: "自然" },
        { text: "まあまあ", トイレ: "お金をもらっているトイレ" },
        { text: "いいえ全然じゃない", トイレ: "新しい和式トイレ" },
      ]
    },
    {
      question: "猫と犬とどちらの方がもっと好きですか",
      answers: [
        { text: "もちろん猫", トイレ: "お金をもらっているトイレ" },
        { text: "犬", トイレ: "自然" },
        { text: "間違う、かめ", トイレ: "新しい和式トイレ" },
      ]
    },
    {
      question: "ひざが悪いですか。",
      answers: [
        { text: "いいえ、とても強い", トイレ: "お金をもらっているトイレ" },
        { text: "はい、大変ですね。", トイレ: "新しい和式トイレ" },
        { text: "大丈夫", トイレ: "自然" },
      ]
    },
    {
      question: "よく寒いですか。",
      answers: [
        { text: "いつも", トイレ: "新しい和式トイレ" },
        { text: "いいえ、寒くない", トイレ: "お金をもらっているトイレ" },
        { text: "ときどき", トイレ: "自然" },
      ]
    },
    {
      question: "キャンプが好きですか。",
      answers: [
        { text: "いいえ", トイレ: "お金をもらっているトイレ" },
        { text: "はい", トイレ: "自然" },
        { text: "ときどき", トイレ: "新しい和式トイレ" },
      ]
    },
    {
      question: "草のアレルギーがありますか。",
      answers: [
        { text: "ハクション、はい", トイレ: "新しい和式トイレ" },
        { text: "いいえ、草と私は友達", トイレ: "自然" },
        { text: "分からない、外に行きません", トイレ: "お金をもらっているトイレ" },
      ]
    },
    {
      question: "毎日何時間ぐらいトイレにいますか",
      answers: [
        { text: "たぶん1時間", トイレ: "お金をもらっているトイレ" },
        { text: "3時間以上", トイレ: "新しい和式トイレ" },
        { text: "30分ぐらい", トイレ: "自然" },
      ]
    }, 
  ];

  const answersTally = {};
  const quizContainer = document.getElementById('quiz');
  const userAnswers = {};

  // Display the quiz
  function showQuiz() {
    quizData.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `<h3>${q.question}</h3>`;

      q.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.onclick = () => {
          selectAnswer(index, answer.トイレ);
          const buttons = questionDiv.querySelectorAll('button');
          buttons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        } 
        questionDiv.appendChild(button);
      });

      quizContainer.appendChild(questionDiv);
    });
  }

  // Record the answer
  function selectAnswer(questionIndex, トイレ) {
    userAnswers[questionIndex] = トイレ;
  }

  // Calculate and show result
  document.getElementById('submit').addEventListener('click', function() {
    // Tally up answers
    for (let key in userAnswers) {
      const トイレ = userAnswers[key];
      if (!answersTally[トイレ]) {
        answersTally[トイレ] = 0;
      }
      answersTally[トイレ]++;
    }

    // Find highest score
    let highestScore = 0;
    let tiedAnimals = [];
    for (let トイレ in answersTally) {
      if (answersTally[トイレ] > highestScore) {
        highestScore = answersTally[トイレ];
        tiedAnimals = [トイレ]; // New highest, reset list
      } else if (answersTally[トイレ] === highestScore) {
        tiedAnimals.push(トイレ); // Same highest, add to list
      }
    }

    // Randomly pick if tie
    const resultAnimal = tiedAnimals[Math.floor(Math.random() * tiedAnimals.length)];

    document.getElementById('result').innerText = `You are a ${resultAnimal}!`;
  });

  // Initialize
  showQuiz();