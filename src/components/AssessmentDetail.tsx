import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Award, RotateCcw, ArrowRight, ArrowLeft, AlertCircle, Download, Share2 } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  passingScore: number;
  questions: Question[];
  category: string;
  level: string;
  badge: string;
}

interface AssessmentResult {
  id: string;
  assessmentId: string;
  title: string;
  score: number;
  maxScore: number;
  completedDate: string;
  status: 'passed' | 'failed';
  percentile: number;
  badge: string | null;
  timeSpent: string;
  correctAnswers: number;
  totalQuestions: number;
  certificateId: string | null;
  difficulty: string;
}

const AssessmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Sample assessments data
  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals Assessment',
      description: 'Test your understanding of JavaScript basics including variables, functions, and ES6 features',
      duration: 30,
      passingScore: 70,
      category: 'programming',
      level: 'beginner',
      badge: 'JavaScript Foundation',
      questions: [
        {
          id: 1,
          question: "What is the correct way to declare a variable in JavaScript ES6?",
          options: [
            "var myVariable = 'value';",
            "let myVariable = 'value';",
            "const myVariable = 'value';",
            "Both let and const are correct"
          ],
          correctAnswer: 3,
          explanation: "Both 'let' and 'const' are ES6 ways to declare variables. 'let' for variables that can be reassigned, 'const' for constants.",
          difficulty: 'easy',
          category: 'Variables'
        },
        {
          id: 2,
          question: "What will be the output of: console.log(typeof null);",
          options: [
            "'null'",
            "'undefined'",
            "'object'",
            "'boolean'"
          ],
          correctAnswer: 2,
          explanation: "This is a well-known JavaScript quirk. typeof null returns 'object', which is considered a bug in the language but maintained for backward compatibility.",
          difficulty: 'medium',
          category: 'Data Types'
        },
        {
          id: 3,
          question: "Which method is used to add an element to the end of an array?",
          options: [
            "array.add()",
            "array.push()",
            "array.append()",
            "array.insert()"
          ],
          correctAnswer: 1,
          explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
          difficulty: 'easy',
          category: 'Arrays'
        },
        {
          id: 4,
          question: "What is a closure in JavaScript?",
          options: [
            "A way to close the browser window",
            "A function that has access to variables in its outer scope",
            "A method to end a loop",
            "A type of error handling"
          ],
          correctAnswer: 1,
          explanation: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
          difficulty: 'hard',
          category: 'Functions'
        },
        {
          id: 5,
          question: "What does the '===' operator do in JavaScript?",
          options: [
            "Assigns a value to a variable",
            "Compares values with type coercion",
            "Compares values without type coercion (strict equality)",
            "Performs mathematical addition"
          ],
          correctAnswer: 2,
          explanation: "The '===' operator performs strict equality comparison without type coercion, meaning both value and type must be the same.",
          difficulty: 'medium',
          category: 'Operators'
        }
      ]
    },
    {
      id: '2',
      title: 'React Advanced Patterns',
      description: 'Advanced React concepts including hooks, context, performance optimization, and design patterns',
      duration: 45,
      passingScore: 75,
      category: 'programming',
      level: 'advanced',
      badge: 'React Expert',
      questions: [
        {
          id: 1,
          question: "What is the purpose of React.memo()?",
          options: [
            "To memorize component state",
            "To prevent unnecessary re-renders of functional components",
            "To store data in local storage",
            "To create memory leaks"
          ],
          correctAnswer: 1,
          explanation: "React.memo() is a higher-order component that prevents unnecessary re-renders by memoizing the component and only re-rendering when props change.",
          difficulty: 'medium',
          category: 'Performance'
        },
        {
          id: 2,
          question: "When should you use useCallback hook?",
          options: [
            "Always when defining functions in components",
            "When you want to memoize a function to prevent unnecessary re-renders",
            "To handle API calls",
            "To manage component state"
          ],
          correctAnswer: 1,
          explanation: "useCallback should be used to memoize functions when they are passed as props to child components or used as dependencies in other hooks.",
          difficulty: 'hard',
          category: 'Hooks'
        },
        {
          id: 3,
          question: "What is the difference between useEffect and useLayoutEffect?",
          options: [
            "There is no difference",
            "useLayoutEffect runs synchronously after all DOM mutations",
            "useEffect runs before DOM mutations",
            "useLayoutEffect is deprecated"
          ],
          correctAnswer: 1,
          explanation: "useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, while useEffect runs asynchronously after the paint.",
          difficulty: 'hard',
          category: 'Hooks'
        },
        {
          id: 4,
          question: "What is the Context API used for?",
          options: [
            "Making HTTP requests",
            "Managing global state and avoiding prop drilling",
            "Handling form validation",
            "Creating animations"
          ],
          correctAnswer: 1,
          explanation: "The Context API is used to share data between components without having to pass props down manually at every level (prop drilling).",
          difficulty: 'medium',
          category: 'State Management'
        },
        {
          id: 5,
          question: "What is a custom hook in React?",
          options: [
            "A built-in React hook",
            "A JavaScript function that starts with 'use' and can call other hooks",
            "A CSS styling technique",
            "A way to handle errors"
          ],
          correctAnswer: 1,
          explanation: "A custom hook is a JavaScript function whose name starts with 'use' and that may call other hooks. It allows you to extract component logic into reusable functions.",
          difficulty: 'medium',
          category: 'Hooks'
        }
      ]
    },
    {
      id: '3',
      title: 'Data Science Fundamentals',
      description: 'Assess your knowledge of statistics, data analysis, and machine learning basics',
      duration: 60,
      passingScore: 70,
      category: 'data-science',
      level: 'intermediate',
      badge: 'Data Analyst',
      questions: [
        {
          id: 1,
          question: "What is the difference between supervised and unsupervised learning?",
          options: [
            "Supervised learning uses labeled data, unsupervised learning uses unlabeled data",
            "Supervised learning is faster than unsupervised learning",
            "There is no difference",
            "Unsupervised learning is more accurate"
          ],
          correctAnswer: 0,
          explanation: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs, while unsupervised learning finds patterns in data without labeled examples.",
          difficulty: 'medium',
          category: 'Machine Learning'
        },
        {
          id: 2,
          question: "What does a p-value represent in statistical testing?",
          options: [
            "The probability that the null hypothesis is true",
            "The probability of observing the data given that the null hypothesis is true",
            "The probability that the alternative hypothesis is true",
            "The confidence level of the test"
          ],
          correctAnswer: 1,
          explanation: "A p-value is the probability of observing the test results (or more extreme) given that the null hypothesis is true.",
          difficulty: 'hard',
          category: 'Statistics'
        },
        {
          id: 3,
          question: "Which Python library is most commonly used for data manipulation?",
          options: [
            "NumPy",
            "Matplotlib",
            "Pandas",
            "Scikit-learn"
          ],
          correctAnswer: 2,
          explanation: "Pandas is the most commonly used Python library for data manipulation and analysis, providing data structures like DataFrames.",
          difficulty: 'easy',
          category: 'Tools'
        },
        {
          id: 4,
          question: "What is overfitting in machine learning?",
          options: [
            "When a model performs well on training data but poorly on new data",
            "When a model is too simple",
            "When there's too much training data",
            "When the model trains too quickly"
          ],
          correctAnswer: 0,
          explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, resulting in poor generalization to new data.",
          difficulty: 'medium',
          category: 'Machine Learning'
        },
        {
          id: 5,
          question: "What is the purpose of cross-validation?",
          options: [
            "To increase the size of the dataset",
            "To evaluate model performance and reduce overfitting",
            "To clean the data",
            "To visualize the data"
          ],
          correctAnswer: 1,
          explanation: "Cross-validation is used to evaluate how well a model will generalize to new data by training and testing on different subsets of the data.",
          difficulty: 'medium',
          category: 'Model Evaluation'
        }
      ]
    }
  ];

  useEffect(() => {
    const foundAssessment = assessments.find(a => a.id === id);
    if (foundAssessment) {
      setAssessment(foundAssessment);
      setTimeLeft(foundAssessment.duration * 60); // Convert to seconds
    }
  }, [id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (assessmentStarted && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && assessmentStarted) {
      setShowResults(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, assessmentStarted, showResults]);

  if (!assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Assessment not found</h1>
          <button 
            onClick={() => navigate('/skill-assessment')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Assessments
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    assessment.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / assessment.questions.length) * 100);
  };

  const saveAssessmentResult = (score: number, passed: boolean) => {
    const correctAnswers = selectedAnswers.filter((answer, index) => answer === assessment.questions[index].correctAnswer).length;
    const timeSpent = formatTime((assessment.duration * 60) - timeLeft);
    
    const result: AssessmentResult = {
      id: Date.now().toString(),
      assessmentId: assessment.id,
      title: assessment.title,
      score,
      maxScore: 100,
      completedDate: new Date().toISOString(),
      status: passed ? 'passed' : 'failed',
      percentile: Math.floor(Math.random() * 30) + (passed ? 70 : 20), // Simulated percentile
      badge: passed ? assessment.badge : null,
      timeSpent,
      correctAnswers,
      totalQuestions: assessment.questions.length,
      certificateId: passed ? `CERT-${assessment.id}-${Date.now()}` : null,
      difficulty: assessment.level
    };

    setAssessmentResult(result);
    
    // In a real app, this would be saved to a database
    console.log('Assessment result saved:', result);
  };

  const generateCertificate = () => {
    if (!assessmentResult) return;
    
    setShowCertificate(true);
  };

  const downloadCertificate = () => {
    // In a real app, this would generate and download a PDF certificate
    alert('Certificate downloaded successfully!');
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeLeft(assessment.duration * 60);
    setAssessmentStarted(false);
    setShowCertificate(false);
    setAssessmentResult(null);
  };

  if (showCertificate && assessmentResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Certificate Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Achievement</h1>
            <p className="text-gray-600">This certifies that</p>
          </div>

          {/* Certificate Body */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-2 border-blue-200">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">John Doe</h2>
              <p className="text-lg text-gray-700 mb-6">has successfully completed the</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{assessmentResult.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{assessmentResult.score}%</div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{assessmentResult.percentile}th</div>
                  <div className="text-sm text-gray-600">Percentile</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{assessmentResult.badge}</div>
                  <div className="text-sm text-gray-600">Badge Earned</div>
                </div>
              </div>

              <div className="border-t border-blue-200 pt-6">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    <p>Certificate ID: <span className="font-mono">{assessmentResult.certificateId}</span></p>
                    <p>Issued: {new Date(assessmentResult.completedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p>Hexaware Learning Platform</p>
                    <p>Digital Certificate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Actions */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={downloadCertificate}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Certificate</span>
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Share on LinkedIn</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              View in Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <button 
            onClick={() => navigate('/skill-assessment')}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assessments
          </button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{assessment.title}</h1>
            <p className="text-gray-600 mb-6">{assessment.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{assessment.questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{assessment.duration}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{assessment.passingScore}%</div>
                <div className="text-sm text-gray-600">Pass Score</div>
              </div>
            </div>

            <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Assessment Instructions:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• You have {assessment.duration} minutes to complete all questions</li>
                <li>• Each question has only one correct answer</li>
                <li>• You can navigate between questions freely</li>
                <li>• Your progress is automatically saved</li>
                <li>• You need {assessment.passingScore}% to pass and earn the "{assessment.badge}" badge</li>
                <li>• Upon successful completion, you'll receive a digital certificate</li>
                <li>• Make sure you have a stable internet connection</li>
              </ul>
            </div>

            <button
              onClick={() => setAssessmentStarted(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= assessment.passingScore;
    const correctAnswers = selectedAnswers.filter((answer, index) => answer === assessment.questions[index].correctAnswer).length;

    // Save the result when showing results for the first time
    if (!assessmentResult) {
      saveAssessmentResult(score, passed);
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
            <p className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? `Congratulations! You earned the "${assessment.badge}" badge!` : 'Keep studying and try again!'}
            </p>
            {passed && (
              <p className="text-gray-600 mt-2">Your certificate is ready for download</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{score}%</div>
              <div className="text-gray-600">Your Score</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{formatTime((assessment.duration * 60) - timeLeft)}</div>
              <div className="text-gray-600">Time Taken</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">{assessment.passingScore}%</div>
              <div className="text-gray-600">Required</div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900">Review Your Answers</h2>
            {assessment.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900">
                          Question {index + 1}: {question.question}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 border border-green-300'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 border border-red-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && (
                              <span className="ml-2 text-green-600 font-medium">(Correct)</span>
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <span className="ml-2 text-red-600 font-medium">(Your answer)</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={restartAssessment}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Assessment</span>
            </button>
            <button 
              onClick={() => navigate('/skill-assessment')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Back to Assessments
            </button>
            {passed && (
              <button 
                onClick={generateCertificate}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
              >
                <Award className="w-5 h-5" />
                <span>View Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const question = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Assessment Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {assessment.questions.length}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {question.difficulty}
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              {question.category}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className={`font-mono ${timeLeft < 300 ? 'text-red-600' : ''}`}>
              {formatTime(timeLeft)}
            </span>
            {timeLeft < 300 && (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{width: `${progress}%`}}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            currentQuestion === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedAnswers[currentQuestion] === undefined
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span>{currentQuestion === assessment.questions.length - 1 ? 'Finish Assessment' : 'Next'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Question Navigator */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigator</h3>
        <div className="grid grid-cols-5 gap-3">
          {assessment.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : selectedAnswers[index] !== undefined
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetail;