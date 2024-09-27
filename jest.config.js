/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], 
  },
  reporters: [ 
    'default',
    ['jest-junit',
      {
        outputDirectory: 'reports'
      }

    ],
    ['jest-html-reporters',
      {
      publicPath: 'reports'
      }
    ]
  ],
};
