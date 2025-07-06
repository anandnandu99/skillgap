interface LLMQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  topic: string;
}

interface QuestionGenerationRequest {
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  questionCount: number;
  userLevel?: string;
  previousTopics?: string[];
  userRole?: string;
  userDepartment?: string;
}

class LLMService {
  private readonly API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
  private readonly MODEL = 'gpt-4';

  // Generate questions using LLM (simulated for demo)
  async generateQuestions(request: QuestionGenerationRequest): Promise<LLMQuestion[]> {
    try {
      // Show loading state
      console.log(`Generating ${request.questionCount} questions for ${request.topic}...`);
      
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate personalized questions based on user context
      return this.generatePersonalizedQuestions(request);
    } catch (error) {
      console.error('Error generating questions:', error);
      throw new Error('Failed to generate questions. Please try again.');
    }
  }

  private generatePersonalizedQuestions(request: QuestionGenerationRequest): LLMQuestion[] {
    const questionBank = this.getQuestionBank();
    const topicQuestions = questionBank[request.topic] || questionBank['JavaScript Fundamentals'];
    const difficultyQuestions = topicQuestions[request.difficulty] || topicQuestions['beginner'];
    
    // Shuffle and select questions
    const shuffled = [...difficultyQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, request.questionCount);
    
    // Personalize questions based on user context
    return selected.map((q, index) => ({
      ...q,
      id: index + 1,
      difficulty: this.mapDifficultyLevel(request.difficulty),
      category: request.category,
      topic: request.topic,
      question: this.personalizeQuestion(q.question, request)
    }));
  }

  private personalizeQuestion(question: string, request: QuestionGenerationRequest): string {
    // Add context based on user role and department
    if (request.userRole && request.userDepartment) {
      const contextualPhrases = [
        `As a ${request.userRole} in ${request.userDepartment}, `,
        `In your role as ${request.userRole}, `,
        `For someone working in ${request.userDepartment}, `
      ];
      
      // Randomly add context to some questions
      if (Math.random() > 0.7) {
        const phrase = contextualPhrases[Math.floor(Math.random() * contextualPhrases.length)];
        return phrase + question.toLowerCase();
      }
    }
    
    return question;
  }

  private mapDifficultyLevel(level: 'beginner' | 'intermediate' | 'advanced'): 'easy' | 'medium' | 'hard' {
    const mapping = {
      'beginner': 'easy' as const,
      'intermediate': 'medium' as const,
      'advanced': 'hard' as const
    };
    return mapping[level];
  }

  private getQuestionBank() {
    return {
      'JavaScript Fundamentals Assessment': {
        beginner: [
          {
            question: "What is the correct way to declare a variable that can be reassigned in modern JavaScript?",
            options: [
              "var myVariable = 'value';",
              "let myVariable = 'value';",
              "const myVariable = 'value';",
              "variable myVariable = 'value';"
            ],
            correctAnswer: 1,
            explanation: "'let' is the modern way to declare variables that can be reassigned. 'const' is for constants, and 'var' has function scope issues."
          },
          {
            question: "Which method is used to add an element to the end of an array in JavaScript?",
            options: [
              "array.add(element)",
              "array.push(element)",
              "array.append(element)",
              "array.insert(element)"
            ],
            correctAnswer: 1,
            explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
          },
          {
            question: "What will 'typeof null' return in JavaScript?",
            options: [
              "'null'",
              "'undefined'",
              "'object'",
              "'boolean'"
            ],
            correctAnswer: 2,
            explanation: "This is a well-known JavaScript quirk. 'typeof null' returns 'object', which is considered a bug but maintained for backward compatibility."
          },
          {
            question: "How do you create a function in JavaScript using arrow syntax?",
            options: [
              "function myFunc() => {}",
              "const myFunc = () => {}",
              "let myFunc() => {}",
              "myFunc => () => {}"
            ],
            correctAnswer: 1,
            explanation: "Arrow functions are created using the syntax: const functionName = () => {}. This is a concise way to write functions in ES6+."
          },
          {
            question: "What is the correct way to access a property of an object in JavaScript?",
            options: [
              "object->property",
              "object.property or object['property']",
              "object::property",
              "object#property"
            ],
            correctAnswer: 1,
            explanation: "Object properties can be accessed using dot notation (object.property) or bracket notation (object['property'])."
          },
          {
            question: "Which of the following is NOT a primitive data type in JavaScript?",
            options: [
              "string",
              "number",
              "array",
              "boolean"
            ],
            correctAnswer: 2,
            explanation: "Arrays are objects in JavaScript, not primitive data types. The primitive types are: string, number, boolean, undefined, null, symbol, and bigint."
          },
          {
            question: "What is the purpose of the 'use strict' directive in JavaScript?",
            options: [
              "It makes JavaScript run faster",
              "It enables strict mode which catches common coding errors",
              "It imports external libraries",
              "It defines global variables"
            ],
            correctAnswer: 1,
            explanation: "'use strict' enables strict mode, which helps catch common coding mistakes and prevents the use of certain error-prone features."
          }
        ],
        intermediate: [
          {
            question: "What is a closure in JavaScript and why is it useful?",
            options: [
              "A way to close browser windows",
              "A function that has access to variables in its outer scope even after the outer function returns",
              "A method to end loops early",
              "A type of error handling mechanism"
            ],
            correctAnswer: 1,
            explanation: "A closure gives you access to an outer function's scope from an inner function. This is useful for data privacy and creating function factories."
          },
          {
            question: "What is the difference between '==' and '===' in JavaScript?",
            options: [
              "No difference, they work the same",
              "'==' compares values with type coercion, '===' compares without type coercion",
              "'===' is faster than '=='",
              "'==' is for numbers, '===' is for strings"
            ],
            correctAnswer: 1,
            explanation: "'==' performs type coercion before comparison, while '===' (strict equality) compares both value and type without coercion."
          },
          {
            question: "What is the purpose of the 'this' keyword in JavaScript?",
            options: [
              "It always refers to the global object",
              "It refers to the current function",
              "It refers to the object that is executing the current function",
              "It's used for variable declarations"
            ],
            correctAnswer: 2,
            explanation: "'this' refers to the object that is currently executing the function. Its value depends on how the function is called."
          },
          {
            question: "What is event bubbling in JavaScript?",
            options: [
              "When events are deleted automatically",
              "When an event propagates from the target element up through its ancestors",
              "When events are created dynamically",
              "When multiple events fire simultaneously"
            ],
            correctAnswer: 1,
            explanation: "Event bubbling is when an event starts from the target element and bubbles up through its parent elements in the DOM tree."
          },
          {
            question: "What is the difference between 'let', 'const', and 'var'?",
            options: [
              "They all work exactly the same",
              "'var' has function scope, 'let' and 'const' have block scope; 'const' cannot be reassigned",
              "'let' is for numbers, 'const' is for strings, 'var' is for booleans",
              "'var' is deprecated and should never be used"
            ],
            correctAnswer: 1,
            explanation: "'var' has function scope and can be hoisted, 'let' and 'const' have block scope. 'const' creates immutable bindings."
          },
          {
            question: "What is the purpose of Promise.all() in JavaScript?",
            options: [
              "It creates a new Promise",
              "It waits for all promises to resolve and returns an array of results",
              "It cancels all running promises",
              "It converts callbacks to promises"
            ],
            correctAnswer: 1,
            explanation: "Promise.all() takes an array of promises and returns a single promise that resolves when all input promises resolve, with an array of all results."
          }
        ],
        advanced: [
          {
            question: "How does the JavaScript event loop work with async operations?",
            options: [
              "All operations are executed synchronously in order",
              "Async operations block the main thread until completion",
              "The event loop manages the call stack, callback queue, and microtask queue",
              "Async operations are executed in parallel threads"
            ],
            correctAnswer: 2,
            explanation: "The event loop coordinates between the call stack, callback queue (macrotasks), and microtask queue to handle asynchronous operations without blocking the main thread."
          },
          {
            question: "What is the difference between microtasks and macrotasks in JavaScript?",
            options: [
              "There is no difference",
              "Microtasks have higher priority and are executed before macrotasks",
              "Macrotasks are faster than microtasks",
              "Microtasks are only for Promises"
            ],
            correctAnswer: 1,
            explanation: "Microtasks (like Promise callbacks) have higher priority and are executed before macrotasks (like setTimeout callbacks) in each event loop iteration."
          },
          {
            question: "What is the purpose of WeakMap and WeakSet in JavaScript?",
            options: [
              "They are faster versions of Map and Set",
              "They allow garbage collection of keys/values when no other references exist",
              "They have unlimited size capacity",
              "They are used for weak typing"
            ],
            correctAnswer: 1,
            explanation: "WeakMap and WeakSet hold 'weak' references to their keys, allowing garbage collection when no other references to the keys exist."
          },
          {
            question: "What is the difference between call(), apply(), and bind() methods?",
            options: [
              "They all do exactly the same thing",
              "call() and apply() invoke immediately with different argument formats; bind() returns a new function",
              "Only bind() can change the 'this' context",
              "apply() is deprecated and shouldn't be used"
            ],
            correctAnswer: 1,
            explanation: "call() invokes with individual arguments, apply() with an array of arguments, and bind() returns a new function with bound context and arguments."
          },
          {
            question: "What is a Proxy in JavaScript and what can it be used for?",
            options: [
              "A way to make HTTP requests",
              "An object that intercepts and customizes operations on another object",
              "A method for creating private variables",
              "A tool for debugging JavaScript code"
            ],
            correctAnswer: 1,
            explanation: "A Proxy allows you to intercept and customize operations (like property lookup, assignment, function calls) performed on objects."
          }
        ]
      },
      'React Advanced Patterns': {
        beginner: [
          {
            question: "What is JSX in React?",
            options: [
              "A new programming language",
              "A syntax extension that allows writing HTML-like code in JavaScript",
              "A CSS framework",
              "A database query language"
            ],
            correctAnswer: 1,
            explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript, making React components more readable."
          },
          {
            question: "What is the purpose of the useState hook in React?",
            options: [
              "To make HTTP requests",
              "To manage component state in functional components",
              "To handle routing",
              "To optimize performance"
            ],
            correctAnswer: 1,
            explanation: "useState is a React hook that allows you to add state to functional components, returning the current state value and a setter function."
          }
        ],
        intermediate: [
          {
            question: "What is the purpose of React.memo()?",
            options: [
              "To memorize component state",
              "To prevent unnecessary re-renders of functional components",
              "To store data in local storage",
              "To create memory leaks"
            ],
            correctAnswer: 1,
            explanation: "React.memo() is a higher-order component that prevents unnecessary re-renders by memoizing the component and only re-rendering when props change."
          },
          {
            question: "When should you use useCallback hook?",
            options: [
              "Always when defining functions in components",
              "When you want to memoize a function to prevent unnecessary re-renders",
              "To handle API calls",
              "To manage component state"
            ],
            correctAnswer: 1,
            explanation: "useCallback should be used to memoize functions when they are passed as props to child components or used as dependencies in other hooks."
          }
        ],
        advanced: [
          {
            question: "What is the difference between useEffect and useLayoutEffect?",
            options: [
              "There is no difference",
              "useLayoutEffect runs synchronously after all DOM mutations",
              "useEffect runs before DOM mutations",
              "useLayoutEffect is deprecated"
            ],
            correctAnswer: 1,
            explanation: "useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, while useEffect runs asynchronously after the paint."
          },
          {
            question: "What are React Suspense boundaries used for?",
            options: [
              "Error handling only",
              "Code splitting and lazy loading with fallback UI",
              "State management",
              "Performance monitoring"
            ],
            correctAnswer: 1,
            explanation: "Suspense boundaries allow you to handle loading states for lazy-loaded components and provide fallback UI while components are being loaded."
          }
        ]
      },
      'Data Science Fundamentals': {
        beginner: [
          {
            question: "What is the difference between supervised and unsupervised learning?",
            options: [
              "Supervised learning uses labeled data, unsupervised learning uses unlabeled data",
              "Supervised learning is faster than unsupervised learning",
              "There is no difference",
              "Unsupervised learning is more accurate"
            ],
            correctAnswer: 0,
            explanation: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs, while unsupervised learning finds patterns in data without labeled examples."
          },
          {
            question: "Which Python library is most commonly used for data manipulation?",
            options: [
              "NumPy",
              "Matplotlib",
              "Pandas",
              "Scikit-learn"
            ],
            correctAnswer: 2,
            explanation: "Pandas is the most commonly used Python library for data manipulation and analysis, providing data structures like DataFrames."
          }
        ],
        intermediate: [
          {
            question: "What does a p-value represent in statistical testing?",
            options: [
              "The probability that the null hypothesis is true",
              "The probability of observing the data given that the null hypothesis is true",
              "The probability that the alternative hypothesis is true",
              "The confidence level of the test"
            ],
            correctAnswer: 1,
            explanation: "A p-value is the probability of observing the test results (or more extreme) given that the null hypothesis is true."
          },
          {
            question: "What is overfitting in machine learning?",
            options: [
              "When a model performs well on training data but poorly on new data",
              "When a model is too simple",
              "When there's too much training data",
              "When the model trains too quickly"
            ],
            correctAnswer: 0,
            explanation: "Overfitting occurs when a model learns the training data too well, including noise and outliers, resulting in poor generalization to new data."
          }
        ],
        advanced: [
          {
            question: "What is the purpose of cross-validation?",
            options: [
              "To increase the size of the dataset",
              "To evaluate model performance and reduce overfitting",
              "To clean the data",
              "To visualize the data"
            ],
            correctAnswer: 1,
            explanation: "Cross-validation is used to evaluate how well a model will generalize to new data by training and testing on different subsets of the data."
          }
        ]
      }
    };
  }

