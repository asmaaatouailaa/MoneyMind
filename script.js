document.addEventListener('DOMContentLoaded', function() {
    const posters = [
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZrcW5lM3BtbWFjcHR2ZzBjNnIxYThnYnhnZXZ6ZDd4eWN4OWI5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tJwQ1NktT6Dg3pjcXa/giphy.gif',
        'https://media.giphy.com/media/oHmeFa2PtwGLN4iraw/giphy.gif',
        'https://media.giphy.com/media/jncY6fkhNA1ONngg91/giphy.gif',
        'https://media.giphy.com/media/jncY6fkhNA1ONngg91/giphy.gif'
    ];

    const posterContainer = document.querySelector('.poster-container');

    posters.forEach((poster, index) => {
        const posterElement = document.createElement('div');
        posterElement.className = 'poster';
        posterElement.style.backgroundImage = `url('${poster}')`;
        posterContainer.appendChild(posterElement);
        
        if (index === 0) {
            posterElement.classList.add('active');
        } else {
            setTimeout(() => {
                document.querySelector('.poster.active').classList.remove('active');
                posterElement.classList.add('active');
                
                if (index === posters.length - 1) {
                    setTimeout(() => {
                        posterElement.classList.remove('active');
                        document.querySelector('.poster').classList.add('active');
                    }, 3000);
                }
            }, index * 3000);
        }
    });


    const quizData = [
        {
            question: "What is the primary purpose of a budget?",
            options: [
                "To restrict spending completely",
                "To track income and expenses",
                "To impress your friends",
                "To make more money"
            ],
            answer: 1
        },
        {
            question: "What does 'APR' stand for?",
            options: [
                "Annual Percentage Rate",
                "Average Payment Ratio",
                "Automatic Payment Reminder",
                "Applied Principal Return"
            ],
            answer: 0
        },
        {
            question: "Which of these is NOT a type of investment?",
            options: [
                "Stocks",
                "Bonds",
                "Mutual Funds",
                "Credit Cards"
            ],
            answer: 3
        }
    ];

    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const currentQuestion = document.getElementById('current-question');
    const totalQuestions = document.getElementById('total-questions');
    const nextQuestionBtn = document.getElementById('next-question');
    const quizResults = document.getElementById('quiz-results');
    const starRating = document.getElementById('star-rating');
    const quizScore = document.getElementById('quiz-score');
    const retakeQuiz = document.getElementById('retake-quiz');
    
    let currentQuizIndex = 0;
    let score = 0;
    
    totalQuestions.textContent = quizData.length;
    
    function loadQuestion() {
        const question = quizData[currentQuizIndex];
        quizQuestion.textContent = question.question;
        quizOptions.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(index));
            quizOptions.appendChild(optionElement);
        });
        
        currentQuestion.textContent = currentQuizIndex + 1;
        nextQuestionBtn.style.display = 'none';
        quizFeedback.textContent = '';
    }

    function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.innerText = message; // Set the message dynamically
        notification.classList.add("show");

        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    // Show notification when next question is clicked
    document.getElementById('next-question').addEventListener('click', function() {
        showNotification('You moved to the next question!');
    });

    function selectAnswer(selectedIndex) {
        const question = quizData[currentQuizIndex];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        if (selectedIndex === question.answer) {
            showNotification("Correct answer!", "success");
            quizFeedback.textContent = 'Correct!';
            quizFeedback.style.color = 'green';
            score++;
        } else {
            showNotification("Oops! That was incorrect.", "error");
            quizFeedback.textContent = `Incorrect! The correct answer is: ${question.options[question.answer]}`;
            quizFeedback.style.color = 'red';
            options[selectedIndex].style.backgroundColor = 'var(--danger)';
        }
       
        
        
        
        options[question.answer].style.backgroundColor = 'var(--success)';
        nextQuestionBtn.style.display = 'block';
    }
    
    function showResults() {
        quizQuestion.style.display = 'none';
        quizOptions.style.display = 'none';
        quizFeedback.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        quizResults.style.display = 'block';
        
        const percentage = (score / quizData.length) * 100;
        quizScore.textContent = `${score}/${quizData.length}`;
        
        const stars = Math.ceil(percentage / 20);
        starRating.innerHTML = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    }
    
    nextQuestionBtn.addEventListener('click', () => {
        currentQuizIndex++;
        if (currentQuizIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });
    
    retakeQuiz.addEventListener('click', () => {
        currentQuizIndex = 0;
        score = 0;
        quizQuestion.style.display = 'block';
        quizOptions.style.display = 'grid';
        quizFeedback.style.display = 'block';
        quizResults.style.display = 'none';
        loadQuestion();
    });
    
    loadQuestion();

    const taxRate = document.getElementById('tax-rate');
    const interestRate = document.getElementById('interest-rate');
    const spending = document.getElementById('spending');
    const runSimulation = document.getElementById('run-simulation');
    const gdpValue = document.getElementById('gdp-value');
    const unemploymentValue = document.getElementById('unemployment-value');
    const inflationValue = document.getElementById('inflation-value');
    const tradeValue = document.getElementById('trade-value');
    const economicChart = document.getElementById('economic-chart');
    
    taxRate.addEventListener('input', () => {
        document.querySelector('.value-display').textContent = `${taxRate.value}%`;
    });
    
    interestRate.addEventListener('input', () => {
        document.querySelectorAll('.value-display')[1].textContent = `${interestRate.value}%`;
    });
    
    spending.addEventListener('input', () => {
        document.querySelectorAll('.value-display')[2].textContent = `$${spending.value}T`;
    });
    
    const ctx = economicChart.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [
                {
                    label: 'GDP Growth',
                    data: [2.0, 2.1, 2.2, 2.3, 2.4],
                    borderColor: '#4cc9f0',
                    backgroundColor: 'rgba(76, 201, 240, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Unemployment',
                    data: [5.5, 5.4, 5.3, 5.2, 5.1],
                    borderColor: '#ef233c',
                    backgroundColor: 'rgba(239, 35, 60, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    
    runSimulation.addEventListener('click', () => {
        const tax = parseFloat(taxRate.value);
        const interest = parseFloat(interestRate.value);
        const govSpending = parseFloat(spending.value);
        
        const gdpImpact = 2.5 - (tax * 0.02) + (govSpending * 0.3) - (interest * 0.1);
        const unemploymentImpact = 5.5 + (tax * 0.03) - (govSpending * 0.2) + (interest * 0.15);
        const inflationImpact = 2.0 + (tax * 0.01) + (govSpending * 0.15) + (interest * 0.05);
        const tradeImpact = -42 - (tax * 0.5) - (govSpending * 5) + (interest * 2);
        
        gdpValue.textContent = `${gdpImpact.toFixed(1)}%`;
        unemploymentValue.textContent = `${unemploymentImpact.toFixed(1)}%`;
        inflationValue.textContent = `${inflationImpact.toFixed(1)}%`;
        tradeValue.textContent = `$${tradeImpact.toFixed(1)}B`;
        
        chart.data.datasets[0].data = [
            gdpImpact,
            gdpImpact + 0.1,
            gdpImpact + 0.2,
            gdpImpact + 0.3,
            gdpImpact + 0.4
        ];
        
        chart.data.datasets[1].data = [
            unemploymentImpact,
            unemploymentImpact - 0.1,
            unemploymentImpact - 0.2,
            unemploymentImpact - 0.3,
            unemploymentImpact - 0.4
        ];
        
        chart.update();
        
        gdpValue.className = gdpImpact >= 2.0 ? 'metric-value positive' : 'metric-value negative';
        unemploymentValue.className = unemploymentImpact <= 5.5 ? 'metric-value positive' : 'metric-value negative';
        inflationValue.className = inflationImpact <= 3.0 ? 'metric-value positive' : inflationImpact <= 4.0 ? 'metric-value warning' : 'metric-value negative';
    });

 
    const debtAmount = document.getElementById('debt-amount');
    const debtInterestRate = document.getElementById('debt-interest-rate');
    const paymentPeriod = document.getElementById('payment-period');
    const calculateDebt = document.getElementById('calculate-debt');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalInterest = document.getElementById('total-interest');
    const totalPayment = document.getElementById('total-payment');
    
    calculateDebt.addEventListener('click', () => {
        const principal = parseFloat(debtAmount.value);
        const annualRate = parseFloat(debtInterestRate.value) / 100;
        const years = parseFloat(paymentPeriod.value);
        
        const monthlyRate = annualRate / 12;
        const payments = years * 12;
        const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
        
        const total = monthly * payments;
        const interest = total - principal;
        
        monthlyPayment.textContent = `$${monthly.toFixed(2)}`;
        totalInterest.textContent = `$${interest.toFixed(2)}`;
        totalPayment.textContent = `$${total.toFixed(2)}`;
    });
    
    calculateDebt.click();

 
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    chatToggle.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    });
    
    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            chatInput.value = '';
            
            setTimeout(() => {
                const responses = [
                    "Hello! Want to share your financial experience with us?",
                    "That's a great financial question!",
                    "For debt repayment, I suggest focusing on high-interest debts first."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot-message');
            }, 1000);
        }
    }
    
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    setTimeout(() => {
        addMessage("Hello! I'm your financial assistant. How can I help you today?", 'bot-message');
    }, 1000);

   
    const budgetForm = document.getElementById('budget-form');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expensesList = document.getElementById('expenses-list');
    const budgetResults = document.getElementById('budget-results');

    let expenseCount = 1;

    addExpenseBtn.addEventListener('click', () => {
        expenseCount++;
        const newExpenseName = document.createElement('input');
        newExpenseName.type = 'text';
        newExpenseName.placeholder = `Expense name #${expenseCount}`;
        newExpenseName.classList.add('expense-name');
        
        const newExpenseAmount = document.createElement('input');
        newExpenseAmount.type = 'number';
        newExpenseAmount.placeholder = 'Amount';
        newExpenseAmount.classList.add('expense-amount');

        expensesList.appendChild(newExpenseName);
        expensesList.appendChild(newExpenseAmount);
    });

    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const income = parseFloat(document.getElementById('income').value) || 0;
        const expenseNames = document.querySelectorAll('.expense-name');
        const expenseAmounts = document.querySelectorAll('.expense-amount');

        let totalExpenses = 0;
        let expenseData = [];
        let expenseLabels = [];

        expenseNames.forEach((nameField, index) => {
            const name = nameField.value.trim() || `Expense ${index + 1}`;
            const amount = parseFloat(expenseAmounts[index].value) || 0;

            if (amount > 0) {
                totalExpenses += amount;
                expenseData.push(amount);
                expenseLabels.push(name);
            }
        });

        const remainingBalance = income - totalExpenses;

        budgetResults.style.display = 'block';
        budgetResults.innerHTML = `
            <h3>Calculating your budget...</h3>
            <p>Please wait while we prepare your insights!</p>
        `;

        setTimeout(() => {
            displayResults(totalExpenses, remainingBalance, expenseLabels, expenseData);
        }, 1000);
    });

    function displayResults(totalExpenses, remainingBalance, labels, data) {
        budgetResults.innerHTML = `
            <h3>Total Expenses: <span>${totalExpenses.toFixed(2)} USD</span></h3>
            <h3>Remaining Balance: <span>${remainingBalance.toFixed(2)} USD</span></h3>
            <div id="budget-charts">
                <div id="pie-chart"></div>
                <div id="bar-chart"></div>
            </div>
        `;

        renderCharts(labels, data);
    }

    function renderCharts(labels, data) {
        const colors = ['#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff'];

        const pieData = [{
            values: data,
            labels: labels,
            type: 'pie',
            marker: { colors: colors }
        }];

        const pieLayout = {
            title: 'Expense Breakdown',
            paper_bgcolor: '#f8fafc'
        };

        Plotly.newPlot('pie-chart', pieData, pieLayout);

        const barData = [{
            x: labels,
            y: data,
            type: 'bar',
            marker: { color: '#3b82f6' }
        }];

        const barLayout = {
            title: 'Expenses by Category',
            paper_bgcolor: '#f8fafc',
            plot_bgcolor: '#f8fafc'
        };

        Plotly.newPlot('bar-chart', barData, barLayout);
    }
});


document.addEventListener('DOMContentLoaded', function() {

  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
    
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  const categoryBtns = document.querySelectorAll('.category-btn');
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      document.querySelectorAll('.faq-category').forEach(cat => {
        cat.style.display = 'none';
      });
      document.getElementById(`${category}-category`).style.display = 'block';
    });
  });
  
  document.getElementById('general-category').style.display = 'block';
});

