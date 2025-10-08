 ```
pipeline {
  agent any
  environment {
    GITHUB_TOKEN = credentials('github-token-id') // Jenkins credential with a GitHub token
  }
  stages {
    stage('Build') {
      steps {
        echo 'Building...'
      }
    }
  }
  post {
    always {
      script {
        // Extract PR number (GitHub Branch Source plugin usually sets CHANGE_ID)
        if (env.CHANGE_ID) {
          def comment = "Build result: ${currentBuild.currentResult} for PR #${env.CHANGE_ID}"
          sh """
            curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
                 -H "Content-Type: application/json" \
                 -d '{"body": "${comment}"}' \
                 https://api.github.com/repos/${env.CHANGE_AUTHOR}/${env.JOB_NAME}/issues/${env.CHANGE_ID}/comments
          """
        }
      }
    }
  }
}
```
