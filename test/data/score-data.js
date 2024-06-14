
const msgData = {
  grantScheme: {
    key: 'ADDVAL01',
    name: 'Slurry Infrastructure Grant'
  },
  desirability: {
    questions: [
      {
        key: 'products-processed',
        answers: [
          {
            key: 'products-processed',
            title: 'What type of produce is being processed?',
            input: [
              {
                key: 'products-processed-A1',
                value: 'Arable crops'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'how-adding-value',
        answers: [
          {
            key: 'how-adding-value',
            title: 'How will you add value to the products?',
            input: [
              {
                key: 'how-adding-value-A1',
                value: 'Processing or preparing primary product'
              }
            ]
          }
        ],
        rating: {
          score: 0.8,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'project-impact',
        answers: [
          {
            key: 'project-impact',
            title: 'What impact will the project have?',
            input: [
              {
                key: 'project-impact-A1',
                value: 'Diversifying into creating added-value products'
              }
            ]
          }
        ],
        rating: {
          score: 1.6,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'future-customers',
        answers: [
          {
            key: 'future-customers',
            title: 'Who are your current customers?',
            input: [
              {
                key: 'future-customers-A1',
                value: 'Processors'
              },
              {
                key: 'future-customers-A2',
                value: 'Wholesalers'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'collaboration',
        answers: [
          {
            key: 'collaboration',
            title: 'Who are your current customers?',
            input: [
              {
                key: 'collaboration-A1',
                value: 'Yes'
              }
            ]
          }
        ],
        rating: {
          score: 4,
          band: 'Strong',
          importance: null
        }
      },
      {
        key: 'environmental-impact',
        answers: [
          {
            key: 'environmental-impact',
            title: 'How will the project improve the environment?',
            input: [
              {
                key: 'environmental-impact-A1',
                value: 'Energy efficiency'
              },
              {
                key: 'environmental-impact-A2',
                value: 'Water efficiency'
              }
            ]
          }
        ],
        rating: {
          score: 0.8,
          band: 'Strong',
          importance: null
        }
      }
    ],
    overallRating: {
      score: 19,
      band: 'Weak'
    }
  },
  questionMapping: {
    productsProcessed: 'produce-processed',
    howAddingValue: 'how-adding-value',
    projectImpact: 'project-impact',
    currentCustomers: 'current-customers',
    futureCustomers: 'future-customers',
    collaboration: 'collaboration',
    environmentalImpact: 'environmental-impact'
  }
}
module.exports = msgData
