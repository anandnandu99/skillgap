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
  private readonly API_ENDPOINT = 'https://hexavarsity-secureapi.azurewebsites.net/api/azureai';
  private readonly MODEL = 'gpt-4-mini';
  private readonly API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  // Generate questions using OpenAI API
  async generateQuestions(request: QuestionGenerationRequest): Promise<LLMQuestion[]> {
    try {
      console.log(`Generating ${request.questionCount} questions for ${request.topic}...`);
      
      if (!this.API_KEY) {
        console.warn('OpenAI API key not found, falling back to sample questions');
        return this.generateFallbackQuestions(request);
      }

      const prompt = this.createPrompt(request);
      
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.API_KEY,
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are an expert assessment creator. Generate high-quality multiple-choice questions with detailed explanations. Always respond with valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenAI API');
      }

      // Parse the JSON response
      const parsedQuestions = this.parseOpenAIResponse(content, request);
      return parsedQuestions;

    } catch (error) {
      console.error('Error generating questions with OpenAI:', error);
      console.log('Falling back to sample questions...');
      return this.generateFallbackQuestions(request);
    }
  }

  private createPrompt(request: QuestionGenerationRequest): string {
    const contextInfo = request.userRole && request.userDepartment 
      ? `The user is a ${request.userRole} working in ${request.userDepartment}.`
      : '';

    return `
Generate ${request.questionCount} multiple-choice questions for a ${request.difficulty} level assessment on "${request.topic}" in the ${request.category} category.

${contextInfo}

Requirements:
- Each question should have exactly 4 options
- Questions should be practical and relevant to real-world scenarios
- Include detailed explanations for the correct answers
- Vary the difficulty within the ${request.difficulty} level
- Make questions specific to ${request.topic}
- Ensure questions test understanding, not just memorization

Please respond with a JSON array in this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why this answer is correct and others are wrong.",
    "difficulty": "${this.mapDifficultyLevel(request.difficulty)}",
    "category": "${request.category}",
    "topic": "${request.topic}"
  }
]

Generate exactly ${request.questionCount} questions. Ensure the JSON is valid and properly formatted.
    `;
  }

  private parseOpenAIResponse(content: string, request: QuestionGenerationRequest): LLMQuestion[] {
    try {
      // Clean the content to extract JSON
      let jsonContent = content.trim();
      
      // Remove markdown code blocks if present
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/```\n?/, '').replace(/\n?```$/, '');
      }

      const questions = JSON.parse(jsonContent);
      
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }

      // Validate and format questions
      return questions.map((q, index) => ({
        id: index + 1,
        question: q.question || `Generated question ${index + 1}`,
        options: Array.isArray(q.options) ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.explanation || 'Explanation not provided.',
        difficulty: q.difficulty || this.mapDifficultyLevel(request.difficulty),
        category: q.category || request.category,
        topic: q.topic || request.topic
      }));

    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      console.log('Raw content:', content);
      throw new Error('Failed to parse OpenAI response');
    }
  }

  private generateFallbackQuestions(request: QuestionGenerationRequest): LLMQuestion[] {
    const questionBank = this.getFallbackQuestionBank();
    const topicQuestions = questionBank[request.topic] || questionBank['JavaScript Fundamentals Assessment'];
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
        topic: 'JavaScript Programming',
        difficulty: 'beginner',
        category: 'programming'
      },
      'React Advanced Patterns': {
        topic: 'React.js Framework',
        difficulty: 'advanced',
        category: 'programming'
      },
      'Data Science Fundamentals': {
        topic: 'Data Science and Analytics',
        difficulty: 'intermediate',
        category: 'data-science'
      },
      'AWS Cloud Practitioner': {
        topic: 'Amazon Web Services Cloud Computing',
        difficulty: 'beginner',
        category: 'cloud'
      },
      'Cybersecurity Risk Assessment': {
        topic: 'Cybersecurity and Risk Management',
        difficulty: 'advanced',
        category: 'security'
      },
      'UI/UX Design Principles': {
        topic: 'User Interface and User Experience Design',
        difficulty: 'intermediate',
        category: 'design'
      }
    };

    return configs[assessmentTitle] || {
      topic: 'General Technology Assessment',
      difficulty: 'intermediate',
      category: 'technology'
    };
  }

  private getFallbackQuestionBank() {
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
}

export const llmService = new LLMService();
export type { LLMQuestion, QuestionGenerationRequest };