  // Generate questions for specific assessment topics
  async generateAssessmentQuestions(assessmentTitle: string, userContext: any): Promise<LLMQuestion[]> {
    const questionCount = 5; // Default number of questions
    
    // Map assessment titles to topics and difficulty
    const assessmentConfig = this.getAssessmentConfig(assessmentTitle);
    
    const request: QuestionGenerationRequest = {
      topic: assessmentConfig.topic,
      difficulty: assessmentConfig.difficulty,
      category: assessmentConfig.category,
      questionCount,
      userRole: userContext.role,
      userDepartment: userContext.department,
      userLevel: userContext.level
    };

    return this.generateQuestions(request);
  }

  private getAssessmentConfig(assessmentTitle: string) {
    const configs: Record<string, any> = {
      'JavaScript Fundamentals Assessment': {
        topic: 'JavaScript Fundamentals Assessment',
        difficulty: 'beginner',
        category: 'programming'
      },
      'React Advanced Patterns': {
        topic: 'React Advanced Patterns',
        difficulty: 'advanced',
        category: 'programming'
      },
      'Data Science Fundamentals': {
        topic: 'Data Science Fundamentals',
        difficulty: 'intermediate',
        category: 'data-science'
      }
    };

    return configs[assessmentTitle] || configs['JavaScript Fundamentals Assessment'];
  }
}

export const llmService = new LLMService();
export type { LLMQuestion, QuestionGenerationRequest };